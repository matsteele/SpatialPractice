
var mymap = L.map('mapid').setView([40.777686, -73.954209], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoibWF0c3RlZWxlIiwiYSI6ImNqOTV5MWxkeTRxM3kzMm80aW9lcm1xeWkifQ.vF_5vgkntZ5b9E-8iSBfAg'
}).addTo(mymap);


var existingXFits = null;

var cartoDBUserName = "matsteele";
var sqlQuery = "SELECT * FROM existingxfits4";


function showAll(){
    if(mymap.hasLayer(existingXFits)){
        mymap.removeLayer(existingXFits);
    };
    // Get CARTO selection as GeoJSON and Add to Map
    // $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
    //     existingXFits = L.geoJson(data,{
    //         onEachFeature: function (feature, layer) {
    //             layer.bindPopup('<p><b>' + feature.properties.id + '</b><br /><em>' + feature.properties.fid + '</em></p>');
    //             //layer.cartodb_id=feature.properties.cartodb_id;
    //         }
    //     }).addTo(mymap);
    // });
    var markers = L.markerClusterGroup(
      {showCoverageOnHover: false,
       disableClusteringAtZoom: 12
      }
    );

    $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
        existingXFits = L.geoJson(data,{
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<p><b>' + feature.properties.id + '</b><br /><em>' + feature.properties.fid + '</em></p>');
                //layer.cartodb_id=feature.properties.cartodb_id;
            }
        })
        markers.addLayer(existingXFits);
        mymap.addLayer(markers);
        mymap.fitBounds(markers.getBounds());
    });


};

// mymap.on('zoomend ', function(e) {
//      if ( mymap.getZoom() > 7 ){ mymap.removeLayer( existingXFits )}
//      else if ( mymap.getZoom() <= 7 ){ mymap.addLayer( existingXFits )}
// });

$( document ).ready(function() {
  showAll();
});
