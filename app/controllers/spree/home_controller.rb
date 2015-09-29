module Spree
  class HomeController < Spree::StoreController
    helper 'spree/products'
    respond_to :html

    def index
      taxon_accommodations = Taxon.friendly.find_by_name('Accommodations')
      taxon_meals = Taxon.friendly.find_by_name('Meals')
      taxon_swag = Taxon.friendly.find_by_name('Swag')

      # TODO: If those doesn't exist?
      @accommodations = Spree::Product.in_taxons(taxon_accommodations, taxon_meals)
      @swag = Spree::Product.in_taxons(taxon_swag)
      @taxonomies = []
    end
  end
end