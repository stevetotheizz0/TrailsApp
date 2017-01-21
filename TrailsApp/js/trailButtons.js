var filteredLayer;

$('#allTrails').click(function() {
  map.removeLayer(myFeatureGroup);
  myFeatureGroup = L.geoJson(parsedData, {
  style: function (feature) {
      return {
       "color": getColor(feature),
       "opacity": 1,
       "weight": 2.5,
     };}}).addTo(map).bringToBack();
});

$('#preferredTrails').click(function() {
  map.removeLayer(myFeatureGroup);
  myFeatureGroup = L.geoJson(parsedData, {
      filter: function(feature, layer) {
        return feature.properties.Descriptio == "Preferred";
      },
      style: function (feature) {
          return {
           "color": getColor(feature),
           "opacity": 1,
           "weight": 2.5,
          }
      },
    }).addTo(map);
});

$('#restrictedTrails').click(function() {
  map.removeLayer(myFeatureGroup);
  myFeatureGroup = L.geoJson(parsedData, {
      filter: function(feature, layer) {
        //return parseInt(feature.properties.Color) == 3 || parseInt(feature.properties.Color) == 1;
	return feature.properties.Descriptio == "Restricted";
      },
      style: function (feature) {
          return {
           "color": getColor(feature),
           "opacity": 1,
           "weight": 2.5,
          }
      },
    }).addTo(map);
});
