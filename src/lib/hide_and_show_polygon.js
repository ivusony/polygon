exports.Hide_Show_Polygon = function (polygons_array, labels_array, map){
    return {
        hide: function (polygon_id){
            polygons_array.forEach(polygon => {
                if (polygon.polygon_id == polygon_id) {
                   polygon.setMap(null); 
                }
            });
        },
        show: function (polygon_id) {
            polygons_array.forEach(polygon => {
                if (polygon.polygon_id == polygon_id) {
                    polygon.setMap(map);
                }
            });
        }
    }
  
}