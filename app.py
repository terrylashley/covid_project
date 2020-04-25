# Calling Python Libraries
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import Flask, jsonify, render_template

# Cors Resolution
from flask_cors import CORS

#Database Connection through SQLAlchemy
rds_connection_string = "postgres:postgres@localhost:5433/covid19_db"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base = automap_base()
Base.prepare(engine, reflect=True);

# Calling to DB Table
Covid = Base.classes.disease

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

# Cors resolution to Flask App
cors = CORS(app)

# Home Route
@app.route(“/”)
def home():
    return render_template(“index.html”)
	
# Covid JSON Route
@app.route(“/covid”)
def apiRoute():

    # Calling the database
    # Querying each column, grabbing all
    session = Session(engine)
    results = session.query(Covid.country, Covid.country_code, Covid.new_cases_confirmed,
    Covid.total_cases_confirmed, Covid.new_deaths, Covid.new_recovered, Covid.total_recovered, Covid.date).all()
	
    # closing database connection
    session.close()
	
    # Serving as a list of Dictionary to be JSONified
    countryList = []
    for country, cCode, newConfirmed, totalConfirmed, newDeaths, newRecovered, totalRecovered, date in results:
        covid_dict = {}
        covid_dict[“country”] = country
        covid_dict[“country_code”] = cCode
        covid_dict[“new_cases_confirmed”] = newConfirmed
        covid_dict[“total_cases_confirmed”] = totalConfirmed
        covid_dict[“new_deaths”] = newDeaths
        covid_dict[“new_recovered”] = newRecovered
        covid_dict[“total_recovered”] = totalRecovered
        covid_dict[“date”] = date
        countryList.append(covid_dict)
    print(type(countryList))
    print(“=========“)
    print(countryList)
    return jsonify(countryList)
	
if __name__ == “__main__“:
    app.run(debug=True)