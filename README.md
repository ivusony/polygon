# polygon

//initialize main function
function initMap(){
    //new map
    var map = new google.maps.Map(
          document.getElementById('map'),
          {
              zoom: 10,
              center: { lat: 45.53, lng: 20.01 }
          }
     );
     //construct object
      var DRAW = new GM_POLY_DRAW(map);

      // DRAWING TEST POLYGONs
      var polygon_paths = 
      [
        [
          {},
          {},
          {}
          ...
        ],
        [],
        []
      ]

      DRAW.polygons(polygon_paths);

    var Init_Drawing_button = document.querySelector('.new_poly');

    Init_Drawing_button.addEventListener('click', function () {

        DRAW.add_new_polygon({
            map: map
        }).then(function (poly) {
            // do whatever you want with new poly path
            DRAW.one_polygon(poly);

            // send to DB
        })

        this.innerText = "Save new polygon"
    })
}
     
