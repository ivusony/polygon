var polyline_default_config = require('./polyline_default').polyline_default;

// labeled_polyline_path:
//     {
//         title : title,
//         coords : [
//             {

//             },
//             {

//             }
//         ]
//     }

exports.labeledPolyline = function(polyline_path, map, params){
    
        var poly = new google.maps.Polyline({
            path: polyline_path.coords,
            strokeColor: params.color ? params.color : polyline_default_config.color,
            strokeOpacity: params.opacity ? params.opacity : polyline_default_config.opacity,
            strokeWeight: params.weight ? params.weight : polyline_default_config.weight
        });
        poly.setMap(map);

        var infowindow = new google.maps.InfoWindow({
            content: '<p style="margin:0">' +  polyline_path.label + '</p>',
            position: polyline_path.coords[0],
        });
        
        infowindow.open(map);
}