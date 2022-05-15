from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hell():
    return "hello world"

@app.route('/test', methods=['GET'])
def test():
    response = {
        "world": "Hello",
        "about" :"Test"
    }
    return response