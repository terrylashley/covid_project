var curl = "http://127.0.0.1:5000/covid";

// Fetch the JSON data and console log it

var margin = { top: 20, right: 40, bottom: 40, left: 150 },
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
svg.append("rect")
    .attr("width", 650)
    .attr("height", 2000)
    .attr("fill", "white");
// format the data
d3.json(curl).then(function(data) {
    var x = d3.scaleLinear()
        .domain([0, 10000])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10, 0) rotate(-45)")
        .style("text - anchor", "end");
    // Y axis
    var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function(d) { return d.country; }))
        .padding(10);
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("text", "white")
        .attr("transform", "translate(100, 0)")
        .style("text - anchor", "end");
    //Bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) + 5)
        .attr("y", function(d) { return y(d.country); })
        .attr("width", function(d) { return x(d.new_deaths); })
        .attr("height", y.bandwidth(5))
        .attr("fill", "#69B3A2")
        .attr("text", "black")

});