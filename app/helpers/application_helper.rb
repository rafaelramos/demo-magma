module ApplicationHelper
  def raw_image_path(image, size = :small)
    image.attachment.url(size)
  end

  # Delivery text
  def product_shipping_text(product)
    'PICK UP AT CONFERENCE ONLY!' if product.shipping_category.name.casecmp('pickup') == 0
  end

  # Box for variant presentation
  def variant_presentation(variant, active = false)
    variantBox =
    "<label for='variant_id_#{ variant.id }'>" +
      "<input type='radio'" +
        " name='variant_id'" + " id='variant_id_#{ variant.id }'" +
        " value='#{ variant.id }'" +
        " data-price='#{ variant.price_in(current_currency).money }'" +
        " class='hidden'" +
        "#{ active ? 'checked="checked"' : '' }>" +
      "<span class='product-variant-box #{ 'active' if active } #{ 'disable' unless variant.in_stock? }'>" +
        variant.option_values.first.presentation +
      "</span>" +
    "</label>"

    variantBox.html_safe
  end

  # Product in stock?
  def product_in_stock(product)
    product.stock_items.any?(&:in_stock?)
  end

  # Variant type
  def option_type_name(product)
    product.option_types.first.presentation
  end

  # Price by taxon
  def display_price_by_taxon(product, taxon = nil)
    text = "#{display_price(product)} #{current_currency}"
    text += '/night' if taxon == 'Accommodations'
    text
  end

  # Return if it should print the star icon in the menu
  def menu_small_icon(path)
    icon = "<span class='magma-icon magma-star'></span>".html_safe

    if (params[:controller] == 'spree/home') && (params[:action] == 'index')
      if params[:page] == path
        return icon
      elsif path == 'accommodations' && params[:page].blank?
        return icon
      end
    elsif (params[:controller] == 'spree/users') && (params[:action] == 'show') && (path == 'my_account')
      return icon
    end

    return ''
  end

  def categoryActive(category)
    if params[:page] == category
      return true
    elsif params[:page].blank? && category == 'accommodations'
      return true
    end

    false
  end
end
