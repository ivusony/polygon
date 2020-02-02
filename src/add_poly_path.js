function add_polygon_path(params){
    if (typeof params != 'object' || params == undefined)return;

    window.new_polygon = [];

    var new_poly_path = [];
    var markers = [];
    var marker_id = 0;

    google.maps.event.addListener(params.map, 'click', function (event) {
        var marker = new google.maps.Marker(
            {
                position: event.latLng,
                map     : params.map,
                id      : marker_id++
            }
        );
        marker.setClickable(true);
        marker.setDraggable(true);

        // push eac new array to markers array
        markers.push({
            marker  : marker
        });
       
        // push each new markers location into new polygon path array
        new_poly_path.push({
            lat: marker.position.lat(),
            lng: marker.position.lng()
        })

        // add click event listener to each marker
        google.maps.event.addListener(marker, 'click', function () {
            //check if first marker is clicked
            if(this.id == 0)
            {
                //push first marker location to last postition in new polygon path so it can be closed
                new_poly_path.push({
                    lat: this.position.lat(),
                    lng: this.position.lng()
                })

                // draw new polygon
                draw_polygons([new_poly_path], params.map);
                //empty new polygon path array
                new_poly_path = [];
                //empty markers array
                markers = [];
                //reset counter
                marker_id = 0;
            }
        });

        google.maps.event.addListener(marker, 'dragend', function(){
            console.log('Marker dragged');
        })
    });

}