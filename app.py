from flask import Flask
from flask import render_template, url_for

app = Flask(__name__)


@app.get("/")
def menu():
    return render_template("index.html")


if __name__ == "__main__":
    app.run("127.0.0.1", debug=True)
