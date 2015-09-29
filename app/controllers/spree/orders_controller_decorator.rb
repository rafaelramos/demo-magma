Spree::OrdersController.class_eval do

  def external_populate
    order    = current_order(create_order_if_necessary: true)
    variant  = Spree::Variant.find_by_id(params[:variant_id])
    quantity = params[:quantity].to_i
    options  = params[:options] || {}
    line_item = order.line_items.find_by_variant_id(params[:variant_id])
    new_quantity = line_item ? line_item.quantity + quantity : quantity

    return render json: { status: 'error', msg: 'Sorry, something went wrong' }, status: :ok unless variant

    if new_quantity.between?(1, variant.total_on_hand)
      begin
        order.contents.add(variant, quantity, options)
      rescue ActiveRecord::RecordInvalid => e
        error = e.record.errors.full_messages.join(", ")
      end
    else
      error = "Sorry, we don't have enough items of #{ variant.descriptive_name }"
    end

    if error
      render json: { status: 'error', msg: error }, status: :ok
    else
      render json: { status: 'success', msg: 'Your product has been added' }, status: :ok
    end
  end

  def external_delete
    line_item = current_order.line_items.find_by_id(params['id'])

    if line_item.destroy
      current_order.updater.update_item_count
      current_order.update_totals
      current_order.persist_totals
      render json: { status: 'success', msg: 'Your product has been removed' }, status: :ok
    else
      render json: { status: 'success', msg: 'Something went wrong deleting you item.' }, status: :ok
    end
  end
end