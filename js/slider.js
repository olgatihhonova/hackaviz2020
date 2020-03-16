var elem = document.querySelector('input[type="range"]');

//var elem = document.getElementById("testrange");

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





/*
var elem = document.querySelector('input[type="range"]');

var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.value');

  target.innerHTML = newValue;
}

elem.addEventListener("input", rangeValue);
*/
