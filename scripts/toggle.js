window.addEventListener('load', function () {
  var silos = $('.silo');

  silos.click(function (e) {
    var silo =  $(e.toElement);
    silo.toggleClass('active');
  });
});
