$('document').ready(function() {
  $('.header-small-screen-menu').on('click', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    $('.header-small-menu').addClass('visible');
    $('.main-container').addClass('hid-small-screen');
  });
  $('.header-small-menu .small-menu-header .magma-close').on('click', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    $('.header-small-menu').removeClass('visible');
    $('.main-container').removeClass('hid-small-screen');
  });
});