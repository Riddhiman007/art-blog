from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
import pymysql
import json

# pymysql.install_as_MySQLdb()
import datetime
"""extract parameters from json"""
with open("utils/config.json", "r") as parameters_file:
    params = json.load(parameters_file)["params"]
    

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db = SQLAlchemy(app) # creates the database


class Post(db.Model):
    __tablename__ = "post"
    sno = db.Column(db.Integer(), primary_key=True, nullable=False)
    title = db.Column(db.VARCHAR(50), unique=False, nullable=False)
    sub_title = db.Column(db.VARCHAR(50), unique=False,nullable=False)
    slug = db.Column(db.VARCHAR(50), unique=False, nullable=False)
    content = db.Column(db.VARCHAR(120), unique=False, nullable=False)
    author = db.Column(db.VARCHAR(40), unique=False, nullable=False)
    date = db.Column(db.Date(), default=datetime.date.today(), nullable=False)

    def __repr__(self) -> str:
        return f"Title: {self.title}"

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template("index.html", params=params)

@app.route('/posts/<string:slug>', methods=['GET', 'POST'])
def posts_slug(slug):
    Post.query.filter(Post.slug==slug).first()
    entry = Post(sno=1, title="test", sub_title="test", content="test", author="test")
    db.session.add(entry)
    db.session.commit()
    return render_template("posts.html", params=params, posts=entry)

@app.route('/posts/', methods=['GET', 'POST'])
def posts():
    return render_template("posts.html", params=params)

@app.route('/info')
def info():
    return render_template("info.html", params=params)
    
@app.route('/courses', methods=['GET', 'POST'])
def courses():
    return render_template("form.html", params=params)    


if __name__=="__main__":
    app.run(debug=True)
    