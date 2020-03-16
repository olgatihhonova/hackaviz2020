import {updateMap} from './map.js'


/* show the right month */
var elem = document.getElementById("month-range");

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
var month = document.getElementById("month-range");
var monthValue = function() {
  var currentVal = month.value;
  document.getElementById("demo").innerHTML = "The current value of month is: " + currentVal;
}
month.addEventListener("input", monthValue);

var meteo = document.getElementById("meteo-range");
var meteoValue = function() {
  var currentVal = meteo.value;
  var monthVal = month.value;

  updateMap(monthVal, "meteo");
  document.getElementById("demo").innerHTML = "The current value of meteo is: " + currentVal + monthVal;
}
meteo.addEventListener("input", meteoValue);

var temp = document.getElementById("temp-range");
var tempValue = function() {
  var currentVal = temp.value;
  var monthVal = month.value;

  updateMap(monthVal, "Temp_midi");
  document.getElementById("demo").innerHTML = "The current value of temp is: " + currentVal + monthVal;
}
temp.addEventListener("input", tempValue);

var festival = document.getElementById("festival-range");
var festivalValue = function() {
  var currentVal = festival.value;
  var monthVal = month.value;

  updateMap(monthVal, "nb_evt");
  document.getElementById("demo").innerHTML = "The current value of festival is: " + currentVal + monthVal;
}
festival.addEventListener("input", festivalValue);

var pop = document.getElementById("pop-range");
var popValue = function() {
  var currentVal = pop.value;
  var monthVal = month.value;

  updateMap(monthVal, "pop_dpt");
  document.getElementById("demo").innerHTML = "The current value of pop is: " + currentVal + monthVal;
}
pop.addEventListener("input", popValue);

var local = document.getElementById("local-range");
var localValue = function() {
  var currentVal = local.value;
  var monthVal = month.value;

  updateMap(monthVal, "volume_sur_pop");
  document.getElementById("demo").innerHTML = "The current value of local is: " + currentVal + monthVal;
}
local.addEventListener("input", localValue);

var tourism = document.getElementById("tourism-range");
var tourismValue = function() {
  var currentVal = tourism.value;
  var monthVal = month.value;

  updateMap(monthVal, "frac_internationale");
  document.getElementById("demo").innerHTML = "The current value of tourism is: " + currentVal + monthVal;
}
tourism.addEventListener("input", tourismValue);

var housing = document.getElementById("housing-range");
var housingValue = function() {
  var currentVal = housing.value;
  var monthVal = month.value;

  updateMap(monthVal, "volume_sur_hbgt");
  document.getElementById("demo").innerHTML = "The current value of housing is: " + currentVal + monthVal;
}
housing.addEventListener("input", housingValue);

/*extract all slider values to use for best destination calc */
function getSliderValues() {
  var monthVal = month.value;
  var meteoVal = meteo.value;
  var tempVal = temp.value;
  var festivalVal = festival.value;
  var popVal = pop.value;
  var localVal = local.value;
  var tourismVal = tourism.value;
  var housingVal = housing.value;

  document.getElementById("demo").innerHTML =
  "The current values are "+monthVal+meteoVal+tempVal+festivalVal+popVal+localVal+tourismVal+housingVal;
}






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
