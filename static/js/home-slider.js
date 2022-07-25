$(document).ready(function()
{
    "use strict";

    initHomeSlider()

    function initHomeSlider()
    {
        if($('.home_slider').length)
        {
            var homeSlider = $('.home_slider');
            homeSlider.owlCarousel(
                {
                    items:1,
                    loop:true,
                    autoplay:false,
                    smartSpeed:1200
                });

            if($('.home_slider_prev').length)
            {
                var prev = $('.home_slider_prev');
                prev.on('click', function()
                {
                    homeSlider.trigger('prev.owl.carousel');
                });
            }

            if($('.home_slider_next').length)
            {
                var next = $('.home_slider_next');
                next.on('click', function()
                {
                    homeSlider.trigger('next.owl.carousel');
                });
            }

        }
    }
});