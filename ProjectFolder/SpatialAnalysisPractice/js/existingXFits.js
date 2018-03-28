import {setUp, setUpVars} from "./setup.js";
import {icons} from "./markerStyles.js";


let dataOfObject;
let existingXFits = null;
export let XFitMakersID;
let cartoDBUserName = "matsteele";
let sqlQuery = "SELECT * FROM xfitdata";

export function showCurXfits(){
    console.log(setUpVars.mymap._layers[29])



    if(setUpVars.mymap._layers[29]){
      console.log(setUpVars.mymap._layers[29].layer)
      var  layer = setUpVars.mymap._layers[29];
      setUpVars.mymap.removeLayer(layer);
    }
    else {
      var allMarkers;

      var markers = L.markerClusterGroup(
        {showCoverageOnHover: true,
         disableClusteringAtZoom: 12,
         spiderfyOnMaxZoom:false,
         iconCreateFunction: function (cluster) {
           allMarkers = cluster.getAllChildMarkers();
           markerNum = allMarkers.length;
           //console.log(markerNumMax);

           if (markerNum > markerNumMax  ) {
             markerNumMax = allMarkers.length;
           }
           //console.log(markerNumMax);
           for (let i = 0; i < allMarkers.length; i++) {
             allMarkers[i].setIcon(icons.existingXFits);
           }

           function scale (input){
             var Perc = (input / markerNumMax)/2 + .5;
             var output = Perc * 50;
             return output;
           }
           var sizeVar = scale(cluster.getChildCount());
           // debugger
           // console.log(scale(100))
           return L.divIcon({
                  iconSize:   [sizeVar, sizeVar],
                  iconAnchor: [sizeVar/2, sizeVar],
                  className: "clusterIcon",
                  html:
                '<img class="imageCluster" src= "images/XFiticonProposedPink-01-01.png" height="'+sizeVar+ '" alt="grouping"/> <div class="clusterCount">' + cluster.getChildCount() + '</div>'
            });
         }

        }
      );


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
              pointToLayer: function(feature, latlng){
                 return L.marker(latlng, {icon: icons.existingXFits});
              } ,
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
          for (var i = 0; i < markers.length; i++) {
            markers[i].setIcon(icons.existingXFits);
          }

          XFitMakersID = markers._leaflet_id;
          console.log(XFitMakersID)

          // markers.zoomToShowLayer();
        //  markers.setIcon(XFitIcon);
          setUpVars.mymap.addLayer(markers);
          // mymap.fitBounds(markers.getBounds());
      });



    }


};

// mymap.on('zoomend ', function(e) {
//      if ( mymap.getZoom() > 7 ){ mymap.removeLayer( existingXFits )}
//      else if ( mymap.getZoom() <= 7 ){ mymap.addLayer( existingXFits )}
// });
