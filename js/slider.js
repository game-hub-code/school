/**
 * @fileoverview Slick fullscreen slider
 *
 * @author Alex Pivtorak <alex.pivtorak@gmail.com>
 * @version 0.7
 */

'use strict';

jQuery(function($) {
    var el, set, timeRemain, sliderContinue;


    // App
    var Application = {

        settings: {
            sliderAutoplaySpeed: 5000,
            sliderSpeed: 1200
        },

        elements: {
            slider: $('#slick'),
            slickAllThumbs: $('.slick-dots button'),
            slickActiveThumb: $('.slick-dots .slick-active button'),
            
        },

        init: function() {
            set = this.settings;
            el = this.elements;


            this.slider();
            
        },

        /**
         * Slider
         */
        slider: function() {

            el.slider.on('init', function() {
                $(this).find('.slick-dots button').text('');
                Application.dotsAnimation();
                
            });
          
            // On before slide change
            el.slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                console.log("Current Slide: " + currentSlide);
                console.log("Next Slide: " + nextSlide);
                el.slider.find('.slide1').removeClass("slide-init");
            });

            el.slider.slick({
                arrows: true,
                dots: true,
                autoplay: true,
                autoplaySpeed: set.sliderAutoplaySpeed,
                fade: true,
                speed: set.sliderSpeed,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                prevArrow:'<button class="PrevArrow slick-arrow"></button>',
                nextArrow:'<button class="NextArrow slick-arrow"></button>', 
            });

            $('.slick-dots').hover(
                function() {
                    var trackWidth = $('.slick-dots .slick-active button').width();
                    $('.slick-dots .slick-active button').stop().width(trackWidth);
                    el.slider.slick('slickPause');
                    clearTimeout(sliderContinue);
                },
                function() {
                    Application.dotsAnimation(timeRemain);
                    var trackWidth = $('.slick-dots .slick-active button').width();


                    sliderContinue = setTimeout(function() {
                        el.slider.slick('slickNext');
                        el.slider.slick('slickPlay');
                    }, timeRemain);
                }
            );

            el.slider.on('beforeChange', function() {
                $('.slick-dots button').stop().width(0);
            });

            el.slider.on('afterChange', function() {
                $('.slick-dots button').width(0);
                Application.dotsAnimation();
            });

        },

        /**
         *
         * @param remain {number}
         */

        dotsAnimation: function(remain) {

            if (remain) {
                var newDuration = remain;
            } else {
                var newDuration = set.sliderAutoplaySpeed;
            }

            $('.slick-dots .slick-active button').animate({ width: '100%' },
                {
                    duration: newDuration,
                    easing: 'linear',
                    step: function(now, fx) {
                        var timeCurrent = Math.round((now*set.sliderAutoplaySpeed)/100);
                        timeRemain = set.sliderAutoplaySpeed - timeCurrent;
                    }
                }
            );
        },


    };

    //Init
    Application.init();
    
  
    $(window).load(function() {
      $('.slick-slide .img--holder').height($(window).height());
      $('.slick-slide.slide1').addClass("slide-init");
      setTimeout(function(){ $('.slick-slide.slide1').removeClass("slide-init"); }, 1);
    });
  
    $(window).resize(function() {
      $('.slick-slide .img--holder').height($(window).height());
    });

});