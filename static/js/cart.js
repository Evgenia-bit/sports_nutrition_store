$(document).ready(function()
{
	"use strict";

	initQty()

	function updateQuantity(qty, newValue) {
		$.get(`/update_the_cart`, {productId: qty.attr('data-prodId'), quantity: newValue }, (data) => {
			qty.closest('.product_quantity_container').next().html(`<span>Итого: </span>${data.newPrice}руб.`)
			$('.with_shipping').text(data.newTotalPriceWithShipping + "руб.")
			$('.total-price').text(data.newTotalPrice + "руб.")
			});
	}
	function initQty()
	{
		if($('.product_quantity').length)
		{
			var qtys = $('.product_quantity');
			var extraTotal = $('.cart_extra_total_value');

			qtys.each(function()
			{
				var qty = $(this);
				var sub = qty.find('.qty_sub');
				var add = qty.find('.qty_add');
				var num = qty.find('.product_num');


				var original;
				var newValue;
				var prodNum = qty.find('.product_num');
				prodNum.on('change', ()=> {
					newValue = prodNum.val();
					updateQuantity(qty, newValue )
				})
				sub.on('click', function()
				{
					original = parseFloat(prodNum.val());
					if(original > 0)
						{
							newValue = original - 1;
						}
					num.val(newValue);
					updateQuantity(qty, newValue )
				});

				add.on('click', function()
				{
					original = parseFloat(prodNum.val());
					newValue = original + 1;
					num.val(newValue);

					updateQuantity(qty, newValue )

				});
			});
		}
	}
});