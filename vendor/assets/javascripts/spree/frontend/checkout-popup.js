var magmaFetchCart;
(function(){
  magmaFetchCart = function() {
    return $.ajax({
      url: Spree.pathFor("cart_link"),
      success: function(data) {
        $('#link-to-cart').html(data);
        bindPopupDelete();
      }
    });
  };
}());

function bindPopupDelete(){
  $('#link-to-cart .delete a').on('click', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    var params = {
      id: $(this).data('id'),
      order: $(this).data('order')
    }
    $.ajax({
      url: 'orders/external_delete',
      type: 'DELETE',
      data: params
    }).always(function(){
      magmaFetchCart();
    });
  });
};

$('document').ready(function() {
  $('#link-to-cart').off('mouseenter').on('mouseenter', function(){
    var checkout = $('.magma-checkout-popup');
    checkout.stop(true, true);
    if (!checkout.is(':visible')) {
      checkout.fadeIn(500);
    }
  });

  $('#link-to-cart').off('mouseleave').on('mouseleave', function(){
    var checkout = $('.magma-checkout-popup');
    checkout.finish();
    if (checkout.is(':visible')) {
      checkout.delay(1000).fadeOut(500);
    }
  });
});