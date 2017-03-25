//********************

var mystate = document.getElementById("myState").value;

var myyear = document.getElementById("myyear").value;
$(document).ready(function(){
    $('#lfform').change(function(){
        function validateForm() {
            var state = document.forms["myForm"]["myState"].value;
            if (state == "Select State") {
                alert("State must be selected");
                return false;
            }
            var Year = document.forms["myForm"]["myyear"].value;
            if (Year == "Select Year") {
                alert("Year must be selected");
                return false;
            }
            console.log('State:'+ state);
            console.log('Year:'+ Year);
        };
    });
});


//**********************
/**
* Elements that make up the popup.
*/
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
* Create an overlay to anchor the popup to the map.
*/
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
}));


/**
* Add a click handler to hide the popup.
* @return {boolean} Don't follow the href.
*/
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

//***************
 var styles = [
        'Road',
        'Aerial',
        'AerialWithLabels',
        'collinsBart',
        'ordnanceSurvey'
];
var layers = [];
var i, ii;
for (i = 0, ii = styles.length; i < ii; ++i) {
layers.push(new ol.layer.Tile({
  visible: false,
  preload: Infinity,
  source: new ol.source.BingMaps({
    key: 'Your Bing Maps Key from http://www.bingmapsportal.com/ here',
    imagerySet: styles[i]
    // use maxZoom 19 to see stretched tiles instead of the BingMaps
    // "no photos at this zoom level" tiles
    // maxZoom: 19
  })
}));
}
//*******************
/**
* Create the map.
*/
var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    overlays: [overlay],
    target: 'map',
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
});


/**
* Add a click handler to the map to render the popup.
*/
map.on('singleclick', function(evt) {
    var coordinate = evt.coordinate;
    var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
        coordinate, 'EPSG:3857', 'EPSG:4326'));

    content.innerHTML = '<p>You clicked here:</p><code>' + hdms +
        '</code>' +
        '<p>State: ' + mystate + '</p>' +
        '<p>Model Year:'+ myyear + '</p>';
    overlay.setPosition(coordinate);
});