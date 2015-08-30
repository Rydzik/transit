// set up the map center and zoom level
var map = L.map('map', {
  center: [41.76, -72.67], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 10, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
  zoomControl: false // add later to reposition
});

// optional : customize link to view source code; add your own GitHub repository
map.attributionControl
.setPrefix('View <a href="http://github.com/jackdougherty/transit">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "bottomright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
}).addTo(map);

// optional: reposition zoom control other than default topleft
L.control.zoom({position: "topright"}).addTo(map);


/* BASELAYERS */
// use common baselayers below, delete, or add more with plain JavaScript from http://leaflet-extras.github.io/leaflet-providers/preview/
// .addTo(map); -- suffix displays baselayer by default
// controlLayers.addBaseLayer (variableName, 'label'); -- adds baselayer and label to legend; omit if only one baselayer with no toggle desired
var lightAll = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map); //this displays layer by default
controlLayers.addBaseLayer(lightAll, 'CartoDB LightAll');

/* POINT OVERLAYS */
// ways to load point map data from different sources: coordinates in the code, GeoJSON in local directory, remote GeoJSON and JSON

// load one point from coordinates in code, icon from local directory, no interactive legend button
// places a star on state capital of Hartford, CT
// * TO DO: test whether placement of this code affects its display order, on top of other icons?
// var starIcon = L.icon({
//   iconUrl: 'src/star-18.png',
//   iconRetinaUrl: 'src/star-18@2x.png',
//   iconSize: [18, 18]
// });
// L.marker([41.764, -72.682], {icon: starIcon}).addTo(map);

// load point geojson data from local directory, using jQuery function (symbolized by $)
// modify icon source and styling
// modify pointToLayer marker bindPopup function to display GeoJSON data in info window
// option to insert '.addTo(map)' to display layer by default
// insert controlLayers.addOverlay(geoJsonLayer, 'InsertYourTitle') to add to legend

// load GeoJSON point data and clickable icons from local directory, using jQuery function (symbolized by $)
// $.getJSON("src/points.geojson", function (data){
//   var iconStyle = L.icon({
//     iconUrl: "src/hospital-18.png",
//     iconRetinaUrl: 'src/hospital-18@2x.png',
//     iconSize: [18, 18]
//   });
//   var geoJsonLayer = L.geoJson(data, {
//     pointToLayer: function( feature, latlng) {
//       var marker = L.marker(latlng,{icon: iconStyle});
//       marker.bindPopup(feature.properties.Location); // replace 'Location' with properties data label from your GeoJSON file
//       return marker;
//     }
//   }); // insert ".addTo(map)" to display layer by default
//   controlLayers.addOverlay(geoJsonLayer, 'Hospitals');
// });

// load geoJson markers from remote API feed: USGS earthquakes
// http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// use onEachFeature function to more info window data from geoJson source
var geoJsonURL = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
$.getJSON(geoJsonURL, function (data) {
  var geoJsonLayer = L.geoJson(data, {
    onEachFeature: function( feature, layer) {
      var popupText = "Magnitude: " + feature.properties.mag
         + "<br>Location: " + feature.properties.place
         + "<br><a href='" + feature.properties.url + "'>More info</a>";
      layer.bindPopup(popupText);
    }
  });  // insert ".addTo(map)" to display layer by default
  controlLayers.addOverlay(geoJsonLayer, 'USGS Earthquakes (zoom out)');  // insert your 'Title' to add to legend
});

// Define endpoint
// https://apigee.com/console/others
var endpointURL = "http://65.213.12.244/realtimefeed/vehicle/vehiclepositions.json";


// Load data from JSON feed (insert your endointURL above), display with clickable blue markers
$.getJSON(endpointURL, function (data) {
  // Create new layerGroup for the markers, with option to append ".addTo(map);" to display by default
  var layerGroup = new L.LayerGroup();
  // Add layerGroup to your layer control and insert your label to appear in legend
  controlLayers.addOverlay(layerGroup, 'JSON feed - blue markers'); // Insert your own legend label
  // Start a loop to insert JSON data into container
  for (var i = 0; i < entity.vehicle.position.length; i++) {
    var container = entity.vehicle.position[i];
    var marker = new L.marker([container.latitude, container.longitude]);
    // marker.bindPopup(popupHTML(container));
    // Add the marker to the layerGroup
    marker.addTo(layerGroup);
  }
});
//
// // Load photos from flickr JSON (insert your flickrURL above), display with clickable photo thumbnails
// $.getJSON(flickrURL, function (data) {
//   // Create new layerGroup for the markers, with option to append ".addTo(map);" to display by default
//   var layerGroup = new L.LayerGroup().addTo(map);
//   // Add layerGroup to your layer control and insert your label to appear in legend
//   controlLayers.addOverlay(layerGroup, 'Flickr photo thumbnail icons');
//   // Start a loop to insert flickr photo data into photoContent
//   for (var i = 0; i < data.photos.photo.length; i++) {
//     var photoContent = data.photos.photo[i];
//     var photoIcon = L.icon(
//       {iconUrl: photoContent.url_t,
//       iconSize: [photoContent.width_t * 0.5, photoContent.height_t * 0.5]}  //reduces thumbnails 50%
//     );
//     var marker = new L.marker([photoContent.latitude, photoContent.longitude], {icon: photoIcon});
//     marker.bindPopup(popupHTML(photoContent));
//     // Add the marker to the layerGroup
//     marker.addTo(layerGroup);
//   }
// });
