var polyline_default_config = require('./polygon_defaults').polygon_default_values;

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

exports.labeledPolygon = function(polyline_path, map, params){
    
    if(polyline_path.title){
        var poly = new google.maps.Polygon({
            path: polyline_path.coords,
            strokeColor: params.color ? params.color : polyline_default_config.color,
            strokeOpacity: params.opacity ? params.opacity : polyline_default_config.opacity,
            strokeWeight: params.weight ? params.weight : polyline_default_config.weight
        });
        poly.setMap(map);

        var infowindow = new google.maps.InfoWindow({
            content: '<p style="margin:0">' + polyline_path.title + '</p>',
            position: polyline_path.coords[0],
        });


        infowindow.open(map);
    }else{
        var poly = new google.maps.Polygon({
            path: polyline_path,
            strokeColor: params.color ? params.color : polyline_default_config.color,
            strokeOpacity: params.opacity ? params.opacity : polyline_default_config.opacity,
            strokeWeight: params.weight ? params.weight : polyline_default_config.weight
        });
        poly.setMap(map);
    }
       
}