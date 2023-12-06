import firebase_admin
from firebase_admin import firestore, credentials

# Application Default credentials are automatically created.
cred = credentials.Certificate("serviceAccountKey.json")
firebase_app = firebase_admin.initialize_app(cred)
db = firestore.client()

admin_ids = ["jDuJiPr3D8RGoOOhvVUi"]