Deface::Override.new(virtual_path: 'spree/orders/edit',
                     name: 'change_page_header',
                     replace: 'h1',
                     text: "<div class='header-links checkout hid-small-screen'><a href='/cart' class='active'>SHOPPING BAG</a><a href='/'><span class='glyphicon glyphicon-menu-left'></span> KEEP SHOPPING</a></div>")

Deface::Override.new(virtual_path: 'spree/orders/edit',
                     name: 'remove-empty-cart',
                     remove: '#empty-cart')

Deface::Override.new(virtual_path: 'spree/orders/edit',
                     name: 'change_links',
                     replace: '.links') do
  "<div class='total-section clearfix'>
    <div class='col-sm-4 col-sm-offset-8 total-section-container'>
      <div class='clearfix subtotal'>
        <span class='pull-left'>Subtotal</span>
        <span class='pull-right'><%= order_form.object.display_item_total %></span>
      </div>
      <div class='clearfix total'>
        <span class='pull-left'>TOTAL</span>
        <span class='pull-right'><%= order_form.object.display_total %></span>
      </div>
      <div class='checkout-btn-container'>
        <%= button_tag class: '', id: 'checkout-link', name: 'checkout' do %>
          CHECKOUT
        <% end %>
      </div>
      <div class='keep-shopping'>
        <a href='/'><span class='glyphicon glyphicon-menu-left'></span> KEEP SHOPPING</a>
      </div>
    </div>
  </div>"
end
