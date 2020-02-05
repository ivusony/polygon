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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_labeled_polyline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/labeled_polyline */ \"./src/lib/labeled_polyline.js\");\n/* harmony import */ var _lib_labeled_polyline__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_labeled_polyline__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_labeled_polylines__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/labeled_polylines */ \"./src/lib/labeled_polylines.js\");\n/* harmony import */ var _lib_labeled_polylines__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_labeled_polylines__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nvar polyline_default_config = __webpack_require__(/*! ./lib/polyline_default */ \"./src/lib/polyline_default.js\").polyline_default;\r\n\r\n\r\n\r\nclass GM_POLY_DRAW{\r\n    constructor(map) {\r\n        this.map = map;\r\n        this.infoWindows = [];\r\n    }\r\n    // DRAWING POLYLINES BASED ON LAT LNG COORDS\r\n    // draw single polyline. Used in polyline complete event listener. \r\n    // accepts array of latLng objects\r\n    polyline(poly_path, params){\r\n        if (!params) {\r\n            var params = polyline_default_config\r\n        }\r\n        var poly = new google.maps.Polyline({\r\n            path            : poly_path,\r\n            strokeColor     : params.color ,\r\n            strokeOpacity   : params.opacity ,\r\n            strokeWeight    : params.weight\r\n        });\r\n        poly.setMap(this.map);\r\n    }\r\n\r\n    labeled_polyline(poly_path, params){\r\n        if (!params) { var params = {} }\r\n        Object(_lib_labeled_polyline__WEBPACK_IMPORTED_MODULE_0__[\"labeledPolyline\"])(poly_path, this.map, params);\r\n    }\r\n\r\n    polylines(array_of_polygons_paths, params) {\r\n        // if(!params){\r\n        //     var params = polyline_default_config\r\n        // }\r\n        array_of_polygons_paths.forEach(polygon_path => {\r\n            var poly = new google.maps.Polyline({\r\n                path            :   polygon_path,\r\n                strokeColor: params.color ? params.color : polyline_default_config.color,\r\n                strokeOpacity: params.opacity ? params.opacity : polyline_default_config.opacity ,\r\n                strokeWeight: params.weight ? params.weight : polyline_default_config.weight\r\n            });\r\n            poly.setMap(this.map);\r\n        });\r\n    }\r\n\r\n    labeled_polylines(array_of_polyline_paths, params){\r\n        if(!params){var params = {}}\r\n        Object(_lib_labeled_polylines__WEBPACK_IMPORTED_MODULE_1__[\"labeledPolylines\"])(array_of_polyline_paths, this, params);\r\n    }\r\n\r\n    new_polyline_path(params){\r\n        return new Promise(function (resolve, reject) {\r\n            if (typeof params != 'object' || params == undefined) return;\r\n\r\n            var new_poly_path = [];\r\n            var polylines = [];\r\n            var markers = [];\r\n            var marker_id = 0;\r\n\r\n            var MAIN_MARKIN_EVENT = google.maps.event.addListener(params.map, 'click', function (event) {\r\n\r\n                // if not the first marker\r\n                if (markers.length > 0) {\r\n                    // if markers in array, first set the last marker undraggable\r\n                    markers[markers.length - 1].marker.setDraggable(false);\r\n\r\n                    var marker = new google.maps.Marker(\r\n                        {\r\n                            position: event.latLng,\r\n                            map: params.map,\r\n                            id: marker_id++,\r\n                            icon: {\r\n                                path: google.maps.SymbolPath.CIRCLE,\r\n                                scale: 2,\r\n                                fillColor: '#FFFF00',\r\n                                strokeColor: '#FFFF00',\r\n                                fillOpacity: 1\r\n                            }\r\n                        }\r\n                    );\r\n                } else {\r\n                    // if it is the initial marker\r\n                    var marker = new google.maps.Marker(\r\n                        {\r\n                            position: event.latLng,\r\n                            map: params.map,\r\n                            id: marker_id++,\r\n                            icon: pinSymbol('yellow'),\r\n                            label : params.label || ''\r\n                        }\r\n                    );\r\n                }\r\n\r\n                marker.setClickable(true);\r\n                marker.setDraggable(true);\r\n\r\n                // push each new array to markers array\r\n                markers.push({\r\n                    marker: marker\r\n                });\r\n\r\n                // connect new marke with last one\r\n                if (markers.length >= 2) {\r\n                    draw_between_last_two_markers();\r\n                }\r\n                // add event listener to each marker\r\n                var marker_click = google.maps.event.addListener(marker, 'click', function () {\r\n                   // if first marker is clicked\r\n                    if (this.id == 0) {\r\n                        // add first marker as last in array\r\n                        markers.push({ marker: this });\r\n                      \r\n                        // remove adding marker ability - remove click event listeners\r\n                        google.maps.event.removeListener(MAIN_MARKIN_EVENT);\r\n                        google.maps.event.removeListener(marker_click);\r\n\r\n                        //posh every marker position in new polyline path array\r\n                        markers.forEach(obj => {\r\n                            new_poly_path.push({\r\n                                lat: obj.marker.position.lat(),\r\n                                lng: obj.marker.position.lng()\r\n                            })\r\n\r\n                            // remove all markers except the first (yellow) one if set in options object\r\n                            if (params.markersVisible)\r\n                            {\r\n                                if (obj.marker.id > 0) {\r\n                                    obj.marker.setMap(null);\r\n                                }\r\n                            }\r\n                        })\r\n\r\n                        // remove all temp polylines. Basicaly deletes the newly created closed polyline\r\n                        polylines.forEach(polyline => {\r\n                            polyline.setMap(null);\r\n                        })\r\n\r\n                        // resolve new polyline path. Use it in Promise .then method\r\n                        resolve(new_poly_path);\r\n                    }\r\n                });\r\n\r\n                // adding dragging functionality to \r\n                google.maps.event.addListener(marker, 'dragend', function (e) {\r\n\r\n                    // update polyline\r\n\r\n                    if (markers.length > 1) {\r\n                        markers.pop(markers.length - 1);\r\n                        markers.push({ marker: this });\r\n\r\n                        polylines[polylines.length - 1].setMap(null);\r\n                        polylines.pop(polylines.length - 1);\r\n                        draw_between_last_two_markers();\r\n                    }\r\n\r\n\r\n                })\r\n\r\n\r\n                function draw_between_last_two_markers() {\r\n                    var poly = new google.maps.Polyline({\r\n                        path: [\r\n                            { lat: markers[markers.length - 1].marker.position.lat(), lng: markers[markers.length - 1].marker.position.lng() },\r\n                            { lat: markers[markers.length - 2].marker.position.lat(), lng: markers[markers.length - 2].marker.position.lng() }\r\n                        ],\r\n                        strokeColor: '#FF0000',\r\n                        strokeOpacity: 0.8,\r\n                        strokeWeight: 2,\r\n                        fillColor: '#FF0000',\r\n                        fillOpacity: 1\r\n                    });\r\n                    poly.setMap(params.map);\r\n\r\n                    polylines.push(poly);\r\n                }\r\n\r\n                function pinSymbol(color) {\r\n                    return {\r\n                        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',\r\n                        fillColor: color,\r\n                        fillOpacity: 1,\r\n                        strokeColor: '#000',\r\n                        strokeWeight: 2,\r\n                        scale: 1\r\n                    };\r\n                }\r\n\r\n            })\r\n        })\r\n    }\r\n\r\n    remove_labels(){\r\n        if(this.infoWindows.length > 0)\r\n        {\r\n            this.infoWindows.forEach(iw=>{\r\n                iw.close();\r\n            })\r\n            return true\r\n        }\r\n        return false\r\n    }\r\n\r\n    show_labels(){\r\n        if (this.infoWindows.length > 0) {\r\n            this.infoWindows.forEach(iw => {\r\n                iw.open(this.map);\r\n            })\r\n            return true\r\n        }\r\n        return false\r\n    }\r\n   \r\n\r\n}\r\n\r\nwindow.GM_POLY_DRAW = GM_POLY_DRAW;\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ }),

