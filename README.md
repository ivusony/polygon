# Google Maps polyline drawing tool

## Basic usage


> main initMap function. Google maps api callback 

``` 
 function initMap() { 
 
    //initialize new Map
    var map = new google.maps.Map(
          document.getElementById('map'),
          {
              zoom: 10,
              center: { lat: 45.53, lng: 20.01 }
          }
     );

    //create drawing object
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

    // draw multiple polylines
    DRAW.polygons(polygon_paths, params_object);

    var Init_Drawing_button = document.querySelector('.new_poly');

    Init_Drawing_button.addEventListener('click', function () {

      // init drawing. Returns new Promise
      DRAW.add_new_polygon({
          map: map,
          markersVisible : true
      }).then(function (poly) {
          // do whatever you want with new poly path
          DRAW.one_polygon(poly);

          // send to DB
      })

        this.innerText = "Save new polygon"
    })
}
```
