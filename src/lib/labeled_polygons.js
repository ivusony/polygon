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
exports.labeledPolygons = function(polyline_paths, obj, params, polygons){
    var map = obj.map;
    var id = 1;
    polyline_paths.forEach(polyline_path => {
        try {
            var poly = new google.maps.Polygon({
                path            : polyline_path.coords,
                strokeColor     : params.strokeColor    ? params.strokeColor    : polyline_default_config.strokeColor,
                strokeOpacity   : params.strokeOpacity  ? params.strokeOpacity  : polyline_default_config.strokeOpacity,
                strokeWeight    : params.strokeWeight   ? params.strokeWeight   : polyline_default_config.strokeWeight,
                fillColor       : polyline_path.fillColor ,
                fillOpacity     : .5,
                polygon_id      : id++
            });
            poly.setMap(map);

            poly.addListener('click', function(e){
                console.log(this);
            })

            polygons.push(poly);

            var infowindow = new google.maps.InfoWindow({
                content: '<p style="margin:0">' + polyline_path.label + '</p>',
                position: polyline_path.coords[0],
                label_id : poly.polygon_id
            });

            infowindow.open(map);

            obj.infoWindows.push(infowindow);

        } catch (err){
            throw new TypeError(['Expected labeled polygons form is [ { label : label, coords : [] } ] in : labeled_polygons.js'])
        }
    });
}