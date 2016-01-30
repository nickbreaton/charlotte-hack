window.addEventListener('load', function () {
  var silos = $('.silo');
  var overlay = $('#overlay');

  silos.on('click',function (e) {
    // query clicked element
    var silo = $(e.toElement);

    // find parent up chain
    while (!silo.hasClass('silo')) {
      silo = $(silo.parent());
    }

    // toggle class on and off
    silo.toggleClass('active');

    // remove overlay if not clicked
    overlay.removeClass('active');

    // enable overlay on done
    var observer = setInterval(function () {
      if (silo.width() == window.innerWidth && silo.hasClass('active')) {
          // clear out observer
          clearInterval(observer);

          // display menu
          overlay.addClass('active');
      }
    }, 100);
  });

});
