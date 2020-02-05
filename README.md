# Google Maps polyline drawing tool

## Usage


### Instantiate new polydraw object in main initMap function
```
var DRAW = new GM_POLY_DRAW(map);
```

### Draw multiple polylines based on paths without labels. 

The array passed to the function must be the following format:
[
  [
    {coords},
    {coords},
    {coords}
  ],
  [
    {coords},
    {coords},
    {coords}
  ]
]

``` 
DRAW.polylines(polyline_paths : *required / array of arrays of polyline latLng objects* , params_object : *optional / set color, weight, opacity*) : *void*;
```

### Draw multiple polylines based on paths WITH labels. 
> The labels will be shown in google map info windows pointing on the first marker

The array passed to the function must be the following format:
[
 {
   label : "Some label",
   coords : [
      {},
      {},
      {}
   ]
 },
 {
   label : "Some label 2",
   coords : [
     {},
     {},
     {}
   ]
 }
]
```
DRAW.labeled_polylines(labeled_polylines : *required / array of objects including labels and coords* , params_object : *optional / set color, weight, opacity*) : *void*;
```

### Draw single polyline based on path without label
```
DRAW.polyline(polyline_path : *required / array of polyline latLng objects*, params_object : *optiona / set color, weight, opacity*) : *void*;
```

### Create new polyline path 
> returns a promise
```
var new_polyline_path =  DRAW.new_polyline_path({map : *required / the map object*, markersVisible : *optional / boolean*}) : *new Promise*

new_polyline_path.then(new_path => {
  *Do what you want with new path*
   DRAW.one_polygon(poly);
})
```

### Polilyne labels

> You can hide all polyline labels (displayed in Info Windows) on the map or show them again with folowing methods:

```
DRAW.remove_labels();
```
or
```
DRAW.show_labels();
```

### Example
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
    var polyline_paths = 
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
    DRAW.polyline(polyline_paths, params_object);

    var Init_Drawing_button = document.querySelector('.new_poly');

    Init_Drawing_button.addEventListener('click', function () {

      // init drawing. Returns new Promise
      DRAW.add_new_polyline({
          map: map,
          markersVisible : true
      }).then(function (poly) {
          // do whatever you want with new poly path
          DRAW.one_polyline(poly);

          // send to DB
      })

        this.innerText = "Save new polyline"
    })
}
```
