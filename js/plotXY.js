import {updateSelection} from './map.js'

const line_color = '#FFF';
const selection_color = '#F8333C';
// const label_color = '#bdc3c7';
const label_color = '#FFF';

// Set the dimensions of the canvas / graph
var margin = {top: 80, right: 20, bottom: 160, left: 200},
    width = 810,
    height = 600;

const mois = ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juill.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];

var svg = d3.select("div#plotxy")
  // .classed("svg-container", true)
  .append("svg")
  // .attr("width", width + margin.left + margin.right)
  // .attr("height", height + margin.top + margin.bottom)
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 "+width+" "+height)
  //class to make it responsive
  // .classed("svg-content-responsive", true)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Set the ranges
var x = d3.scaleLinear().range([0, width - margin.left - margin.right]);
var y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

// Define the axes
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y).ticks(7);

function valueline(data, feature) {
  var path = d3.line()
      .x(function(d) { return x(d.month); })
      .y(function(d) { return y(d[feature]); });
  return path(data);
}


const label_feature = {
  "meteo": ["Conditions météorologiques moyennes", "(0: mauvaises, 4: idéales)"],
  "Temp_midi": ["Température moyenne à midi", "en degrés Celsius"],
  "nb_evt": ["Nombre moyen d'évènements", "majeurs par jour"],
  "pop_dpt": ["Nombre d'habitants"],
  "volume": ["Nombre moyen de visiteurs", "présents chaque jour"],
  "frac_internationale": ["Fraction des visiteurs", "venant de l'étranger"],
  "volume_sur_hbgt": ["Rapport du nombre de visiteurs", "sur le nombre de places estimées", "d'hébergement temporaire"]//, "(Hotels, Auberges, Camping, ...)"]
}
// // Adds the svg canvas
// var svg = d3.select("div#plotxy")
//     .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//         .attr("transform",
//               "translate(" + margin.left + "," + margin.top + ")");

// Add the X Axis
var x_bar = svg.append("g");
// Add the Y Axis
var y_bar = svg.append("g");
// Add group for lines
var lines = svg.append("g");
// Add group for y-label
const label = svg.append('g');


function getMax(data, feature) {
  var l = [];
  for (var i=0; i < data.length; i++) {
    l.push(d3.max(data[i].properties.data, function(d) { return d[feature]; }));
  }
  return d3.max(l);
}


function getMin(data, feature) {
  var l = [];
  for (var i=0; i < data.length; i++) {
    l.push(d3.min(data[i].properties.data, function(d) { return d[feature]; }));
  }
  return d3.min(l);
}

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var div = d3.select("div#plotxy").append("div")
    .classed("tooltip", true)
    .style("opacity", 0);


// transitions for mouseover
var t_mouseover = d3.transition()
  .duration(200);
// transitions for mouseout
var t_mouseout = d3.transition()
  .duration(200);
// transitions for updates
var t_update = d3.transition("update")
  .duration(1000);
// transition for labels
var duration = 500;
var delay = 0;

var selected_dpt = ''
var selected_feature = 'meteo';

d3.json('data/map_data.geojson').then(function(geojson) {

  var data = geojson.features

  // Format data in the proper way
  var x_feat = 'month';
  var y_feat = selected_feature;

  var max = getMax(data, y_feat);

  // Scale the range of the data
  x.domain([getMin(data, x_feat), getMax(data, x_feat)]);
  y.domain([getMin(data, y_feat), getMax(data, y_feat)]);

  // Add the valueline path.
  lines.selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", line_color)
    .attr("stroke-width", 10)
    .attr('opacity', 0.2)
    .attr("d", function(d) { return valueline(d.properties.data, y_feat); })
    .on("mouseover", function (d) {
      d3.select(this)
        // .transition(t_mouseover)
        .transition()
        .attr('opacity', 1);

      div.transition()
          .duration(200)
          .style("opacity", 1);
      div.html(d.properties.nom_dpt)
          .style("left", getTooltipXposition(div))
          .style("top", d3.event.clientY - svg.node().getBoundingClientRect().y + 60 + "px");
    })
    .on('mousemove', function(d) {
      div.transition()
         .duration(0)
         .style("opacity",  1);
      div.style("left", getTooltipXposition(div))
         .style("top", d3.event.clientY - svg.node().getBoundingClientRect().y + 60 + "px");
    })
    .on("mouseout", function(d) {
        d3.select(this)
          // .transition(t_mouseout)
          .transition()
          .attr('opacity', function(d) { if (d.properties.nom_dpt == selected_dpt) {return 1;} else {return 0.1;}});

        div.style("opacity", 0);
        div.html("")
            .style("left", "-500px")
            .style("top", "-500px");
    })
    .on("click", function(d) {
      updateSelection(d.properties.nom_dpt);
      updatePlot(selected_feature, d.properties.nom_dpt);
    })
    x_bar.attr("class", "x axis")
      .attr("transform", "translate(0," + (height-margin.top-margin.bottom) + ")")
      .call(xAxis)
      .selectAll("text")
        .data(mois)
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" )
        .text(function(d) { return d; });

    y_bar.attr("class", "y axis")
      .call(yAxis)
      .selectAll("text")
        .attr("dx", "-.8em");

    var labels = label.selectAll('text')
      .data(label_feature[y_feat])

    labels.enter()
      .append('text')
      .classed('label', true)
      .attr("transform", "rotate(-90)")
      .attr('x', x_init)
      .attr('y', y_init)
      .attr('fill', label_color)
      .attr('y', function(d,i){return y_init+75+i*28})
      .style('text-anchor', 'middle')
      .style('opacity', 0)
      .transition()
      .delay(duration/2)
      .duration(duration/2)
      .style('opacity', 1)
      .text(function(d){return d;});
})

