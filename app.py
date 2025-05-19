# app.py
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import zimbra_script
import os

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('.', 'mail_verif.html')

@app.route('/zimbra-signature')
def run_script():
    result = zimbra_script.get_signature()
    return jsonify({'signature': result})

if __name__ == '__main__':
    app.run(debug=True)
