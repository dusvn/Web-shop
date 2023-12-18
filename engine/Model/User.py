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
        self.verified = False
        self.cardNum = ""

    def __str__(self):
        return f"User(name={self.name}, lastName={self.lastName}, address={self.address}, " \
               f"city={self.city}, country={self.country}, phoneNum={self.phoneNum}, " \
               f"email={self.email}, password={self.password}, verified={self.verified}, " \
               f"cardNum={self.cardNum})"


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
        return UserLogin(**data)

