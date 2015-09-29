Deface::Override.new(virtual_path: 'spree/shared/_sidebar',
                     name: 'remove_sidebar',
                     remove: 'aside#sidebar')

Deface::Override.new(virtual_path: 'spree/layouts/spree_application',
                     name: 'change_column_size',
                     attributes: { class: 'col-sm-12' },
                     set_attributes: '#content')