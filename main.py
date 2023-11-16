from flask import Flask, jsonify
from config import firebase_app, db
from firebase_admin import firestore
app = Flask(__name__)


@app.route("/")
def main():
    return "Welcome!"


@app.route("/proizvodi")
def get_proizvodi():
    data = db.collection("Proizvodi").get()
    return jsonify(data)


if __name__ == "__main__":
    app.run()
