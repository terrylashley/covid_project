var url = `https://pomber.github.io/covid19/timeseries.json`;
    d3.json(url).then((importedData) => {
    console.log(importedData)
    var countries = []
    Object.keys(importedData).forEach(key =>  {
    countries.push(key);
    });
    console.log(countries);
    //Add info to dropdonw menu
    var select = document.getElementById(“selDataset”);
    var options = countries;
    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement(“option”);
        el.text = opt;
        el.value = opt;
        select.add(el);
    }
    //create charts after selecting specific ID on dropdown menu
    d3.select(“#selDataset”).on(“change”, handleSubmit);
    function handleSubmit(){
        //filter data
        var dropdownMenu = d3.select(“#selDataset”);
        var selectedid = dropdownMenu.property(“value”);
        var allowed = [selectedid]
        const filtered = Object.keys(importedData)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key] = importedData[key];
            return obj;
            }, {});
        console.log(filtered);
        //Demo info
        document.getElementById(“sample-metadata”).innerHTML = “”
        Object.entries(filtered[selectedid][86]).forEach(([key, value]) => {
            console.log(`Key: ${key} and Value ${value}`);
            var para = document.createElement(“P”);
            var t = document.createTextNode(` ${key} :  ${value}`);
            para.appendChild(t);
            document.getElementById(“sample-metadata”).appendChild(para);
        });
        //chart
        var SliceData = filtered[selectedid].slice(60,90)
        console.log(SliceData)
        var countrydate = SliceData.map(country => country.date)
        var countryconfirmed = SliceData.map(country => country.confirmed)
        var countrydeaths  = SliceData.map(country => country.deaths)
        var trace1 = {
            y: countryconfirmed,
            x: countrydate,
            name: ‘Confirmed Cases’,
            type: ‘bar’,
            //orientation: ‘h’,
            marker: {
                color: ‘#64A09A’,
                width: 2
            }
        };
        var trace2 = {
            y: countrydeaths,
            x: countrydate,
            name: ‘Deaths’,
            type: ‘bar’,
            //orientation: ‘h’,
            marker: {
                color: ‘#F97C0B’,
                width: 2
            }
        };
        var chartData = [trace1, trace2];
        var layout = {
            title: “Covid19 Country selected”,
            margin: { t: 30, l: 150 },
            barmode: ‘stack’,
            autosize: false,
            width: 850,
            height: 500,
            margin: {
                l: 50,
                r: 50,
                b: 100,
                t: 100,
                pad: 4
            }
        };
        Plotly.newPlot(“bar”, chartData,layout);
    }
    });