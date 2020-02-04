import * as gm_draw_one_polilyne from './lib/gm_draw_one_polyline';
import * as polyline_config from './lib/polyline_config';

class GM_POLY_DRAW{
    constructor(map) {
        this.map = map;
    }
    // DRAWING POLYLINES BASED ON LAT LNG COORDS
    // draw single polyline. Used in polyline complete event listener. 
    // accepts array of latLng objects
    one_polygon(poly_path, params){
        if (!params) {
            var params = polyline_config
        }
        var poly = new google.maps.Polyline({
            path: poly_path,
            strokeColor: params.color || polyline_config.color,
            strokeOpacity: params.opacity || polyline_config.opacity,
            strokeWeight: params.weight || polyline_config.weight
        });
        poly.setMap(this.map);
        // gm_draw_one_polilyne(poly_path, this.map);
    }
    polygons(array_of_polygons_paths, params) {
        if(!params){
            var params = polyline_config
        }
        array_of_polygons_paths.forEach(polygon_path => {
            var poly = new google.maps.Polyline({
                path            :   polygon_path,
                strokeColor     :   params.color      ||  polyline_config.color,
                strokeOpacity   :   params.opacity    ||  polyline_config.opacity,
                strokeWeight    :   params.weight     ||  polyline_config.weight
            });
            poly.setMap(this.map);
        });
    }


    add_new_polygon(params){
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
                        resolve(new_poly_path);
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

   

}

window.GM_POLY_DRAW = GM_POLY_DRAW;