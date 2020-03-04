import { labeledPolygon } from './lib/labeled_polygon';
import { labeledPolygons } from './lib/labeled_polygons';
import { Hide_Show_Polygon } from './lib/hide_and_show_polygon';

var polyline_default_config = require('./lib/polygon_defaults').polygon_default_values;



class GM_POLY_DRAW{
    constructor(map) {
        this.map = map;
        this.infoWindows = [];
        this.polygons_created = [];
    }
    // DRAWING POLYLINES BASED ON LAT LNG COORDS
    // draw single polyline. Used in polyline complete event listener. 
    // accepts array of latLng objects
    polygon(poly_path, params){
        // if (!params) {
        //     var params = polyline_default_config
        // }
        var poly = new google.maps.Polygon({
            path            : poly_path,
            strokeColor     : params.strokeColor    ? params.strokeColor    : polyline_default_config.strokeColor,
            strokeOpacity   : params.strokeOpacity  ? params.strokeOpacity  : polyline_default_config.strokeOpacity,
            strokeWeight    : params.strokeWeight   ? params.strokeWeight   : polyline_default_config.strokeWeight,
            fillColor       : params.fillColor      ? params.fillColor      : polyline_default_config.fillColor,
            fillOpacity     : params.fillOpacity    ? params.fillOpacity    : polyline_default_config.fillOpacity
        });
        poly.setMap(this.map);
    }

    labeled_polygon(poly_path, params){
        //poly_path array of objects
        if (!params) { var params = {} }
        labeledPolygon(poly_path, this.map, params);
    }

    polygons(array_of_polygons_paths, params) {
        if(!params){
            var params = {};
        }
        array_of_polygons_paths.forEach(polygon_path => {
            var poly = new google.maps.Polygon({
                path            :   polygon_path,
                strokeColor: params.strokeColor ? params.strokeColor : polyline_default_config.strokeColor,
                strokeOpacity: params.strokeOpacity ? params.strokeOpacity : polyline_default_config.strokeOpacity,
                strokeWeight: params.strokeWeight ? params.strokeWeight : polyline_default_config.strokeWeight,
                fillColor: params.fillColor ? params.fillColor : polyline_default_config.fillColor,
                fillOpacity: params.fillOpacity ? params.fillOpacity : polyline_default_config.fillOpacity
            });
            poly.setMap(this.map);
        });
    }

    labeled_polygons(array_of_polyline_paths, params){
        if(!params){var params = {}}
        labeledPolygons(array_of_polyline_paths, this, params, this.polygons_created);
    }

    new_polygon(params){
        var that = this;
        return new Promise(function (resolve, reject) {
            if (typeof params != 'object' || params == undefined) return;

            var new_poly_path = [];
            var polylines = [];
            var markers = [];
            var marker_id = 0;

            var MAIN_MARKIN_EVENT = google.maps.event.addListener(params.map, 'click', function (event) {

                // if not the first marker
                if (markers.length > 0) {
                    // if markers in array, first set the last marker undraggable
                    markers[markers.length - 1].marker.setDraggable(false);

                    var marker = new google.maps.Marker(
                        {
                            position: event.latLng,
                            map: params.map,
                            id: marker_id++,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 2,
                                fillColor: '#FFFF00',
                                strokeColor: '#FFFF00',
                                fillOpacity: 1
                            }
                        }
                    );
                } else {
                    // if it is the initial marker
                    var marker = new google.maps.Marker(
                        {
                            position: event.latLng,
                            map: params.map,
                            id: marker_id++,
                            icon: pinSymbol('yellow'),
                            label : params.label || ''
                        }
                    );
                }

                marker.setClickable(true);
                marker.setDraggable(true);

                // push each new array to markers array
                markers.push({
                    marker: marker
                });

                // connect new marke with last one
                if (markers.length >= 2) {
                    draw_between_last_two_markers();
                }
                // add event listener to each marker
                var marker_click = google.maps.event.addListener(marker, 'click', function () {
                   // if first marker is clicked
                    if (this.id == 0) {
                        //return if the initial marker is the only one
                        if (markers.length < 2) return;
                        // add first marker as last in array
                        markers.push({ marker: this });
                      
                        // remove adding marker ability - remove click event listeners
                        google.maps.event.removeListener(MAIN_MARKIN_EVENT);
                        google.maps.event.removeListener(marker_click);

                        //posh every marker position in new polyline path array
                        markers.forEach(obj => {
                            new_poly_path.push({
                                lat: obj.marker.position.lat(),
                                lng: obj.marker.position.lng()
                            })

                            // remove all markers except the first (yellow) one if set in options object
                            if (params.markersVisible)
                            {
                                if (obj.marker.id > 0) {
                                    obj.marker.setMap(null);
                                }
                            }
                        })

                        // remove all temp polylines. Basicaly deletes the newly created closed polyline
                        polylines.forEach(polyline => {
                            polyline.setMap(null);
                        })

                        // resolve new polyline path. Use it in Promise .then method

                        if(params.title){
                            resolve({
                                title : params.title,
                                coords : new_poly_path
                            })
                        }else{
                            if (params.showOnEnd)
                            {
                                that.polygon(new_poly_path, {fillColor : params.fillColor, fillOpacity : .5})
                            }
                            resolve(new_poly_path);
                        }
                    }
                });

                // adding dragging functionality to 
                google.maps.event.addListener(marker, 'dragend', function (e) {

                    // update polyline

                    if (markers.length > 1) {
                        markers.pop(markers.length - 1);
                        markers.push({ marker: this });

                        polylines[polylines.length - 1].setMap(null);
                        polylines.pop(polylines.length - 1);
                        draw_between_last_two_markers();
                    }


                })


                function draw_between_last_two_markers() {
                    var poly = new google.maps.Polyline({
                        path: [
                            { lat: markers[markers.length - 1].marker.position.lat(), lng: markers[markers.length - 1].marker.position.lng() },
                            { lat: markers[markers.length - 2].marker.position.lat(), lng: markers[markers.length - 2].marker.position.lng() }
                        ],
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 1
                    });
                    poly.setMap(params.map);

                    polylines.push(poly);
                }

                function pinSymbol(color) {
                    return {
                        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                        fillColor: color,
                        fillOpacity: 1,
                        strokeColor: '#000',
                        strokeWeight: 2,
                        scale: 1
                    };
                }

            })
        })
    }

    remove_labels(){
        if(this.infoWindows.length > 0)
        {
            this.infoWindows.forEach(iw=>{
                iw.close();
            })
            return true
        }
        return false
    }

    show_labels(){
        if (this.infoWindows.length > 0) {
            this.infoWindows.forEach(iw => {
                iw.open(this.map);
            })
            return true
        }
        return false
    }

}

window.GM_POLY_DRAW = GM_POLY_DRAW;