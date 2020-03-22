import {updatePlot} from './plotXY.js'

const width = 810;
const height = 600;

var color_min = '#0e9aaf'
var color_max = '#ffb400'
var color_border = '#0d2c54'

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

// Color bar
var color = d3.scaleLinear().domain([-1,0,1])
  .interpolate(d3.interpolateRgb)
  .range([d3.rgb(color_min), d3.rgb('#FFFFFF'), d3.rgb(color_max)]);

var svg = d3.select("div#mapd3")
  .classed("svg-container", true)
  .append("svg")
  // .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 "+width+" "+height)
  // //class to make it responsive
  // .classed("svg-content-responsive", true);

const path = d3.geoPath();

const projection = d3.geoConicConformal()
  .center([2.8, 44])
  .scale(10000)

path.projection(projection);

const deps = svg.append("g");

var div = d3.select("div#mapd3").append("div")
    .classed("tooltip", true)
    .style("opacity", 0);

const step = 0.005;

// Setup colorbar
const x_init = 570;
const y_init = 400;

var colorbar = svg.selectAll('g').append('g')
  .data(d3.range(-1,1,step))
  .enter()
  .append('rect')
  .attr('x', function(d,i){return x_init+100*i*step})
  .attr('y', y_init)
  .attr('width', 1)
  .attr('height', 10)
  .attr('fill', function(d){return color(d);})
  .style('opacity', 0);

// Setup legend
var legend_data = [{'x': x_init, 'text': 'min', 'color': color_min}, {'x': x_init+100, 'text': 'middle', 'color': '#fff'}, {'x': x_init+200, 'text': 'max', 'color': color_max}];

var legend = svg.append('g');

legend.selectAll('rect')
  .data(legend_data)
  .enter()
  .append('rect')
  .attr('x',function(d){return d.x;})
  .attr('y', y_init)
  .attr('width', 2)
  .attr('height', 20)
  .attr('fill', function(d){return d.color;})
  .style('opacity', 0)
legend.selectAll('text')
  .data(legend_data)
  .enter()
  .append('text')
  .classed('legend', true)
  .attr('x', function(d){return d.x;})
  .attr('y', y_init+40)
  .attr('fill', 'white')
  .text(function(d){return d.text;})
  .style('opacity', 0)
  .style("text-anchor", "middle")


var old_feature = 'old';

