import {setUp, setUpVars} from "./setup.js";

require('leaflet-toolbar');
require('leaflet-draw');

export let newAddition = {};

export function submitXfit( ){




  //set up draw configuration
  const drawnItems = new L.FeatureGroup();
  //add to map
  setUpVars.mymap.addLayer(drawnItems);

  L.EditToolbar.Delete.include({

  });

  const drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
      remove: false,
      edit: false,
    },
    draw: {
      rectangle: false,
      polyline: false,
      polygon: false,
      circle: false,
      circlemarker: false,
      removeAllLayers: false
    }
  });
  //add controls
  setUpVars.mymap.addControl(drawControl);


  // Handling the creation of Leaflet.Draw layers
  // Note the use of drawnLayerID - this is the way you should approach remembering and removing layers
  let drawnLayerID;



  setUpVars.mymap.on('draw:created', function (e) {
    //make visible an editing window from a pop up window
    var type = e.layerType;
    var layer = e.layer;

    //set up pop up
    var popupLayer = L.popup();




    //console.log('draw created:', e);
    if (type === 'marker') {
      //fill in dataobject
      newAddition.lat = layer._latlng.lat;
      newAddition.lng = layer._latlng.lng;
      setUpVars.mymap.addLayer(layer);


      var content = '<span><b>Name</b></span><br/><input id="shapeName" type="text"/><br/><br/><span><b>Cost</b></span><br/><input id="shapeCost" type="text"/><br/><br/><span><b>Description<b/></span><br/><textarea id="shapeDesc" cols="25" rows="5"></textarea><br/><br/><input type="button" id="okBtn" value="Save""/>';
      popupLayer.setContent(content);
      popupLayer.setLatLng([newAddition.lat,newAddition.lng]);
      popupLayer.openOn(setUpVars.mymap);



      // create input data points for the marker
      $('#name').prop('disabled', false);
      $('#cost').prop('disabled', false);
      $('#name').val("give me a name");
      $('#cost').val("what's the cost?");
      $('#submitB').prop('disabled', false);
    }

    $('#okBtn').click(function() {

    newAddition.name = $('#shapeName').val();
    newAddition.cost = $('#shapeCost').val();
    newAddition.description = $('#shapeDesc').val();

    reviewComplete(
        newAddition.lat,
        newAddition.lng,
        newAddition.name,
        newAddition.cost,
        newAddition.description
      );
      setUpVars.mymap.closePopup();
    });





    //if (drawnLayerID) { map.removeLayer(setUpVars.mymap._layers[drawnLayerID]); }


    drawnLayerID = layer._leaflet_id;
    //console.log(drawnLayerID);
  });


  // function saveNewSubmission() {
        // newAddition.name = $('#shapeName').val();
        // newAddition.cost = $('#shapeCost').val();
        // newAddition.description = $('#shapeDesc').val();
  //
  //      if (idIW) {
  //         map.closePopup();
  //      }
  // }

  // $('#okBtn').click(funcion(){
  //   saveNewSubmission();
  // });



  // Automatically fill form from geojson
  let fillForm = function(name, cost) {
    INSERT = false;
    $('#name').val(name);
    $('#cost').val(cost);
  };





  //making submissions


  const APIKEY = "57e1bdd7a6f3a5b437fade24586a6d27d1904012";

    var reviewComplete = function(lat, lng, name, cost, description) {
      var sql = "INSERT INTO xFitsSubmissions (the_geom, description, name, cost)" +
            "VALUES (ST_SetSRID(" + lng + ', ' + lat +
            "), 4326),'" + description + "','" + name + "', '"+cost+"')&api_key=" + APIKEY;
            console.log('https://matsteele.cartodb.com/api/v2/sql?q='+sql);
      $.ajax('https://matsteele.carto.com/api/v2/sql?q=' + sql).done(function() {
          console.log("worked!");
      });
    };



// https://matsteele.carto.com/api/v2/sql?q=INSERT INTO xFitsSubmissions (the_geom, name, cost, description)VALUES (ST_SetSRID(-73.97781372070312, 40.76715062219317), 4326),'test','tst', 'test')&api_key=57e1bdd7a6f3a5b437fade24586a6d27d1904012
// https://{username}.carto.com/api/v2/sql?q=INSERT INTO test_table (column_name, column_name_2, the_geom) VALUES ('this is a string', 11, ST_SetSRID(ST_Point(-110, 43),4326))&api_key={api_key}


}
