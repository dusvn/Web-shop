from flask import Flask, jsonify
from config import firebase_app, db
from firebase_admin import firestore

app = Flask(__name__)

@app.route("/")
def main():
    print("Hello from the server!")
    return "Welcome to the Flask App!"

@app.route("/proizvodi", methods=['GET'])
def get_proizvodi():
    data = []
    proizvodi = db.collection("Proizvodi").get()
    for proizvod in proizvodi:
        data.append(f"{proizvod.id} => {proizvod.to_dict()}")
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
