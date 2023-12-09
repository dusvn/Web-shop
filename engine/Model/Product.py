from marshmallow import Schema, post_load, fields

class Product:
    def __init__(self,name,currency,price,quantity):
        self.name = name
        self.currency = currency
        self.price = price
        self.quantity = quantity
    def getName(self):
        return self.name
    def __str__(self):
        print(f"Name:{self.name},currency:{self.currency},price:{self.price},quantity{self.quantity}")
class ProductSchema(Schema):
    name = fields.Str(required=True)
    currency = fields.Str(required=True)
    price = fields.Float(required=True)
    quantity = fields.Int(required=True)
    @post_load
    def createProduct(self, data, **kwargs):
        return Product(**data)
    def __str__(self):
        print(f"Name:{self.name},currency:{self.currency},price:{self.price},quantity{self.quantity}")