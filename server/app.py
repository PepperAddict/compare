from flask import Flask

app = Flask(__name__)

@app.route('/')
def hell():
    return "hello world"

@app.route('/test')
def test():
    response_body = {
        "world": "Hello",
        "about" :"Test"
    }

    return response_body