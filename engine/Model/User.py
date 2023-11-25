from marshmallow import Schema, post_load, fields

class User:
    def __init__(self,name,lastName,address,city,country,phoneNum,email,pw):
        self._name = name
        self._lastName = lastName
        self._address = address
        self._city = city
        self._country = country
        self._phoneNum = phoneNum
        self._email = email
        self._password = pw
        self._id = None

class UserSchema(Schema):
    name  = fields.Str(required=True)
    lastName = fields.Str(required=True)
    address = fields.Str(required=True)
    city = fields.Str(required=True)
    country = fields.Str(required=True)
    phoneNum = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    id = fields.Int(dump_only=True)


"""
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
"""