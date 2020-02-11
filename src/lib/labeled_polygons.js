var polyline_default_config = require('./polygon_defaults').polygon_default_values;

// polyline_paths:
// [
//     {
//         title : title,
//         coords : [
//             {

//             },
//             {

//             }
//         ]
//     },
//     {
//         title : title,
//         coords : [
//             {

//             },
//             {

//             }
//         ]
//     }
// ]
exports.labeledPolygons = function(polyline_paths, obj, params){
    var map = obj.map;
    polyline_paths.forEach(polyline_path => {
        var poly = new google.maps.Polygon({
            path            : polyline_path.coords,
            strokeColor     : params.strokeColor    ? params.strokeColor    : polyline_default_config.strokeColor,
            strokeOpacity   : params.strokeOpacity  ? params.strokeOpacity  : polyline_default_config.strokeOpacity,
            strokeWeight    : params.strokeWeight   ? params.strokeWeight   : polyline_default_config.strokeWeight,
            fillColor       : params.fillColor      ? params.fillColor      : polyline_default_config.fillColor,
            fillOpacity     : params.fillOpacity    ? params.fillOpacity    : polyline_default_config.fillOpacity
        });
        poly.setMap(map);

        var infowindow = new google.maps.InfoWindow({
            content: '<p style="margin:0">' +  polyline_path.label + '</p>',
            position: polyline_path.coords[0],
        });

        infowindow.open(map);

        obj.infoWindows.push(infowindow);
    });
}