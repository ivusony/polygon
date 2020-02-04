module.exports = function(polyline_path, map){
    var poly = new google.maps.Polyline({
        path: polyline_path,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 1
    });
    poly.setMap(map);
}