/***/ "./src/lib/labeled_polyline.js":
/*!*************************************!*\
  !*** ./src/lib/labeled_polyline.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var polyline_default_config = __webpack_require__(/*! ./polyline_default */ \"./src/lib/polyline_default.js\").polyline_default;\r\n\r\n// labeled_polyline_path:\r\n//     {\r\n//         title : title,\r\n//         coords : [\r\n//             {\r\n\r\n//             },\r\n//             {\r\n\r\n//             }\r\n//         ]\r\n//     }\r\n\r\nexports.labeledPolyline = function(polyline_path, map, params){\r\n    \r\n        var poly = new google.maps.Polyline({\r\n            path: polyline_path.coords,\r\n            strokeColor: params.color ? params.color : polyline_default_config.color,\r\n            strokeOpacity: params.opacity ? params.opacity : polyline_default_config.opacity,\r\n            strokeWeight: params.weight ? params.weight : polyline_default_config.weight\r\n        });\r\n        poly.setMap(map);\r\n\r\n        var infowindow = new google.maps.InfoWindow({\r\n            content: '<p style=\"margin:0\">' +  polyline_path.label + '</p>',\r\n            position: polyline_path.coords[0],\r\n        });\r\n        \r\n        infowindow.open(map);\r\n}\n\n//# sourceURL=webpack:///./src/lib/labeled_polyline.js?");

