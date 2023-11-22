from flask import Flask, jsonify, request
from flask_cors import CORS
from config import firebase_app, db
from firebase_admin import firestore
from Model.Korisnik import *


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], methods=["GET", "POST", "PUT"])


@app.route("/api")
def main():
    return "Welcome!"


@app.route("/api/proizvodi", methods=['GET'])
def get_proizvodi():
    data = dict()
    proizvodi = db.collection("Proizvodi").get()
    for proizvod in proizvodi:
        data[proizvod.id] = proizvod.to_dict()
    return jsonify(data)


@app.route("/api/korisnici", methods=['GET'])
def get_korisnici():
    data = dict()
    korisnici = db.collection("Korisnici").get()
    for korisnik in korisnici:
        data[korisnik.id] = korisnik.to_dict()
    return jsonify(data)


@app.route("/api/korisnik", methods=['GET'])
def get_korisnik():
    korisnik_parameter = request.args.get('email')
    korisnik = db.collection("Korisnici").document(korisnik_parameter)
    korisnik_snepsot = korisnik.get()
    korisnik_objekat = korisnik_snepsot.to_dict()
    if type(korisnik_objekat) is dict:
        return jsonify(korisnik_objekat)
    else:
        return "Kita bato", 404


@app.route("/api/korisnici", methods=['POST'])
def napravi_korisnika():
    newKorisnik = KorisnikSchema().load(request.get_json())
    korisnik = db.collection("Korisnici").document(newKorisnik.email)
    korisnik_snepsot = korisnik.get()
    korisnik_objekat = korisnik_snepsot.to_dict()
    if type(korisnik_objekat) is dict:
        return "User already exists", 400
    else:
        data = {"Adresa": newKorisnik.adresa, "Broj telefona": newKorisnik.brtelefona, "Država": newKorisnik.drzava,
                "Grad": newKorisnik.grad, "Ime": newKorisnik.ime, "Lozinka": newKorisnik.lozinka}
        db.collection('Korisnici').document(newKorisnik.email).set(data)
        return "User successfully created", 204


if __name__ == "__main__":
    app.run()
