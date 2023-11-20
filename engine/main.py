from flask import Flask, jsonify, request
from config import firebase_app, db
from firebase_admin import firestore
from Model.Korisnik import Korisnik
app = Flask(__name__)


@app.route("/")
def main():
    return "Welcome!"


@app.route("/proizvodi", methods=['GET'])
def get_proizvodi():
    data = dict()
    proizvodi = db.collection("Proizvodi").get()
    for proizvod in proizvodi:
        data[proizvod.id] = proizvod.to_dict()
    return jsonify(data)


@app.route("/korisnici", methods=['GET'])
def get_korisnici():
    data = dict()
    korisnici = db.collection("Korisnici").get()
    for korisnik in korisnici:
        data[korisnik.id] = korisnik.to_dict()
    return jsonify(data)


@app.route("/korisnik", methods=['GET'])
def get_korisnik():
    korisnik_parameter = request.args.get('email')
    korisnik = db.collection("Korisnici").document(korisnik_parameter)
    korisnik_snepsot = korisnik.get()
    korisnik_objekat = korisnik_snepsot.to_dict()
    if type(korisnik_objekat) is dict:
        return jsonify(korisnik_objekat)
    else:
        return "Kita bato", 404


@app.route("/korisnici", methods=['POST'])
def napravi_korisnika(Korisnik):
    data = dict()
    korisnici = db.collection("Korisnici").get()

    for korisnik in korisnici:
        if korisnik.email == Korisnik.email:
            return "Kita bato", 404

    data = {"Adresa": Korisnik.adresa, "Broj telefona": Korisnik.brtelefona, "Država": Korisnik.drzava,
            "Grad": Korisnik.grad, "Ime": Korisnik.ime, "Lozinka": Korisnik.lozinka}
    db.collection('Korisnici').document(Korisnik.email).set(data)
    return "", 204


if __name__ == "__main__":
    app.run()
