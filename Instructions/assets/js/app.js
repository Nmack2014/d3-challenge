
d3.csv("./assets/data/data.csv").then(function(StateData) {

    console.log(StateData);
  
    // log a list of names
    var states = StateData.map(data => data.state);
    var healthcare = StateData.map(data => data.healthcare);
    var poverty = StateData.map(data => data.poverty);
    console.log("states", states);
    console.log("healthcare", healthcare);
    console.log("poverty", poverty);
  

    // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
width = 460 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


// Add X axis
var x = d3.scaleLinear()
.domain([4, 25])
.range([ 0, width ]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([4, 25])
.range([ height, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add dots
// svg.append('g')
// .selectAll("dot")
// .data(StateData)
// .enter()
// .append("circle")
//   .attr("cx", function (d) { return x(d.healthcare); } )
//   .attr("cy", function (d) { return y(d.poverty); } )
//   .attr("r", 6)
//   .style("fill", "#69b3a2")

var data_points = svg.selectAll("g")
                .data(StateData)
                .enter()
                .append("g");

data_points.append("circle")
  .attr("class", "dot")
  .attr("cx", function(d) { return x(d.poverty); })
  .attr("cy", function(d) { return y(d.healthcare); })
  .attr("r", 3);

data_points.append("text")
  .attr("x", function(d) { return x(d.poverty); })
  .attr("y", function(d) { return y(d.healthcare); })
  .text(function(d) { return d.abbr;});

    }).catch(function(error) {
      console.log(error);
    });
