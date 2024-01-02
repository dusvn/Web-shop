from marshmallow import Schema, post_load, fields

class Order:
    def __init__(self,productId,buyerId,currency,price,dateTime, completed):
        self.productId = productId
        self.buyerId = buyerId
        self.currency = currency
        self.price = price
        self.dateTime = dateTime
        self.completed = completed


class OrderSchema(Schema):
    productId = fields.Str(required=True)
    buyerId = fields.Str(required=True)
    currency = fields.Str(required=True)
    price = fields.Float(required=True)
    dateTime = fields.Str(required=True)
    completed = fields.Bool(required=True)

    @post_load
    def createOrder(self, data, **kwargs):
        return Order(**data)