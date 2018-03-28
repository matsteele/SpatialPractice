

import {setUp, setUpVars} from "./setup.js";
import {icons} from "./markerStyles.js";
import {submitXfit} from "./submissions.js";
import {showCurXfits} from "./existingXFits.js";

//practice
let XFitID;
const testingPlus = input => input + 50;

$( document ).ready(function() {

  setUp();
  submitXfit();

  $('#showXfits').click(function() {
    console.log(XFitID);
    if (XFitID > -1){
      console.log(setUpVars.mymap._layers[XFitID]);
      setUpVars.mymap._layers[XFitID].removeLayer( );
    }
    else{
      XFitID = showCurXfits();
    }
  });


});
