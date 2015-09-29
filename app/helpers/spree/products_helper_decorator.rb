module Spree
  ProductsHelper.module_eval do
    def cache_key_for_custom(products, definer)
      count = products.count
      max_updated_at = (products.maximum(:updated_at) || Date.today).to_s(:number)
      products_cache_keys = "spree/products/#{definer}-#{params[:page]}-#{max_updated_at}-#{count}"
      (common_product_cache_keys + [products_cache_keys]).compact.join("/")
    end

    def cache_key_for_product(product = @product)
      (common_product_cache_keys + [product.cache_key]).compact.join("/")
    end

    private

    def common_product_cache_keys
      [I18n.locale, current_currency]
    end
  end
end