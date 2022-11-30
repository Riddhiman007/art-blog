from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
import pymysql
import json
# pymysql.install_as_MySQLdb()

"""extract parameters from json"""
with open("utils/config.json", "r") as parameters_file:
    params = json.load(parameters_file)["params"]
    

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db = SQLAlchemy(app)


class Form(db.Model):
    sno = db.Column(db.Integer, primary_key=True, nullable=True)
    name = db.Column(db.VARCHAR(80), unique=False, nullable=False)
    email = db.Column(db.VARCHAR(120), unique=False, nullable=False)
    phone_num = db.Column(db.VARCHAR(12), unique=False, nullable=True)

    def __repr__(self) -> str:
        return f"User: {self.name}"

@app.route('/')
def index():
    return render_template("index.html", params=params)

# @app.route('/courses')
# def courses():
#     return render_template("course.html", params=params)

@app.route('/info')
def info():
    return render_template("info.html", params=params)
    
@app.route('/courses', methods=['GET', 'POST'])
def courses():
    return render_template("form.html", params=params)    

if __name__=="__main__":
    app.run(debug=True)