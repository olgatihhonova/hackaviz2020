const width = 1000;
const height = 500;

var svg = d3.select("div#map")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 "+width+" "+height)
  //class to make it responsive
  .classed("svg-content-responsive", true);

const path = d3.geoPath();

const projection = d3.geoConicConformal()
  .center([2.14, 43.36])
  .scale(5000);
  // .translate([width / 2, height / 2]);

path.projection(projection);


const deps = svg.append("g");

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.json('data/capacites.geojson').then(function(geojson) {
  deps.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .on("mouseover", function(d) {
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.html(d.properties.nom_dpt)
        .style("left", (d3.event.pageX + 30) + "px")
        .style("top", (d3.event.pageY - 30) + "px")
    })
    .on("mouseout", function(d) {
      div.style("opacity", 0);
      div.html("")
        .style("left", "-500px")
        .style("top", "-500px");
    });
});
