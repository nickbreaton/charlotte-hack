window.addEventListener('load', function () {
  map(35.3062898, -80.7216544, 15);
});

function map (lat, long, zoom, color) {
  var map = new google.maps.Map(document.getElementById('map-inner'), {
    center: { lat: lat, lng: long },
    zoom: zoom,
    styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
  });

  var marker = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
    icon: '/pin.svg/' + color
  });
}
