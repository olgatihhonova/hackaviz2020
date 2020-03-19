import {updateMap, getBestDestination, resetMap} from './map.js'


/* show the right month */
var elem = document.getElementById("month");

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.month-value');

  if (newValue ==  1) {target.innerHTML = '<strong>Janvier</strong>';}
  if (newValue ==  2) {target.innerHTML = '<strong>Février</strong>';}
  if (newValue ==  3) {target.innerHTML = '<strong>Mars</strong>';}
  if (newValue ==  4) {target.innerHTML = '<strong>Avril</strong>';}
  if (newValue ==  5) {target.innerHTML = '<strong>Mai</strong>';}
  if (newValue ==  6) {target.innerHTML = '<strong>Juin</strong>';}
  if (newValue ==  7) {target.innerHTML = '<strong>Juillet</strong>';}
  if (newValue ==  8) {target.innerHTML = '<strong>Août</strong>';}
  if (newValue ==  9) {target.innerHTML = '<strong>Septembre</strong>';}
  if (newValue == 10) {target.innerHTML = '<strong>Octobre</strong>';}
  if (newValue == 11) {target.innerHTML = '<strong>Novembre</strong>';}
  if (newValue == 12) {target.innerHTML = '<strong>Décembre</strong>';}
}

elem.addEventListener("input", rangeValue);

/*extract the slider values to use for map coloring */
var monthId = "month";
var meteoId = "meteo";
var tempId = "Temp_midi";
var festivalId = "nb_evt";
var popId = "pop_dpt";
var localId = "volume_sur_pop";
var tourismId = "frac_internationale";
var housingId = "volume_sur_hbgt";
var activeId = "none"

var month = document.getElementById(monthId);
var meteo = document.getElementById(meteoId);
var temp = document.getElementById(tempId);
var festival = document.getElementById(festivalId);
var pop = document.getElementById(popId);
var local = document.getElementById(localId);
var tourism = document.getElementById(tourismId);
var housing = document.getElementById(housingId);

function monthValue() {
  var currentVal = month.value;
  if (activeId != "none") {
    var activeEl = document.getElementById(activeId);
    var activeVal = activeEl.value;
    updateMap(currentVal, activeId);
    document.getElementById("demo").innerHTML = "The current value of month is: " + currentVal + activeId;
  }
  else {
    resetMap();
    document.getElementById("demo").innerHTML = "The current value of month is panic: " + currentVal + activeId;
  }
}
month.addEventListener("input", monthValue);

function meteoValue() {
  var currentVal = meteo.value;
  var monthVal = month.value;
  activeId = meteoId;
  updateMap(monthVal, "meteo");

  document.getElementById("demo").innerHTML = "The current value of meteo is: " + currentVal + monthVal;
}
meteo.addEventListener("input", meteoValue);

function tempValue() {
  var currentVal = temp.value;
  var monthVal = month.value;
  activeId = tempId;
  updateMap(monthVal, tempId);

  document.getElementById("demo").innerHTML = "The current value of temp is: " + currentVal + monthVal;
}
temp.addEventListener("input", tempValue);

function festivalValue() {
  var currentVal = festival.value;
  var monthVal = month.value;
  activeId = festivalId;
  updateMap(monthVal, festivalId);

  document.getElementById("demo").innerHTML = "The current value of festival is: " + currentVal + monthVal;
}
festival.addEventListener("input", festivalValue);

function popValue() {
  var currentVal = pop.value;
  var monthVal = month.value;
  activeId = popId;
  updateMap(monthVal, popId);

  document.getElementById("demo").innerHTML = "The current value of pop is: " + currentVal + monthVal;
}
pop.addEventListener("input", popValue);

function localValue() {
  var currentVal = local.value;
  var monthVal = month.value;
  activeId = localId;
  updateMap(monthVal, localId);

  document.getElementById("demo").innerHTML = "The current value of local is: " + currentVal + monthVal;
}
local.addEventListener("input", localValue);

function tourismValue() {
  var currentVal = tourism.value;
  var monthVal = month.value;
  activeId = tourismId;
  updateMap(monthVal, tourismId);

  document.getElementById("demo").innerHTML = "The current value of tourism is: " + currentVal + monthVal;
}
tourism.addEventListener("input", tourismValue);

function housingValue() {
  var currentVal = housing.value;
  var monthVal = month.value;
  activeId = housingId;
  updateMap(monthVal, housingId);

  document.getElementById("demo").innerHTML = "The current value of housing is: " + currentVal + monthVal;
}
housing.addEventListener("input", housingValue);

  /*extract all slider values to use for best destination calc */
var bestDestination = document.getElementById("destination-button");
function bestDestinationValue() {
  var monthVal = month.value;
  var vals = {
     'meteo' : meteo.value,
     'Temp_midi' : temp.value,
     'nb_evt' : festival.value,
     'pop_dpt' : pop.value,
     'volume_sur_pop' : local.value,
     'frac_internationale' : tourism.value,
     'volume_sur_hbgt' : housing.value
  }
  activeId = "none"

  getBestDestination(monthVal, vals)
  // document.getElementById("demo").innerHTML =
  // "The current values are "+monthVal+meteoVal+tempVal+festivalVal+popVal+localVal+tourismVal+housingVal;
}
bestDestination.addEventListener("click", bestDestinationValue);




//getSliderValue("temp-range")


/*function myFunction() {
  var x = document.getElementById("temp-range");
  var defaultVal = x.defaultValue;
  var currentVal = x.value;

  if (defaultVal == currentVal) {
    document.getElementById("demo").innerHTML = "Default value and current value is the same: "
    + x.defaultValue + " and " + x.value
    + "<br>Slide up or down with the slider control to see the difference!";
  } else {
    document.getElementById("demo").innerHTML = "The default value was: " + defaultVal
    + "<br>The new, current value is: " + currentVal;
  }
}
*/





/*
var elem = document.querySelector('input[type="range"]');

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.value');

  target.innerHTML = newValue;
}

elem.addEventListener("input", rangeValue);
*/
