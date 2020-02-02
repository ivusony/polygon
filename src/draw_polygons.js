function draw_polygons(array_of_polygons_paths, map){
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