/***/ }),

/***/ "./src/lib/labeled_polylines.js":
/*!**************************************!*\
  !*** ./src/lib/labeled_polylines.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var polyline_default_config = __webpack_require__(/*! ./polyline_default */ \"./src/lib/polyline_default.js\").polyline_default;\r\n\r\n// polyline_paths:\r\n// [\r\n//     {\r\n//         title : title,\r\n//         coords : [\r\n//             {\r\n\r\n//             },\r\n//             {\r\n\r\n//             }\r\n//         ]\r\n//     },\r\n//     {\r\n//         title : title,\r\n//         coords : [\r\n//             {\r\n\r\n//             },\r\n//             {\r\n\r\n//             }\r\n//         ]\r\n//     }\r\n// ]\r\nexports.labeledPolylines = function(polyline_paths, obj, params){\r\n    var map = obj.map;\r\n    polyline_paths.forEach(polyline_path => {\r\n        var poly = new google.maps.Polyline({\r\n            path: polyline_path.coords,\r\n            strokeColor: params.color ? params.color : polyline_default_config.color,\r\n            strokeOpacity: params.opacity ? params.opacity : polyline_default_config.opacity,\r\n            strokeWeight: params.weight ? params.weight : polyline_default_config.weight\r\n        });\r\n        poly.setMap(map);\r\n\r\n        var infowindow = new google.maps.InfoWindow({\r\n            content: '<p style=\"margin:0\">' +  polyline_path.label + '</p>',\r\n            position: polyline_path.coords[0],\r\n        });\r\n\r\n        infowindow.open(map);\r\n\r\n        obj.infoWindows.push(infowindow);\r\n    });\r\n}\n\n//# sourceURL=webpack:///./src/lib/labeled_polylines.js?");

/***/ }),

/***/ "./src/lib/polyline_default.js":
/*!*************************************!*\
  !*** ./src/lib/polyline_default.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nexports.__esModule = true;\r\nexports.polyline_default = {\r\n    color: \"red\",\r\n    weight: 2,\r\n    opacity: 1\r\n};\r\n\n\n//# sourceURL=webpack:///./src/lib/polyline_default.js?");

/***/ })

/******/ });