/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar mymap = L.map('mapid').setView([40.777686, -73.954209], 13);\n\nL.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {\n  attribution: 'Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>',\n  maxZoom: 18,\n  id: 'mapbox.dark',\n  accessToken: 'pk.eyJ1IjoibWF0c3RlZWxlIiwiYSI6ImNqOTV5MWxkeTRxM3kzMm80aW9lcm1xeWkifQ.vF_5vgkntZ5b9E-8iSBfAg'\n}).addTo(mymap);\n\nvar dataOfObject;\nvar existingXFits = null;\n\nvar cartoDBUserName = \"matsteele\";\nvar sqlQuery = \"SELECT * FROM xfitdata\";\n\nfunction showAll() {\n  if (mymap.hasLayer(existingXFits)) {\n    mymap.removeLayer(existingXFits);\n  };\n  //Get CARTO selection as GeoJSON and Add to Map\n  // $.getJSON(\"https://\"+cartoDBUserName+\".carto.com/api/v2/sql?format=GeoJSON&q=\"+sqlQuery, function(data) {\n  //     existingXFits = L.geoJson(data,{\n  //         onEachFeature: function (feature, layer) {\n  //             layer.bindPopup('<p><b>' + feature.properties.id + '</b><br /><em>' + feature.properties.fid + '</em></p>');\n  //             //layer.cartodb_id=feature.properties.cartodb_id;\n  //         }\n  //     }).addTo(mymap);\n  // });\n\n  var XFitIcon = L.icon({\n    iconUrl: 'Images/BellIcon-01.png',\n    // shadowUrl: 'Images/BellIconShadow-02.png',\n    iconSize: [50, 50], // size of the icon\n    shadowSize: [50, 50], // size of the shadow\n    iconAnchor: [25, 50], // point of the icon which will correspond to marker's location\n    shadowAnchor: [4, 62], // the same for the shadow\n    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor\n  });\n\n  var allMarkers;\n\n  var markers = L.markerClusterGroup({ showCoverageOnHover: false,\n    disableClusteringAtZoom: 12,\n    spiderfyOnMaxZoom: false,\n    iconCreateFunction: function (cluster) {\n      allMarkers = cluster.getAllChildMarkers();\n      for (let i = 0; i < allMarkers.length; i++) {\n        allMarkers[i].setIcon(XFitIcon);\n      }\n      return L.divIcon({ html: '<img class=\"imageCluster\" src= \"images/XFiticonProposedPink-01-01.png\" alt=\"grouping\"> <div class=\"clusterCount\" >' + cluster.getChildCount() + '</div>'\n      });\n    }\n\n  });\n\n  // onEachFeature: function (feature, layer) {\n  //   layer.addTo(clusters);\n  // }\n\n\n  $.getJSON(\"https://\" + cartoDBUserName + \".carto.com/api/v2/sql?format=GeoJSON&q=\" + sqlQuery, function (data) {\n    console.log(data.features[1].properties.longitude);\n    // for (var i = 0; i < data.features.length; i++) {\n    //   if (data.features[i].properties.longitude > -200 || features.properties.longitude > 300){\n    //        data.features.splice(i, 1);\n    //   }\n    // }\n\n    // console.log(data.features[1].properties.longitude);\n    // data.remove(data.features[1]\n\n    existingXFits = L.geoJson(data, {\n      onEachFeature: function (feature, layer) {\n        // debugger\n        if (feature.properties.longitude < -200 || feature.properties.longitude > 300) {\n          console.log(feature.properties);\n        }\n\n        dataOfObject = feature;\n        layer.bindPopup('<p><b>' + feature.properties.id + '</b><br /><em>' + feature.properties.name + '</em></p>');\n        //layer.cartodb_id=feature.properties.cartodb_id;\n        //layer.addTo(markers);\n      }\n    });\n\n    //mymap.addLayer(existingXFits);\n    markers.addLayer(existingXFits);\n\n    //  markers.setIcon(XFitIcon);\n    mymap.addLayer(markers);\n    mymap.fitBounds(markers.getBounds());\n  });\n};\n\n// mymap.on('zoomend ', function(e) {\n//      if ( mymap.getZoom() > 7 ){ mymap.removeLayer( existingXFits )}\n//      else if ( mymap.getZoom() <= 7 ){ mymap.addLayer( existingXFits )}\n// });\n\n$(document).ready(function () {\n  showAll();\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });