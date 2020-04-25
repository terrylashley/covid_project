



// Adding tile layer
var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});



var link = "static/data/time_series_covid19_confirmed_US.csv";
var DeathsLink = "static/data/time_series_covid19_deaths_US.csv";

d3.csv(DeathsLink, function(newdata) {

	console.log(newdata);
	
	DeathsMarker= []

for (var i = 0; i < newdata.length-1; i++) { 
  
  var deaths = newdata[i]["4/21/2020"]
  
  if (deaths > 0) {
	  
	  var newcity = newdata[i].Admin2
	  var newstate = newdata[i].Province_State
	  var newlatitud = parseFloat(newdata[i].Lat)
	  var newlongitud = parseFloat(newdata[i].Long_)
	  
	  var mynewsize = ""
	  
		if 	(deaths <10) {
	        mynewsize = 8000
			color = "#FACED4"
		}  
		else if 	(deaths <50) {
	        mynewsize = 15000
			color = "#F7B3BD";
		}  
		else if 	(deaths <100) {
	        mynewsize = 25000;
			color = "#F38595";
		}  
		else if 	(deaths <500) {
	        mynewsize = 50000;
			color = "#ED4D64";
		}  
		else if 	(deaths <1000) {
	        mynewsize = 70000;
			color = "#CA142E";
		}  
		else if 	(deaths <10000) {
	        mynewsize = 100000;
			color = "#8C0E20";
		}
		else {
	        mynewsize = 150000;
			color = "#8C0E20";
		}  
		
	DeathsMarker.push( 
		L.circle([newlatitud,newlongitud], {
		  stroke: true,
		  fillOpacity: 0.75,
		  color: "black",
		  weight: 0.25,
		  fillColor: color,
		  radius: mynewsize
		}).bindPopup("<h1>" + newstate + "</h1> <hr> <h3> " + newcity + "</h3> <hr> <h3>Deaths: " + deaths + "</h3>"))
		
		
  }
	}
	

d3.csv(link, function(data) {

  //console.log(data)

CasesMarker= []

for (var i = 0; i < data.length-1; i++) { 
  
  var confirmed = data[i]["4/21/2020"]
  
  if (confirmed > 0) {
	  
	  var city = data[i].Admin2
	  var state = data[i].Province_State
	  var latitud = parseFloat(data[i].Lat)
	  var longitud = parseFloat(data[i].Long_)
	  

		if 	(confirmed <10) {
	       var mysize = 8000
			color = "#D2EFFA"
		}  
		else if 	(confirmed <100) {
	        var mysize = 15000
			color = "#ADE0F5";
		}  
		else if 	(confirmed <1000) {
	        var mysize = 25000;
			color = "#8BD4F1";
		}  
		else if 	(confirmed <10000) {
	        var mysize = 50000;
			color = "#46BAE8";
		}  
		else if 	(confirmed <50000) {
	        var mysize = 70000;
			color = "#1A9CD0";
		}  
		else if 	(confirmed <100000) {
	        var mysize = 100000;
			color = "#126C90";
		}
		else {
	        var mysize = 150000;
			color = "#126C90";
		}  
		
	CasesMarker.push( 
		L.circle([latitud,longitud], {
		  stroke: true,
		  fillOpacity: 0.75,
		  color: "black",
		  weight: 0.25,
		  fillColor: color,
		  radius: mysize
		}).bindPopup("<h1>" + state + "</h1> <hr> <h3> " + city + "</h3> <hr> <h3>Confirmed: " + confirmed + "</h3>"))
		
		
  }
	}    
 
 // first legend
	function getColor(d) {
    return d > 100000 ? '#126C90' :
           d > 50000 ? '#1A9CD0' :
           d > 10000 ? '#46BAE8' :
           d > 1000 ? '#8BD4F1' :
           d > 100 ? '#ADE0F5' :
                       '#D2EFFA';
	} 
  
  var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 100, 1000, 10000, 50000,100000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
	};
  
  //second legend
  
	function getColor2(d) {
    return d > 1000 ? '#8C0E20' :
           d > 500 ? '#CA142E' :
           d > 100 ? '#ED4D64' :
           d > 50 ? '#F38595' :
           d > 10 ? '#F7B3BD' :
                       '#FACED4';
	} 
  
    var legend2 = L.control({position: 'bottomleft'});

	legend2.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades2 = [0, 10, 50, 100, 500,1000],
        labels2 = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades2.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor2(grades2[i] + 1) + '"></i> ' +
            grades2[i] + (grades2[i + 1] ? '&ndash;' + grades2[i + 1] + '<br>' : '+');
    }

    return div;
	};
  

	// Create two separate layer groups:
	var Casesgroup = L.layerGroup(CasesMarker);
	var Deathsgroup = L.layerGroup(DeathsMarker);
	
	var none = new L.layerGroup();
	
	none.beforeAdd = function(myMap) {
		legend2.remove(myMap);
		legend.remove(myMap);
	}
	
	
	Casesgroup.beforeAdd = function(myMap) {
		legend2.remove(myMap);
		legend.addTo(myMap);
	}

	Deathsgroup.beforeAdd = function(myMap) {
		legend.remove(myMap);
		legend2.addTo(myMap);	
	}

	// Create a baseMaps object
	var baseMaps = {
	  "Light Map": lightmap,
	  "Dark Map": darkmap,
	  
	};

	// Create an overlay object
	var overlayMaps = {
	  "Covid19 Cases": Casesgroup,
	  "Deaths": Deathsgroup,
	 
	};

	// Define a map object
	var myMap = L.map("map", {
	  center: [37.09, -95.71],
	  zoom: 4.5,
	  layers: [lightmap, none]
	});

	// Pass our map layers into our layer control
	// Add the layer control to the map
	L.control.layers(baseMaps, overlayMaps, {
	  collapsed: false
	}).addTo(myMap);


  
 
});
})