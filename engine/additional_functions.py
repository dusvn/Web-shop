import hashlib


def hash_pass(password):
    hasher = hashlib.sha256(password.encode())
    hashed = hasher.hexdigest()
<<<<<<< HEAD
    return hashed
=======
    return hashed
>>>>>>> 181f730d098130871ce45b8835d6bae237e9b60d
