

function DRAW(map){
    return {
        //exprect one array with path objects
        one_polygon : function(poly_path){
            var poly = new google.maps.Polyline({
                path: poly_path,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 1
            });


             return poly.setMap(map);

        },
        //expects array of arrays of path objects
        polygons    : function(array_of_polygons_paths) {
            array_of_polygons_paths.forEach(polygon_path => {

                var poly = new google.maps.Polyline({
                    path: polygon_path,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 1
                });


                poly.setMap(map);

            });
        }
    }
}