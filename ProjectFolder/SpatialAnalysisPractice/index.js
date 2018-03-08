
var mymap = L.map('mapid').setView([40.777686, -73.954209], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoibWF0c3RlZWxlIiwiYSI6ImNqOTV5MWxkeTRxM3kzMm80aW9lcm1xeWkifQ.vF_5vgkntZ5b9E-8iSBfAg'
}).addTo(mymap);

var dataOfObject;
var existingXFits = null;

var cartoDBUserName = "matsteele";
var sqlQuery = "SELECT * FROM xfitdata";


function showAll(){
    if(mymap.hasLayer(existingXFits)){
        mymap.removeLayer(existingXFits);
    };
    //Get CARTO selection as GeoJSON and Add to Map
    // $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
    //     existingXFits = L.geoJson(data,{
    //         onEachFeature: function (feature, layer) {
    //             layer.bindPopup('<p><b>' + feature.properties.id + '</b><br /><em>' + feature.properties.fid + '</em></p>');
    //             //layer.cartodb_id=feature.properties.cartodb_id;
    //         }
    //     }).addTo(mymap);
    // });

    var XFitIcon = L.icon({
      iconUrl: 'Images/BellIcon-01.png',
      // shadowUrl: 'Images/BellIconShadow-02.png',
      iconSize:     [50, 50], // size of the icon
      shadowSize:   [50, 50], // size of the shadow
      iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var allMarkers;



    var markers = L.markerClusterGroup(
      {showCoverageOnHover: false,
       disableClusteringAtZoom: 12,
       spiderfyOnMaxZoom:false,
       iconCreateFunction: function (cluster) {
         allMarkers = cluster.getAllChildMarkers();
         for (let i = 0; i < allMarkers.length; i++) {
           allMarkers[i].setIcon(XFitIcon);
         }
         return L.divIcon({ html:
              '<img class="imageCluster" src= "images/XFiticonProposedPink-01-01.png" alt="grouping"> <div class="clusterCount" >' + cluster.getChildCount() + '</div>'
          });
       }

      }
    );



    // onEachFeature: function (feature, layer) {
    //   layer.addTo(clusters);
    // }


    $.getJSON("https://"+cartoDBUserName+".carto.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
        console.log(data.features[1].properties.longitude);
        // for (var i = 0; i < data.features.length; i++) {
        //   if (data.features[i].properties.longitude > -200 || features.properties.longitude > 300){
        //        data.features.splice(i, 1);
        //   }
        // }

        // console.log(data.features[1].properties.longitude);
        // data.remove(data.features[1]

        existingXFits = L.geoJson(data,{
            onEachFeature: function (feature, layer) {
                 // debugger
                 if(feature.properties.longitude < -200 || feature.properties.longitude > 300) {
                   console.log(feature.properties);
                 }

                   dataOfObject = feature;
                   layer.bindPopup('<p><b>' + feature.properties.id + '</b><br /><em>' + feature.properties.name + '</em></p>');
                //layer.cartodb_id=feature.properties.cartodb_id;
                //layer.addTo(markers);
            }
        })



        //mymap.addLayer(existingXFits);
        markers.addLayer(existingXFits);

      //  markers.setIcon(XFitIcon);
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
