function include(url)
{
  document.write('<script src="'+url+'"></script>');
  return false ;
}
/* DEVICE.JS
========================================================*/
include('js/device.min.js');

/* Easing library
========================================================*/
include('js/jquery.easing.js');


$(document).on('scroll', function() {
	   if ($(document).scrollTop() >0) {
	      $('.header').addClass('nav-shrink');
		} else {
			$('.header').removeClass('nav-shrink');
	}
});

$(window).on('load', function(){
	$('.BannerCarousel').owlCarousel({
		items:1,
		merge:true,
		loop:true,
		lazyLoad:true,
		margin:0,
		nav:true,
		lazyLoad:true,
		center:false,
		autoplay:true,
		dots:true,
            slideTransition: 'linear',
smartSpeed: 2000,
		autoplaySpeed: 2000,
		autoplayTimeout:3500,
		autoplayHoverPause:false
	});
});
$(window).on('load', function(){
	$('.FacilitiesCarousel').owlCarousel({
		items:4,
		merge:true,
		loop:true,
		lazyLoad:true,
		margin:20,
		nav:false,
		lazyLoad:true,
		center:false,
		autoplay:true,
		dots:true,
		autoplayTimeout:3500,
		autoplayHoverPause:false,
		responsive: {
			0:{
			  items: 1
			},
			480:{
			  items: 2
			},
			769:{
			  items: 2
			},
			960:{
			  items: 3
			},
			1200:{
			  items: 4
			}
		}
	});
});
$(window).on('load', function(){
	$('.TestimonialsCarousel').owlCarousel({
		items:1,
		merge:true,
		loop:true,
		lazyLoad:true,
		margin:0,
		nav:false,
		lazyLoad:true,
		center:false,
		autoplay:true,
		dots:true,
		autoplayTimeout:3500,
		autoplayHoverPause:false
	});
});


//top
$(document).ready(function(){ 
					
			$(window).scroll(function(){
				if ($(this).scrollTop() > 100) {
					$('.scrollup').fadeIn();
				} else {
					$('.scrollup').fadeOut();
				}
			}); 
			
			$('.scrollup').click(function(){
				$("html, body").animate({ scrollTop: 0 }, 600);
				return false;
			});
 
		});
		
$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.tabs a').click(function(e){
  e.preventDefault();
    var $this = $(this),
        tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();

})

document.getElementById("year").innerHTML = new Date().getFullYear();

var modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.getAttribute('data-modal');
    document.getElementById(modal).style.display = "block";
  }
});

var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}