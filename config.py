import firebase_admin
from firebase_admin import firestore

# Application Default credentials are automatically created.
firebase_app = firebase_admin.initialize_app()
db = firestore.client()
