window.addEventListener('load', function () {
  map({ lat: 0, lng: 0}, null, 1);
});

$.get('/api/custom/' + encodeURI(toServer), function (res) {
  console.log(res);
});

function sendToServer (number) {
  
}

function data (silo) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;


    // GET /api/name/lat/lng
    $.get('/api/' + silo.attr('id') + '/' + lat + '/' + lng, function (data) {
      var locations = JSON.parse(data);
      map({ lat: lat, lng: lng }, locations, 7, silo.css('background-color'));
    });
  });

}

function map (home, locations, zoom, color) {
  var map = new google.maps.Map(document.getElementById('map-inner'), {
    center: home,
    zoom: zoom,
    styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
  });

  // create home maker
  new google.maps.Marker({
    position: home,
    map: map,
    icon: '/pin.svg/' + color + '/' + true
  });

  if (locations) {
    locations.forEach(function (loc) {
      new google.maps.Marker({
        position: loc,
        map: map,
        icon: '/pin.svg/' + color + '/' + false
      });
    });
  }
}
