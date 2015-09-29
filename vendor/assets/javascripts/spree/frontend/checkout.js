$('document').ready(function() {
  $('.cart-item .info .details').on('click', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    $(this).find('span').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up');
    $(this).parents('.line-item').find('.cart-item-description-container').stop().toggle();
    if ($(this).find('.text').text() === 'DETAILS') {
      $(this).find('.text').text('LESS');
    } else {
      $(this).find('.text').text('DETAILS');
    }
  });

  $('.cart-item-quantity a').on('click', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    var input = $(this).parents('.cart-item-quantity').find('input');
    if ($(this).hasClass('plus')) {
      input.val(addNumber(input.val(), 1));
    } else if ($(this).hasClass('minus')) {
      input.val(addNumber(input.val(), -1));
    }
  });

  function addNumber(val, number) {
    if (isNaN(val)) {
      return 0;
    } else {
      var result = parseInt(val) + number;
      return result < 0 ? 0 : result;
    }
  }
});