function getTooltipXposition(div){
  if (div.node().getBoundingClientRect().width + d3.event.clientX < (window.innerWidth - 30) ) {
    return (d3.event.clientX - svg.node().getBoundingClientRect().x + 80 + "px");
  }
  else {
    return (window.innerWidth - 30 - div.node().getBoundingClientRect().width - svg.node().getBoundingClientRect().x + 80 + "px");
  }
};


var x_init = -180;
var y_init = -210;

var old_feature = selected_feature;

export function updatePlot(feature, nom_dpt) {
  // Update selected dpt
  selected_dpt = nom_dpt;
  selected_feature = feature;

  document.getElementById("radio-"+selected_feature).checked = true;

  d3.json('data/map_data.geojson').then(function(geojson) {
    var data = geojson.features
    // Format data in the proper way
    // var x_feat = 'month';
    var y_feat = feature;

    var max = getMax(data, feature);

    // Scale the range of the data
    // x.domain([getMin(data, x_feat), getMax(data, x_feat)]);
    y.domain([getMin(data, y_feat), getMax(data, y_feat)]);

    lines.selectAll('path')
      .data(data)
      .transition(t_update)
      .attr("d", function(d) { return valueline(d.properties.data, feature); })
      .attr("stroke", function(d) { if( d.properties.nom_dpt==nom_dpt ) { return selection_color; } else { return line_color; }})
      .attr("opacity", function(d) { if( d.properties.nom_dpt==nom_dpt ) { return 1; } else { return 0.1; }})
    // x_bar.transition(t_update) // change the x axis
    //     .call(xAxis)
    //     .selectAll("text")
    //       .data(mois)
    //       .style("text-anchor", "end")
    //       .attr("dx", "-.8em")
    //       .attr("dy", ".15em")
    //       .attr("transform", "rotate(-65)" )
    //       .text(function(d) { return d; })

    var labels = label.selectAll('text')
      .data(label_feature[feature])

    if (selected_feature != old_feature) {
      labels.exit()
        .transition()
        .delay(delay)
        .duration(duration/2)
        .style('opacity', 0)
        .remove();

      labels.enter()
        .append('text')
        .classed('label', true)
        .attr("transform", "rotate(-90)")
        .attr('x', x_init)
        .attr('y', y_init)
        .attr('fill', label_color)
        .attr('y', function(d,i){return y_init+75+i*28})
        .style('text-anchor', 'middle')
        .style('opacity', 0)
        .transition()
        .delay(duration/2)
        .duration(duration/2)
        .style('opacity', 1)
        .text(function(d){return d;});

      labels.transition()
        .duration(duration/2)
        .style('opacity', 0)
        .transition()
        // .delay(duration/3)
        .duration(duration/3)
        .attr('x', x_init)
        .attr('y', function(d,i){return y_init+75+i*28})
        .style('text-anchor', 'middle')
        .style('opacity', 1)
        .text(function(d){return d;});

      old_feature = selected_feature;
    }

    y_bar.transition(t_update)// change the y axis
        .call(yAxis);

    y_bar.attr("class", "y axis")
      .call(yAxis)
      .selectAll("text")
        .attr("dx", "-.8em");
  });
}


// updatePlot('Temp_midi', 'Tarn');
