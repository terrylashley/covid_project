# 1. import Flask
import pandas as pd
from sqlalchemy import create_engine
from flask import Flask, render_template

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

rds_connection_string = "postgres:postgres@localhost:5433/covid19_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    result = pd.read_sql_query('select * from covid19', con=engine).head()  
    print("Server received request for 'Home' page...")
    return render_template("index.html", db = result)


# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"


if __name__ == "__main__":
    app.run(debug=True)
