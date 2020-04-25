var curl = `http://127.0.0.1:5000/covid`;
var svg = d3.select(“#my_dataviz”)
    .append(“svg”)
    .append(“g”)
svg.append(“rect”)
    .attr(“width”, “100%“)
    .attr(“height”, “100%“)
    .attr(“fill”, “white”);
// Fetch the JSON data and console log it
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);
var x = d3.scaleLinear()
          .range([0, width]);
// append the svg object to the body of the page
// append a ‘group’ element to ‘svg’
// moves the ‘group’ element to the top left margin
var svg = d3.select(“body”).append(“svg”)
    .attr(“width”, width + margin.left + margin.right)
    .attr(“height”, height + margin.top + margin.bottom)
  .append(“g”)
    .attr(“transform”,
          “translate(” + margin.left + “,” + margin.top + “)”);
  // format the data
  d3.json(curl).then(function(data) {
// X axis
var x = d3.scaleBand()
.range([ 0, width ])
.domain(data.map(function(d) { return d.country; }))
.padding(0.2);
svg.append(“g”)
.attr(“transform”, “translate(0,” + height + “)”)
.call(d3.axisBottom(x))
.selectAll(“text”)
  .attr(“transform”, “translate(-10,0)rotate(-90)“)
  .style(“text-anchor”, “end”);
// Add Y axis
var y = d3.scaleLinear()
.domain([0, 13000])
.range([ height, 0]);
svg.append(“g”)
.call(d3.axisLeft(y));
// Bars
svg.selectAll(“mybar”)
.data(data)
.enter()
.append(“rect”)
  .attr(“x”, function(d) { return x(d.country); })
  .attr(“width”, x.bandwidth())
  .attr(“fill”, “black”)
  // no bar at the beginning thus:
  .attr(“height”, function(d) { return height - y(0); }) // always equal to 0
  .attr(“y”, function(d) { return y(0); })
// Animation
svg.selectAll(“rect”)
.transition()
.duration(800)
.attr(“y”, function(d) { return y(d.new_deaths); })
.attr(“height”, function(d) { return height - y(d.new_deaths); })
.delay(function(d,i){console.log(i) ; return(i*100)})
})