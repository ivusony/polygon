function add_polygon_path(params){

    return new Promise(function(resolve, reject){
        if (typeof params != 'object' || params == undefined) return;

        var new_poly_path = [];
        var polylines = [];
        var markers = [];
        var marker_id = 0;

        var MAIN_MARKIN_EVENT = google.maps.event.addListener(params.map, 'click', function (event) {

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
                            scale: 3,
                            fillColor: 'red'
                        }
                    }
                );
            } else {
                var marker = new google.maps.Marker(
                    {
                        position: event.latLng,
                        map: params.map,
                        id: marker_id++,
                        icon: pinSymbol('green')
                    }
                );
            }

            marker.setClickable(true);
            marker.setDraggable(true);

            // push eac new array to markers array
            markers.push({
                marker: marker
            });

            if (markers.length >= 2) {
                draw_between_last_two_markers();
            }

            var marker_click = google.maps.event.addListener(marker, 'click', function () {
                // finish
                if (this.id == 0) {
                    markers.push({ marker: this });
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

                    // remove adding marker ability
                    google.maps.event.removeListener(MAIN_MARKIN_EVENT);
                    google.maps.event.removeListener(marker_click);

                    //should return full polygon path
                    markers.forEach(obj => {
                        new_poly_path.push({
                            lat: obj.marker.position.lat(),
                            lng: obj.marker.position.lng()
                        })

                        obj.marker.setMap(null);
                    })

                    polylines.forEach(polyline=>{
                        polyline.setMap(null);
                    })


                    resolve(new_poly_path);
                }
            });

            google.maps.event.addListener(marker, 'dragend', function (e) {

                // update polyline

                if (markers.length > 1) {
                    markers.pop(markers.length - 1);
                    markers.push({ marker: this });

                    polylines[polylines.length - 1].setMap(null);
                    polylines.pop(polylines.length - 1);
                    draw_between_last_two_markers();

                    //    console.log("Marker ID :" + this.id);
                    //    console.log("Marker new LAT:" + this.position.lat());
                    //    console.log("Marker new LNG:" + this.position.lng());
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