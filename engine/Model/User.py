from marshmallow import Schema, post_load, fields


class User:
    def __init__(self, name, lastName, address, city, country, phoneNum, email, password):
        self.name = name
        self.lastName = lastName
        self.address = address
        self.city = city
        self.country = country
        self.phoneNum = phoneNum
        self.email = email
        self.password = password


class UserSchema(Schema):
    name = fields.Str(required=True)
    lastName = fields.Str(required=True)
    address = fields.Str(required=True)
    city = fields.Str(required=True)
    country = fields.Str(required=True)
    phoneNum = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)


class UserLogin:
    def __init__(self, email, password):
        self.email = email
        self.password = password


class UserLoginSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)

    @post_load
    def create_user_login(self, data, **kwargs):
<<<<<<< HEAD
        return UserLogin(**data)
=======
        return UserLogin(**data)
>>>>>>> 181f730d098130871ce45b8835d6bae237e9b60d
