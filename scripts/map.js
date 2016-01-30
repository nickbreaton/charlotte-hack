window.addEventListener('load', function () {
  map({ lat: 0, lng: 0}, null, 1);
});


function sendToServer (numbers, silo) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;

    numbers += '' + window.zip;
    map({ lat: lat, lng: lng }, [], 12, silo ? silo.css('background-color') : 'black');
  });
}

function data (silo) {
  switch (silo.attr('id')) {
    case 'silo-closest':
      sendToServer('4 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', silo);
      break;
    case 'silo-quietest':
      sendToServer('0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 0', silo);
      break;
    case 'silo-cleanist':
      sendToServer('0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 0 0 0 0 0 0 0 0 0 0', silo);
      break;
  }
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
