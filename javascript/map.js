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

d3.json('data/Hackaviz2020/capacites.geojson').then(function(geojson) {
    deps.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
});
