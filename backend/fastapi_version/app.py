# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import json
import stripe

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'})


if __name__ == '__main__':
    app.run(debug=True)