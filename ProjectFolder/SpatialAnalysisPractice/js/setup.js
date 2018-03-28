
  export let setUpVars = {
    latlng: [40.777686, -73.954209], //might be worth switching the long lat based on their location 
    mymap: L.map('mapid', {drawControl: true})
  }

 export function setUp() {

  setUpVars.mymap.setView(setUpVars.latlng, 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.dark',
      accessToken: 'pk.eyJ1IjoibWF0c3RlZWxlIiwiYSI6ImNqOTV5MWxkeTRxM3kzMm80aW9lcm1xeWkifQ.vF_5vgkntZ5b9E-8iSBfAg'
  }).addTo(setUpVars.mymap);

}