// Setup map
d3.json('data/map_data.geojson').then(function(geojson) {

  deps.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", function(d) {return color(0);})
    .attr("stroke", color_border)
    .attr("stroke-width", 3)
    .on("mouseover", function(d) {
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
         .style("opacity", 1);
      div.style("left", getTooltipXposition(div))
         .style("top", d3.event.clientY - svg.node().getBoundingClientRect().y + "px");
    })
    .on("mouseout", function(d) {
        div.style("opacity", 0);
        div.html("")
            .style("left", "-500px")
            .style("top", "-500px");
    })
    .on("click", function(d) {
      var feat = (old_feature == 'old') ? 'meteo' : old_feature;
      updatePlot(feat, d.properties.nom_dpt);
    })
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

export const label_feature = {
  "meteo": ["Conditions météorologiques", "moyennes", "(0: mauvaises, 4: idéales)"],
  "Temp_midi": ["Température moyenne à midi", "en degrés Celsius"],
  "nb_evt": ["Nombre moyen d'évènements", "majeurs par jour"],
  "pop_dpt": ["Nombre d'habitants", ""],
  "volume": ["Nombre moyen de visiteurs", "présents chaque jour"],
  "frac_internationale": ["Fraction des visiteurs", "venant de l'étranger"],
  "volume_sur_hbgt": ["Rapport du nombre de visiteurs", "sur le nombre de places estimées", "d'hébergement temporaire"]//, "(Hotels, Auberges, Camping, ...)"]
}


const delay = 0;
const duration = 1000;
const label = svg.append('g');


var old_month = -1;
var just_got_best = false;

export function updateMap(month, feature) {
  // Make colorbar appear
  colorbar.transition()
    .duration(duration/2)
    .delay(duration/2)
    .style('opacity', 1);
  // Make legend ticks appear
  legend.selectAll('rect')
    .transition()
    .duration(duration/2)
    .delay(duration/2)
    .style('opacity', 1);

  d3.json('data/map_data.geojson').then(function(geojson) {

    // Update legend
    var max_feature = geojson.features[0].properties.data[month-1][feature+'_max'];
    var min_feature = geojson.features[0].properties.data[month-1][feature+'_min'];
    var mean_feature = (max_feature + min_feature) / 2;

    var labels_data = [min_feature, mean_feature, max_feature];

    var n_digits = 1;
    if (max_feature < 10) {
      n_digits = 2;
    }

    for (var i=0; i < labels_data.length; i++) {
      if (labels_data[i]>=1000) {
        labels_data[i]/= 1000;
        labels_data[i] = labels_data[i].toFixed(n_digits);
        labels_data[i]+= 'k';
      }
      else {
        if(  labels_data[i] != 0) {
          labels_data[i] = labels_data[i].toFixed(n_digits);
        }
      }

    }

    // Update map colors
    deps.selectAll("path")
      .data(geojson.features)
      .transition()
      .duration(1000)
      .attr("fill", function(d) {return color(standardize(d,month,feature));})
      .attrTween("transform", function(d, i, a) {
        return d3.interpolateString(a, 'scale(1)')
      });

      // Make label appear
      if ((feature != old_feature)||(just_got_best==true)) {
        var labels = label.selectAll('text')
          .data(label_feature[feature])

        labels.exit()
          .transition()
          .delay(delay)
          .duration(duration/2)
          .style('opacity', 0)
          .remove();

        labels.enter()
          .append('text')
          .classed('label', true)
          .attr('x', x_init+100)
          .attr('y', y_init+75)
          .attr('fill', 'white')
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
          .attr('x', x_init+100)
          .attr('fill', 'white')
          .attr('y', function(d,i){return y_init+75+i*28})
          .style('text-anchor', 'middle')
          .style('opacity', 1)
          .text(function(d){return d;});
        legend.selectAll('text')
          .data(labels_data)
          .transition()
          .duration(duration/2)
          .style('opacity', 0)
          .transition(duration/2)
          .text(function(d){return d;})
          .style('opacity', 1);
        old_feature = feature;
      }
      if ((old_month != month)||(just_got_best==true)) {
        legend.selectAll('text')
          .data(labels_data)
          .transition()
          .duration(duration/2)
          .style('opacity', 0)
          .transition(duration/2)
          .text(function(d){return d;})
          .style('opacity', 1);
        old_month = month;
      }
      just_got_best = false;
  });
}


export function resetColorBar() {
  colorbar.transition()
    .duration(1000)
    .style('opacity', 0);
  legend.selectAll('rect')
    .transition()
    .duration(1000)
    .style('opacity', 0);
  legend.selectAll('text')
    .transition()
    .duration(1000)
    .style('opacity', 0);
  label.selectAll('text')
    .transition()
    .duration(1000)
    .style('opacity', 0);
}

export function resetMap() {
  deps.selectAll('path')
    .transition()
    .duration(1000)
    .attr('fill', '#fff');
  resetColorBar();
  old_month = '-1';
  old_feature = 'old';
}


export function getBestDestination(month, vals, callback) {
  just_got_best = true;
  d3.json('data/map_data.geojson').then(function(geojson) {

    var scores = [];
    for (var i=0; i < geojson.features.length; i++) {
      var score_dpt = 0;
      for (var key in vals) {
        score_dpt += (vals[key]-5)/5. * standardize(geojson.features[i], month, key);
      }
      scores.push(score_dpt);
    }

    var best = []
    var best_names = []
    for (var i=0; i < geojson.features.length; i++) {
      if (scores[i] == Math.max.apply(null, scores)) {
        best.push(1);
        best_names.push(geojson.features[i].properties.nom_dpt)
      }
      else {
        best.push(0);
      }
      deps.selectAll('path')
        .data(geojson.features)
        .transition()
        .duration(1000)
        .attr('fill', function(d,i) {if (best[i]==1) {return '#F8333C';} else { return '#fff';}})
      resetColorBar();
    }
    callback(best_names);
    //return best_names;
  });
}
