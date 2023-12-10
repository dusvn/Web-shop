import hashlib
def hash_pass(password):
    hasher = hashlib.sha256(password.encode())
    hashed = hasher.hexdigest()
    return hashed
