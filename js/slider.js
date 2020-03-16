/* show the right month */
var elem = document.getElementById("month-range");

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.month-value');

  if (newValue ==  1) {target.innerHTML = '<strong>Janvier</strong>';}
  if (newValue ==  2) {target.innerHTML = '<strong>Fevrier</strong>';}
  if (newValue ==  3) {target.innerHTML = '<strong>Mars</strong>';}
  if (newValue ==  4) {target.innerHTML = '<strong>Avril</strong>';}
  if (newValue ==  5) {target.innerHTML = '<strong>Mai</strong>';}
  if (newValue ==  6) {target.innerHTML = '<strong>Juin</strong>';}
  if (newValue ==  7) {target.innerHTML = '<strong>Juillet</strong>';}
  if (newValue ==  8) {target.innerHTML = '<strong>Aout</strong>';}
  if (newValue ==  9) {target.innerHTML = '<strong>Septembre</strong>';}
  if (newValue == 10) {target.innerHTML = '<strong>Octobre</strong>';}
  if (newValue == 11) {target.innerHTML = '<strong>Novembre</strong>';}
  if (newValue == 12) {target.innerHTML = '<strong>Decembre</strong>';}
}

elem.addEventListener("input", rangeValue);


/*extract the slider values to use in calc*/
var month = document.getElementById("month-range");
var monthValue = function() {
  var currentVal = month.value;
  document.getElementById("demo").innerHTML = "The current value of month is: " + currentVal;
}
month.addEventListener("input", monthValue);

var meteo = document.getElementById("meteo-range");
var meteoValue = function() {
  var defaultVal = meteo.defaultValue;
  var currentVal = meteo.value;
  document.getElementById("demo").innerHTML = "The current value of month is: " + currentVal;
}
meteo.addEventListener("input", meteoValue);

var temp = document.getElementById("temp-range");
var tempValue = function() {
  var currentVal = temp.value;
  document.getElementById("demo").innerHTML = "The current value of temp is: " + currentVal;
}
temp.addEventListener("input", tempValue);

var festival = document.getElementById("festival-range");
var festivalValue = function() {
  var currentVal = festival.value;
  document.getElementById("demo").innerHTML = "The current value of festival is: " + currentVal;
}
festival.addEventListener("input", festivalValue);

var pop = document.getElementById("pop-range");
var popValue = function() {
  var currentVal = pop.value;
  document.getElementById("demo").innerHTML = "The current value of pop is: " + currentVal;
}
pop.addEventListener("input", popValue);

var local = document.getElementById("local-range");
var localValue = function() {
  var currentVal = local.value;
  document.getElementById("demo").innerHTML = "The current value of local is: " + currentVal;
}
local.addEventListener("input", localValue);

var tourism = document.getElementById("tourism-range");
var tourismValue = function() {
  var currentVal = tourism.value;
  document.getElementById("demo").innerHTML = "The current value of tourism is: " + currentVal;
}
tourism.addEventListener("input", tourismValue);

var housing = document.getElementById("housing-range");
var housingValue = function() {
  var currentVal = housing.value;
  document.getElementById("demo").innerHTML = "The current value of housing is: " + currentVal;
}
housing.addEventListener("input", housingValue);







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
