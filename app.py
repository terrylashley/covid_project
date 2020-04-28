# Calling Python Libraries
import pandas as pd
import numpy as np
import sqlalchemy
from pandas import DataFrame
from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from flask import Flask, jsonify, render_template
from flask import *

# Cors Resolution
from flask_cors import CORS

#Database Connection through SQLAlchemy
rds_connection_string = "postgres:postgres@localhost:5433/covid19_db"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base = automap_base()
Base.prepare(engine, reflect=True);

# Calling to DB Table
Covid = Base.classes.disease
Confirmed = Base.classes.confirmedcases
Deaths = Base.classes.deaths

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

# Cors resolution to Flask App
cors = CORS(app)

# Home Route
@app.route("/")
def home():
    return render_template("index.html")
	
# Map Route
@app.route("/map")
def heatmap():
    return render_template("map.html")

# Map Route
@app.route("/mapfun")
def funnymap():
    return render_template("mapfun.html")

@app.route("/confirm")
def confirmed_table():
    
    # Calling the database
    # Querying each column, grabbing all
    session = Session(engine)
    results = session.query(Confirmed.confirmed, Confirmed.Admin2, 
    Confirmed.Province_State, Confirmed.Lat, Confirmed.Long_).all()
    
    # closing database connection
    session.close()
    
    # Serving as a list of Dictionary to be JSONified
    confirmedList = []
    for confirmed, Admin2, Province_State, Lat, Long_ in results:
        confirmed_dict = {}
        confirmed_dict["confirmed"] = confirmed
        confirmed_dict["Admin2"] = Admin2
        confirmed_dict["Province_State"] = Province_State
        confirmed_dict["Lat"] = Lat
        confirmed_dict["Long_"] = Long_
        confirmedList.append(confirmed_dict)
        
    return jsonify(confirmedList) 


@app.route("/death")
def total_death():
    # Calling the database
    # Querying each column, grabbing all
    session = Session(engine)
    results = session.query(Deaths.deaths, Deaths.Admin2, 
    Deaths.Province_State, Deaths.Lat, Deaths.Long_).all()
    
    # closing database connection
    session.close()
    
    # Serving as a list of Dictionary to be JSONified
    deathsList = []
    for deaths, Admin2, Province_State, Lat, Long_ in results:
        deaths_dict = {}
        deaths_dict["deaths"] = deaths
        deaths_dict["Admin2"] = Admin2
        deaths_dict["Province_State"] = Province_State
        deaths_dict["Lat"] = Lat
        deaths_dict["Long_"] = Long_
        deathsList.append(deaths_dict)
        
    return jsonify(deathsList) 




	
# Covid JSON Route
@app.route("/covid")
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
        covid_dict["country"] = country
        covid_dict["country_code"] = cCode
        covid_dict["new_cases_confirmed"] = newConfirmed
        covid_dict["total_cases_confirmed"] = totalConfirmed
        covid_dict["new_deaths"] = newDeaths
        covid_dict["new_recovered"] = newRecovered
        covid_dict["total_recovered"] = totalRecovered
        covid_dict["date"] = date
        countryList.append(covid_dict)
        
    return jsonify(countryList)  
  

# Graph Route for using database data
@app.route("/graph")
def graph():
    return render_template("graph.html")
	
if __name__ == "__main__":
    app.run(debug=True)