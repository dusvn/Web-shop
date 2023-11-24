from marshmallow import Schema, post_load, fields


class Korisnik:
    def __init__(self, email, adresa, brtelefona, drzava, grad, ime, lozinka, prezime):
        self.email = email
        self.adresa = adresa
        self.brtelefona = brtelefona
        self.drzava = drzava
        self.grad = grad
        self.ime = ime
        self.lozinka = lozinka
        self.prezime = prezime


class KorisnikSchema(Schema):
    email = fields.Str()
    adresa = fields.Str()
    brtelefona = fields.Str()
    drzava = fields.Str()
    grad = fields.Str()
    ime = fields.Str()
    lozinka = fields.Str()
    prezime = fields.Str()

    @post_load
    def createUser(self, data, **kwargs):
        return Korisnik(**data)
