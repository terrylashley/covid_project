
var map = L.map("map", {
  center: [37.00, -97.00],
  zoom: 4.5
});

const API_KEY = "pk.eyJ1Ijoia3NhbnRpbGxhbiIsImEiOiJjazhqY2IyaGwwZmQ5M2ZwbDBlaGcxNnc5In0.Ra4gZmwt7km977rqQF0erA";


 //Adding tile layer

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
}).addTo(map);


var link = "http://127.0.0.1:5000/confirm";
       


    d3.json(link, function(data) {

        console.log(data)

        CasesMarker = []

        for (var i = 0; i < data.length - 1; i++) {

            var confirmedd = parseFloat(data[i].confirmed)
				

            if (confirmedd > 1000) {

                var city = data[i].Admin2
                var state = data[i].Province_State
                var latitud = parseFloat(data[i].Lat)
                var longitud = parseFloat(data[i].Long_)


               var greenIcon = L.icon({
					iconUrl: 'http://pngimg.com/uploads/coronavirus/coronavirus_PNG40.png',
					//shadowUrl: 'http://pngimg.com/uploads/coronavirus/coronavirus_PNG40.png',

					iconSize:     [50, 50], // size of the icon
					//shadowSize:   [50, 64], // size of the shadow
					iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
					//shadowAnchor: [4, 62],  // the same for the shadow
					popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
				});
				
				L.marker([latitud, longitud], {icon: greenIcon}).bindPopup("<h1>" + state + "</h1> <hr> <h3> " + city + "</h3> <hr> <h3>Confirmed: " + confirmedd + "</h3>").addTo(map);
				
          


            }
        }


    });