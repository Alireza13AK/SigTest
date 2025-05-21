# app.py
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import zimbra_script
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return send_from_directory('.', 'mail_verif.html')

@app.route('/zimbra-signature')
def run_script():
    signature = request.args.get('signature')
    result = zimbra_script.get_signature(signature)
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)