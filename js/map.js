const width = 810;
const height = 600;

var color_min = '#0e9aaf'
var color_max = '#ffb400'
var color_border = '#0d2c54'
//var color_min = '#1f7a8c'
//var color_max = '#4b3f72'

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

d3.json('data/map_data.geojson').then(function(geojson) {
    // .attr('x', function(d,i){return 200+200*i*step})
    // .attr('y', 590)
    // .attr('width', 2)
    // .attr('height', 10)
    // .attr('fill', function(d){return color(d)});

  // svg.append("g")
  //   .attr("transform", "translate(610,20)")
  //   .append(() => legend({
  //     color: color,
  //     title: "test",
  //     width: 260,
  //     // tickValues: d3.utcYear.every(5).range(...color.domain()),
  //     // tickFormat: d3.utcFormat("%Y")
  //   }));

  deps.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", function(d) {return color(0);})
    .attr("stroke", color_border)
    .attr("stroke-width", 3)
    .on("mouseover", function(d) {
        var scale = 1.6;
        var bb = this.getBBox();
        // d3.select(this)
        //   .moveToFront()
        //   .transition()
        //   .duration(1000)
        //   .attrTween("transform", function(d, i, a) {
        //       return d3.interpolateString(a, 'scale('+scale+') translate('+((-10  -  170 * bb.x/500.)*scale/1.3)+', '+((-20 -  170 * bb.y/500.)*scale/1.3)+')')
        //   })
        div.transition()
            .duration(200)
            .style("opacity", 1);
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
        // d3.select(this)
        //   .transition()
        //   .duration(1000)
        //   .attrTween("transform", function(d, i, a) {
        //     return d3.interpolateString(a, 'scale(1)')
        //   })
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

function standardize(d, month, feature) {
  return (2*d.properties.data[month-1][feature] - d.properties.data[month-1][feature+'_max'] - d.properties.data[month-1][feature+'_min']) / (d.properties.data[month-1][feature+'_max'] - d.properties.data[month-1][feature+'_min'])
}

// Color bar
var color = d3.scaleLinear().domain([-1,0,1])
  .interpolate(d3.interpolateRgb)
  .range([d3.rgb(color_min), d3.rgb('#FFFFFF'), d3.rgb(color_max)]);

export function updateMap(month, feature) {
  d3.json('data/map_data.geojson').then(function(geojson) {
    deps.selectAll("path")
      .transition()
      .duration(1000)
      .attr("fill", function(d) {return color(standardize(d,month,feature));})
    });

  // const step = 0.005;
  // svg.selectAll('g').append('g')
  //   .data(d3.range(-1,1,step))
  //   .enter()
  //   .append('rect')
  //   .attr('x', 610)
  //   .attr('y', function(d,i){return 600-100*i*step})
  //   .attr('width', 15)
  //   .attr('height', 2)
  //   .attr('fill', function(d){return color(d)})
  //   .style('opacity', 0)
  //   .transition()
  //   .duration(2000)
  //   .delay(300)
  //   .style('opacity', 1)
}
