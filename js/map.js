const width = 810;
const height = 600;

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var svg = d3.select("div#map")
  .classed("svg-container", true)
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 "+width+" "+height)
  //class to make it responsive
  .classed("svg-content-responsive", true);

const path = d3.geoPath();

const projection = d3.geoConicConformal()
  .center([2.8, 44])
  .scale(10000)
  // .translate([width / 2, height / 2]);

path.projection(projection);

const deps = svg.append("g");

var div = d3.select("div#map").append("div")
    .classed("tooltip", true)
    .style("opacity", 0);

d3.json('data/capacites.geojson').then(function(geojson) {
  deps.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .on("mouseover", function(d) {
        var scale = 1.6;
        var bb = this.getBBox();
        // console.log('BBox',bb);
        // console.log('BoundingClient', this.getBoundingClientRect())
        // console.log('Client', d3.event.clientX, d3.event.clientY)
        // console.log('Page', d3.event.pageX, d3.event.pageY)
        d3.select(this)
          .moveToFront()
          .transition()
          .duration(1000)
          .attrTween("transform", function(d, i, a) {
              return d3.interpolateString(a, 'scale('+scale+') translate('+((-10  -  170 * bb.x/500.)*scale/1.3)+', '+((-20 -  170 * bb.y/500.)*scale/1.3)+')')
          })
        div.transition()
            .duration(200)
            .style("opacity", .9);
        div.html(d.properties.nom_dpt)
            .style("left", getTooltipXposition(div))
            .style("top", d3.event.clientY - svg.node().getBoundingClientRect().y + "px");
    })
    .on('mousemove', function() {
      div.transition()
         .duration(0)
         .style("opacity", .9);
      div.style("left", getTooltipXposition(div))
         .style("top", d3.event.clientY - svg.node().getBoundingClientRect().y + "px");
    })
    .on("mouseout", function(d) {
        d3.select(this)
          .transition()
          .duration(1000)
          .attrTween("transform", function(d, i, a) {
            return d3.interpolateString(a, 'scale(1)')
          })
        div.style("opacity", 0);
        div.html("")
            .style("left", "-500px")
            .style("top", "-500px");
    });
});

function getTooltipXposition(div){
  if (div.node().getBoundingClientRect().width + d3.event.clientX < (window.innerWidth - 30) ) {
    return (d3.event.clientX - svg.node().getBoundingClientRect().x + 20 + "px");
  }
  else {
    return (window.innerWidth - 30 - div.node().getBoundingClientRect().width - svg.node().getBoundingClientRect().x + 20 + "px");
  }
};
