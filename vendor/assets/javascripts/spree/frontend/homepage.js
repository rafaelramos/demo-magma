$('document').ready(function() {
  var bigScreen = true;

  init();

  // Initializer: Functions executed on ready
  function init() {
    if ($(window).width() >= 768) {
      //Initial alignment of product boxes
      bigScreen = true;
      magmaAlign($('.accommodations-container'), $('.accommodations-container .product-container'), 0);
      magmaAlign($('.swag-container'), $('.swag-container .product-container'), 0);
    } else {
      bigScreen = false;
    }
  };

  //Detect resize: Remove or add Magma-Align depending on the window size
  window.onresize = function(e) {
    if ($(this).width() < 768 && bigScreen){
      //Screen changed to small
      bigScreen = false;
      magmaAlignClear($('.accommodations-container'), '.product-container');
      magmaAlignClear($('.swag-container'), '.product-container');

      //Clear product boxes active state
      clearProductBox($('.product-container'), true);
    } else if ($(this).width() >= 768 && !bigScreen) {
      //Screen changed to big
      bigScreen = true;
      magmaAlign($('.accommodations-container'), $('.accommodations-container .product-container'), 0);
      magmaAlign($('.swag-container'), $('.swag-container .product-container'), 0);
    }
  };


  // ======= HEADER BUTTONS ========


  //Change product selection: Select Accommodations or Swag products
  $('#products-header a').off('click').on('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (!$(this).hasClass('active')) {
      var newPage = $(this).data().target,
          scroll = $(window).scrollTop();

      $('#products-header .active').switchClass('active', '', 100);
      $('.products-container').removeClass('active');

      $(this).switchClass('', 'active', 100);
      $('.' + newPage + '-container').addClass('active');
      $(window).scrollTop(scroll);

      //Add parameter if the user refresh it keeps the category
      window.history.pushState(newPage, '', "?page=" + newPage)
      $('.header-small-menu .small-menu-links span').remove();
      $('.header-small-menu .small-menu-links .' + newPage).append("<span class='magma-icon magma-star'></span>");
    }
  });

  //Change product selection with swipe: Select Accommodations or Swag products with swipe
  if ($('#products-header').size()) {
    var mc = new Hammer(document.getElementById('products-header'));
    mc.on("panright", function(e) {
      $('#products-header').find('.accommodations').trigger('click');
    });
    mc.on("panleft", function(e) {
      $('#products-header').find('.swag').trigger('click');
    });
  }


  // ====== PRODUCT BOX SELECTION =======


  //Click on inactive product box: Remove active from others and the selected become active
  $('.product-container').off('click').on('click', function(e) {
    if (!$(this).hasClass('active')) {
      e.preventDefault();
      if (!$(this).hasClass('product-extra')) {
        if (bigScreen) {
          var parent = $(this).parents('.products-container');

          parent.find('.product-container').removeClass('active');
          $(this).addClass('active');

          var containers = parent.find('.product-container:not(.active)');
          clearProductBox(containers, true);

          $(this).find('.product-info-big').stop().delay(1000).fadeIn();
          $(this).find('.product-info-small').stop().fadeOut();

          magmaAlign(parent, parent.find('.product-container'), 500);
        } else {
          window.location.href = $(this).data('url');
        }
      }
    }
  });

  //Click on button to close active product box: Remove active from the selected
  $('.product-info-big-close').off('click').on('click', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var parent = $(this).parents('.product-container'),
        container = $(this).parents('.products-container');

    clearProductBox(parent, true);

    if (bigScreen) {
      magmaAlign(container, container.find('.product-container'), 500);
    }
  });

  function clearProductBox(element, transition) {
    element.removeClass('active');
    if (transition) {
      element.find('.product-info-big').stop().fadeOut(200);
      element.find('.product-info-small').stop().fadeIn();
    } else {
      element.find('.product-info-big').stop().hide();
      element.find('.product-info-small').stop().show();
    }
  }


  // ====== PRODUCT BOX INNER ACTIONS =======


  //Click on variant of product box: Select a size or variant from the product
  $('.product-variant-box').off('click').on('click', function(){
    if (!$(this).hasClass('disable')) {
      $(this).parents('.variants').find('.product-variant-box').removeClass('active');
      $(this).addClass('active');
    }
  });

  //Click on add to bag of product box: Add the selected product to the bag
  $('.product-container form').off('submit').on('submit', function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    $.post('/orders/external_populate', $(this).serialize())
      .done(function(data){
        messageBarShow(data.msg, data.status);
        magmaFetchCart();
      })
      .fail(function(){
        messageBarShow('Something went wrong, please try again.', 'error');
        magmaFetchCart();
      });
  });


  // ============= MAGMA ALIGN =============


  //Aligner of product box: Align the childs in the parent by percentage
  function magmaAlign(parentElement, childs, time) {
    var columnElements = 2, //Number of elements per column
        columnHeight = 310, //Height of the elements (add extra for padding)
        currentHeight = 0, //To set the position and height of the container
        active = $(childs.filter('.active')),
        positionActive = '';

    childs.css('position', 'absolute');

    // Search active top position
    if (active.length > 0) {
      positionActive = active.css('top');
      if (positionActive == 'auto') {
        positionActive = '0px';
        active.css('top', '0px');
      }
      active.animate({
        left: '0%'
      }, time);
    }
    // Start to set positions
    magmaAlignChilds(childs, columnHeight, currentHeight, columnElements, positionActive, time);

    currentHeight = (Math.ceil((childs.length + active.length)/2) * columnHeight);

    //Set style to parent
    parentElement.css('position', 'relative');
    parentElement.css('height', currentHeight + 'px');
  };

  //Align the childs in the parent (used by magmaAlign() method)
  function magmaAlignChilds (childs, columnHeight, currentHeight, columnElements, positionActive, time) {
    var columnCounter = 0;
    $.each( childs, function( key, value ) {
      if ((currentHeight + 'px') == positionActive) {
        currentHeight += columnHeight;
        columnCounter = 0;
      }

      if (!($(value).hasClass('active'))) {
        var left = (columnCounter * (100 / columnElements)) + '%';
        if ((key == childs.length-1) && (columnCounter == 0)) {
          left = '25%';
        }

        $(value).animate({
          top: currentHeight + 'px',
          left: left
        }, time);
        columnCounter += 1;
      }

      if (columnCounter >= columnElements) {
        columnCounter = 0;
        currentHeight += columnHeight;
      }
    });
  };

  //Remove the Magma Align styles from the element
  function magmaAlignClear(parentElement, selector) {
    parentElement.find(selector).removeAttr('style').removeClass('active');
    parentElement.removeAttr('style');
  };
});