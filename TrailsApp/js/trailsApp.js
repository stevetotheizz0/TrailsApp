// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a:not(.dropdown-toggle)').click(function() {
    $('.navbar-toggle:visible').click();
});


var dataset = "geojson.json";


var map = L.map('map', {
  center: [35.931282, -84.310498],
  zoomControl:false,
  zoom: 13,
  minZoom:12
});

var HikeBike_HikeBike = L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 20,
  minZoom: 0,
  ext: 'png'
}).addTo(map);

map.locate({watch: true, enableHighAccuracy: true});

var markerStyle = {fillOpacity: 0.8, color: "#FFF", fillColor:"#0F2AC4", radius: 7, weight: 2, opacity: 0.8};

var marker
function onLocationFound(e) {
    if (marker) {map.removeLayer(marker)};
    var radius = e.accuracy / 2;
    marker = L.circleMarker(e.latlng, markerStyle).addTo(map);
    map.panTo(marker._latlng, {animate: true});
}

function onLocationError(e) {
    if (marker) {map.removeLayer(marker)};
    alert(e.message);
    marker = L.circleMarker([35.931282, -84.310498], markerStyle).addTo(map);
    map.panTo(marker._latlng, {animate: true});
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

function getColor(feature) {
  switch (feature.properties.Descriptio) {
   case  "Restricted" : return '#bf360c';
   case  "Preferred" : return ' #006633';
   default: return '#ffff33';
  }
}

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    parsedData = data;
    myFeatureGroup = L.geoJson(parsedData, {
    style: function (feature) {
        return {
         "color": getColor(feature),
         "opacity": 1,
         "weight": 2.5,
       };}}).addTo(map).bringToBack();
  });
});

var zoom = document.documentElement.clientWidth / window.innerWidth;
$(window).resize(function() {
    var zoomNew = document.documentElement.clientWidth / window.innerWidth;
    if (zoom != zoomNew) {
        // zoom has changed
        // adjust your fixed element
        zoom = zoomNew;
    }
});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

$('.dropdown-item').click(function() {
    var raiseZ = function(){document.getElementById("wrapper").style.zIndex=9999;}
    switch (this.id) {
     case  "about-item" : $('.menu-item').hide(); $("#about-page").show(); raiseZ(); break;
     case  "contact-item" : $('.menu-item').hide(); $("#contact-page").show(); raiseZ();break;
     case  "legend-item": $('.menu-item').hide(); $("#legend-page").show(); raiseZ(); break;
    }
  console.log(this.id)

});


$('.closebtn').click(function() {
  $('.closebtn').parent().hide();
  $("#wrapper").css('z-index','');
});
