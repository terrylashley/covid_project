
	var url = `https://pomber.github.io/covid19/timeseries.json`;


	d3.json(url).then((importedData) => {
	
	console.log(importedData)
	
	var countries = []
	
	Object.keys(importedData).forEach(key =>  {
	countries.push(key);
	});
	console.log(countries);
	
	var datasize = importedData[countries[0]].length

	console.log(datasize);
	
	//Todays data by country
		
	var confirmedcases = []
	var deathscases = []
	var recoveredcases  = []
		
	Object.keys(importedData).forEach(key =>  {
			
		confirmedcase = importedData[key][datasize-1]["confirmed"]
		deathscase = importedData[key][datasize-1]["deaths"]
		recoveredcase = importedData[key][datasize-1]["recovered"]
			
	confirmedcases.push(confirmedcase)
	deathscases.push(deathscase)
	recoveredcases.push(recoveredcase)
	});

	console.log(confirmedcases)
	console.log(deathscases)
	console.log(recoveredcases)
	
	//Total confirmed worldwide
	totalconfirmed = 0
	for(var i = 0; i < confirmedcases.length; i++) {
		totalconfirmed = totalconfirmed + confirmedcases[i]
	}	
	console.log(totalconfirmed)
	
	//Total deaths worldwide
	totaldeaths = 0
	for(var i = 0; i < deathscases.length; i++) {
		totaldeaths = totaldeaths + deathscases[i]
	}	
	console.log(totaldeaths)
	
	//Total recovered worldwide
	totalrecovered = 0
	for(var i = 0; i < recoveredcases.length; i++) {
		totalrecovered= totalrecovered + recoveredcases[i]
	}	
	console.log(totalrecovered)
	

	// Cleaning main dashboard

	document.getElementById("DashTotalCases").innerHTML = ""
	document.getElementById("DashTotalDeaths").innerHTML = ""
	document.getElementById("DashTotalRec").innerHTML = ""
	
	
	// Entering information  dashboard
	var dtc = d3.select("#DashTotalCases")
		.text(totalconfirmed)
		
	var dtc = d3.select("#DashTotalDeaths")
		.text(totaldeaths)

	var dtc = d3.select("#DashTotalRec")
		.text(totalrecovered)
	
	//Add info to dropdown menu - countries list
	var select = document.getElementById("selDataset"); 
	var options = countries; 

	for(var i = 0; i < options.length; i++) {
		var opt = options[i];

		var el = document.createElement("option");
		el.text = opt;
		el.value = opt;

		select.add(el);
	}
	
	//Startup pie chart
	
	var piedata = [{
	  values: confirmedcases,
	  labels: countries,
	  type: 'pie'
	}];

	var layout = {
	  title: "Total Covid19 Cases Worldwide",
	  paper_bgcolor: '#ECECEC',
	  plot_bgcolor: '#ECECEC',
	  height: 600,
	  width: 1000
	};

	Plotly.newPlot('mypie', piedata, layout);
	
	
	//function to create charts after selecting specific ID on dropdown menu
	
	d3.select("#selDataset").on("change", handleSubmit);
	
	function handleSubmit(){
			
		//filter data
			
						
		var dropdownMenu = d3.select("#selDataset");	   
		var selectedid = dropdownMenu.property("value");
					
		var allowed = [selectedid]	
					
		const filtered = Object.keys(importedData)
		  .filter(key => allowed.includes(key))
		  .reduce((obj, key) => {
			obj[key] = importedData[key];
			return obj;
			}, {});
		console.log(filtered);

		
		limit = filtered[selectedid].length
		
		//Country Covid Info
		
		document.getElementById("sample-metadata").innerHTML = ""
		
		Object.entries(filtered[selectedid][limit-1]).forEach(([key, value]) => {
			console.log(`Key: ${key} and Value ${value}`);

			var para = document.createElement("P");                      
			var t = document.createTextNode(` ${key} :  ${value}`);      
			para.appendChild(t);                                          
			document.getElementById("sample-metadata").appendChild(para);

		});
		
		//Sort
		filtered[selectedid].sort(function(a, b) {
			return parseFloat(b.date) - parseFloat(a.date);
		});
		

		
		//Slice the last 30 days
		
		lowlimit = (filtered[selectedid].length)-30
		var SliceData = filtered[selectedid].slice(lowlimit,limit).reverse();				
		console.log(SliceData);
		
		//Variables for chart
		var countrydate = SliceData.map(country => country.date);
		var countryconfirmed = SliceData.map(country => country.confirmed);
		var countrydeaths  = SliceData.map(country => country.deaths);
		var countryrec = SliceData.map(country => country.recovered);

	
		//Chart
		
		var trace1 = {
			
			y: countryconfirmed,
			x: countrydate,
			name: 'Confirmed Cases',
			
			type: 'bar',
			//orientation: 'h',
			marker: {
				color: '#50A12F',
				width: 2

			}
			
		};
		
		var trace2 = {
			
			y: countrydeaths,
			x: countrydate,
			name: 'Deaths',
			
			type: 'bar',
			//orientation: 'h',
			marker: {
				color: '#E23F2E',
				width: 2

			}
			
		};		
		
		var trace3 = {
			
			y: countryrec,
			x: countrydate,
			name: 'Deaths',
			
			type: 'bar',
			//orientation: 'h',
			marker: {
				color: '#EFEA1A',
				width: 2

			}
			
		};				
		
		var chartData = [trace1, trace2,trace3];
	
		var layout = {
			title: ("Covid19 Cases for "+selectedid + " - Last 30 days"),
			margin: { t: 30, l: 150 },
			barmode: 'stack',
			paper_bgcolor: '#ECECEC',
			plot_bgcolor: '#ECECEC',
			autosize: false,
			width: 700,
			height: 400,
			margin: {
				l: 50,
				r: 50,
				b: 50,
				t: 100,
				pad: 4
			}
			
		};
		Plotly.newPlot("bar", chartData,layout);





	}
	
	});	
	
	






