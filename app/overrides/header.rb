Deface::Override.new(virtual_path: 'spree/shared/_login_bar',
                     name: 'change_page_header',
                     replace: '#link-to-login',
                     text: '<li id="link-to-login"><%= link_to "LOG IN", spree.login_path %></li>')