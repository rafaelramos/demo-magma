module Spree
  module FrontendHelper
    # Override link_to_cart
    def link_to_cart(text = nil)
      text = text ? h(text) : Spree.t('cart')
      css_class = nil

      if simple_current_order.nil? or simple_current_order.item_count.zero?
        text = "<span class='magma-icon magma-menu-bag'></span>"
        css_class = 'empty'
      else
        text = "<span class='magma-icon magma-menu-bag'><div class='items'>#{ simple_current_order.item_count }</div></span>"
        css_class = 'full'
      end

      ("<a href='#{spree.cart_path}' class='cart-info #{ css_class }'>#{text}</a> #{render_checkout_popup(simple_current_order) if simple_current_order.item_count > 0}").html_safe
    end

    def breadcrumbs(taxon, separator="&nbsp;")
      return ''
    end

    def render_checkout_popup(order)
      text =
      "<div class='magma-checkout-popup'>" +
        "<div class='magma-checkout-popup-triangle'></div>" +
        "<div class='magma-checkout-popup-container'>" +
          "<div class='magma-checkout-popup-header'>#{pluralize(order.item_count, 'Item')} in your bag</div>" +
          "<div class='magma-checkout-popup-body'>" +
            build_form(order) +
          "</div>" +
        "</div>" +
      "</div>"
    end

    def build_form(order)
      items = ''
      order.line_items.each_with_index do | line_item, k |
        items +=
        "<div class='magma-checkout-popup-element'>" +
          "<input type='hidden' value='#{line_item.quantity}' class='line_item_quantity' name='order[line_items_attributes][#{k}][quantity]' id='order_line_items_attributes_#{k}_quantity'>" +
          "<div class='img' style='background-image: url(#{raw_image_path(line_item.product.images.first, :product)})'></div>" +
          "<div class='text'>" +
            "<div class='info'>" +
              "<div class='name'>#{line_item.name}</div>" +
              "<div class='size'>#{line_item.variant.options_text}</div>" +
            "</div>" +
            "<div class='price'>#{display_price(line_item.product)} #{current_currency}</div>" +
          "</div>" +
          "<div class='delete'>" +
            "<a href='#' data-order='#{order.number}' data-id='#{line_item.id}'><span class='magma-icon magma-close'></span></a>" +
          "</div>" +
        "</div>"
      end

      form_for order, url: update_cart_path, html: { id: 'update-cart-popup' } do |order_form|
        (items +
        "<div class='magma-checkout-popup-element footer'>" +
          "<div class='total-container'><span class='total-text'>Total:</span><span class='total'>$#{order.total.to_money.to_s} #{order.currency}</span></div>" +
          "<div class='total-container'>" +
            "<button name='checkout' type='submit' class='' id='checkout-popup-link'>CHECKOUT</button>" +
          "</div>" +
        "</div>").html_safe
      end.to_s
    end
  end
end