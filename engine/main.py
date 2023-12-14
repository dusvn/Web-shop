# from functools import wraps

from flask import Flask, jsonify, request
from flask_cors import CORS
from config import firebase_app, db, admin_ids
from additional_functions import hash_pass
from firebase_admin import firestore
from Model.User import *
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt
from Model.Product import *
import secrets
import hashlib
from google.cloud.firestore_v1.base_query import FieldFilter  # nije potrebno ali neka stoji jer moze da zatreba taj fieldFilter pri queryjovanju iz baze


app = Flask(__name__)
CORS(app, origins="*", methods=["GET", "POST", "PUT", "OPTIONS"])

app.config["JWT_SECRET_KEY"] = "tajniKljuc"  # f"{secrets.SystemRandom().getrandbits(128)}"  # svaki put kad se resetuje app imacemo drugi
jwt = JWTManager(app)


@app.route('/api/register', methods=['POST'])
def register_user():  # ovaj metod view je da ako nam treba npr vise operacija tipa get delete put za isti obj
    new_user = UserSchema().load(request.get_json())
    # Check if the email is already taken
    if is_email_taken(new_user.email):
        return jsonify({"error": "Email is already taken"}), 400
    new_user.password = hash_pass(new_user.password)
    db.collection("Users").add(new_user.__dict__)  # ovo vraca nesto, probaj odatle da izvuces id i da ga zapises u bazu
    return jsonify({"message": "User registered successfully"}), 201


@app.route('/api/login', methods=['POST'])
def login_user():
    new_user = UserLoginSchema().load(request.get_json())
    if is_email_taken(new_user.email):
        user_ref = db.collection("Users").where("email", "==", new_user.email).limit(1)
        users = user_ref.stream()
        for user in users:
            user_data = user.to_dict()
            if user_data["password"] == hash_pass(new_user.password):
                access_token = create_access_token(identity=user.id)
                return {"access_token": access_token}, 200
            break
    return {"message": "Invalid credentials"}, 400


def is_email_taken(email):
    result = db.collection("Users").where("email", "==", email).get()
    return bool(result)


@app.route("/api/getProducts", methods=['GET'])
@jwt_required()
def get_products():
    # prepravljeno da bi mogla da se koristi metoda kod usera i kod admina
    jwt_token = get_jwt().get("sub")  # ovo je zapravo user id
    user = db.collection("Users").document(jwt_token).get()
    if user.exists:
        data = dict()
        proizvodi = db.collection("Products").get()
        for proizvod in proizvodi:
            data[proizvod.id] = proizvod.to_dict()
        return jsonify(data)


@app.route("/api/getUserInfo", methods=['GET'])
@jwt_required()
def get_user_info():
    jwt_token = get_jwt().get("sub")  # ovo je zapravo user id
    user = db.collection("Users").document(jwt_token).get()
    bill = db.collection("Bill").document(jwt_token).get()  # u bazi se cuva bill pod istip id-em kao user
    if user.exists:
        user = user.to_dict()
        bill = bill.to_dict()
        is_admin = jwt_token in admin_ids
        name = "name"
        lastName = "lastName"
        return jsonify({"bill": bill, "name": f"{user[name]} {user[lastName]}", "is_admin": is_admin, "is_verified": user["verified"]}), 200
    return jsonify({"message": "User not found"}), 404


@app.route("/api/addNewProduct", methods=['POST'])
@jwt_required()
def add_new_product():
    jwt_token = get_jwt().get("sub")
    newProduct = ProductSchema().load(request.get_json())
    if jwt_token not in admin_ids:
        return {"message": "This function only can be executed by admin"}, 400
    db.collection("Products").add(newProduct.__dict__)
    return {"message": f"sucessfuly added product {newProduct.getName()}"}, 200


@app.route("/api/addQuantity", methods=['POST'])
@jwt_required()
def add_quantity():
    jwt_token = get_jwt().get("sub")
    if jwt_token not in admin_ids:
        return {"message": "This function only can be executed by admin"}, 400
    dataForUpdate = request.get_json()
    converted_dict_list = [{key: value} for key, value in dataForUpdate]
    for data in converted_dict_list:
        for key,value in data.items():
            product = db.collection("Products").document(key)
            productPreviousValue = (db.collection("Products").document(key).get()).get("quantity")
            product.update({"quantity": productPreviousValue + value})
    return {"message": "Quantity updated successfully"}, 200


if __name__ == "__main__":

    app.run()
