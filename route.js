window.addEventListener('load', ()=> {
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position => {
let markerCount = 0;
let markerCount1 = -1;
let markerArray = [];
var latitude1;
var latitude2;
let numero1;
let numero2;
let a;
let b;
let w;
let x;
let y;
let z;
let totalDistance;
var distanceInMeters;
const long = position.coords.longitude;
const lat = position.coords.latitude;

var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0,
    t;

function add() {
    seconds++;
   
    h1.textContent = (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

timer();



start.onclick = timer;


stop.onclick = function() {
    clearTimeout(t);
}


clear.onclick = function() {
   h1.textContent = "00";
   seconds = 0;
}

google.maps.event.addListener(map, 'click', function(event) {
markerCount++;
markerCount1++;
document.getElementById("demo").innerHTML += "<li id=lati" + markerCount + ">" + (event.latLng.lat()) + "<br></li>";
document.getElementById("demo1").innerHTML += "<li id=lngi" + markerCount + ">" + (event.latLng.lng()) + "<br></li>";
if (markerCount >= 2) {
for (let i = 0; i < markerCount; i++) {
w = document.getElementById("lati" + markerCount).textContent;
x = document.getElementById("lngi" + markerCount).textContent;
y = document.getElementById("lati" + markerCount1).textContent;
z = document.getElementById("lngi" + markerCount1).textContent;
latitude1 = new google.maps.LatLng({lat: parseFloat(w), lng: parseFloat(x)});
latitude2 = new google.maps.LatLng({lat: parseFloat(y), lng: parseFloat(z)});
};

distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
   latitude1,
   latitude2
);


console.log("Distance in Meters: ", distanceInMeters);

console.log("Distance in Kilometers: ", (distanceInMeters * 0.001));

document.getElementById("distanceP").innerHTML += "<li id=distance" + markerCount1 + ">" + (distanceInMeters * 0.001) + "<br> </li>"
};

if (markerCount === 2) {
a = document.getElementById("distance" + markerCount1).textContent;
console.log(a)
document.getElementById("distanceTotal").innerHTML = "Total Distance: " + (Math.floor(a)) + " Kilometers";
document.getElementById("forDistance").innerHTML = (a / 0.001);
}

if (markerCount >= 3) {
for (let x = 0; x < markerCount; x++) {
b = document.getElementById("distance" + markerCount1).textContent;
}
a = (+a + +b)
document.getElementById("distanceTotal").innerHTML = "Total Distance: " + (Math.floor(a)) + " Kilometers";
document.getElementById("forDistance").innerHTML = (a  / 0.001)
}

console.log(markerCount);
let myLatLng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
console.log(myLatLng);
markerArray.push(myLatLng);
console.log(markerArray)

var path = new google.maps.Polyline({
   path: markerArray,
   geodesic: true,
   strokeColor: '#FFFFFF',
   strokeOpacity: 1.0,
   strokeWeight: 2
});

path.setMap(map);

var marker1 = new google.maps.Marker({
      position: myLatLng,
      map: map,
    title: ('Placed Down ' + markerCount)
  });

});

});

} else {
window.alert("Please allow geolocation")
}

});
