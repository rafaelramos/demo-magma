$('document').ready(function() {
  $('.product-show .product-variant-container').on('click', 'label', function(){
    if (!$(this).hasClass('disabled')) {
      $(this).parents('.product-show').find('.product-variant-container label').removeClass('active');
      $(this).addClass('active');
    }
  });
});