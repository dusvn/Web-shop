from marshmallow import Schema, post_load, fields, validate

class CreditCard:
    def __init__(self, card_number, expiration_date, ccv):
        self.card_number = card_number
        self.expiration_date = expiration_date
        self.ccv = ccv

    def __str__(self):
        return f"CardNumber: {self.card_number}, ExpirationDate: {self.expiration_date}, CCV: {self.ccv}"

class CreditCardSchema(Schema):
    card_number = fields.Str(required=True, validate=validate.Regexp(r'^\d{4} \d{4} \d{4} \d{4}$', error='Invalid card number format'))
    expiration_date = fields.Str(required=True, validate=validate.Regexp(r'^(0[1-9]|1[0-2])\/\d{2}$', error='Invalid expiration date format'))
    ccv = fields.Str(required=True, validate=validate.Regexp(r'^\d{3}$', error='Invalid CCV format'))

    @post_load
    def create_credit_card(self, data, **kwargs):
        return CreditCard(**data)