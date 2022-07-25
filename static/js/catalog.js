$(document).ready(function()
{
	"use strict";

	initIsotope()

    function initIsotope()
    {
    	var sortingButtons = $('.item_sorting_btn');

    	if($('.grid').length)
    	{
    		var grid = $('.grid').isotope({
	  			itemSelector: '.grid-item',
	  			percentPosition: true,
	  			masonry:
	  			{
				    horizontalOrder: true
			  	},
			  	getSortData:
	            {
	            	price: function(itemElement)
	            	{
	            		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
	            		return parseFloat(priceEle);
	            	},
	            	name: '.product_title'
	            }
	        });

	        sortingButtons.each(function()
	        {
	        	$(this).on('click', function()
	        	{
	        		var parent = $(this).parent().parent().find('.isotope_sorting_text span');
		        		parent.text($(this).text());
		        		var option = $(this).attr('data-isotope-option');
		        		option = JSON.parse( option );
	    				grid.isotope( option );
	        	});
	        });

	        // Filtering
	        $('.item_filter_btn').on('click', function()
	        {
	        	var parent = $(this).parent().parent().find('.isotope_filter_text span');
	        	parent.text($(this).text());
		        var filterValue = $(this).attr('data-filter');
				grid.isotope({ filter: filterValue });
	        });
    	}
    }

});