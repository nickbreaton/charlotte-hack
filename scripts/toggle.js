window.addEventListener('load', function () {
  var silos = $('.silo');
  var overlay = $('#overlay');

  silos.on('click', function (e) {
    // query clicked element
    var silo = $(e.toElement);

    // find parent up chain
    while (!silo.hasClass('silo')) {
      silo = $(silo.parent());
    }

    // toggle class on and off
    silo.toggleClass('active');

    // enable on sliders
    if (silo.attr('id') == 'silo-top-rated') {
      if (!silo.hasClass('active')) {
        $('#custom').toggleClass('active');
      } else {
        setTimeout(function () {
          $('#custom').toggleClass('active');
        }, 1000);
      }
    }

    // toggle z
    if (silo.hasClass('active')) {
      silo.css('z-index', 1);

      // pass data to mapping
      data(silo);
    } else {
      setTimeout(function () {
        silo.css('z-index', 0);
      }, 1000);
    }

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
