$(document).ready(function(e) {

  //  $('.slickSlider').bxSlider();
	
	
	
	
 
	
	
	setTimeout(function(){
		$('.momentGrid').masonry({
		  itemSelector: '.momentGrid li',
		  //columnWidth: "50%"
		});
		 $('.counSlider').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
		
		ContSlider();
		
		
		console.log( $('.mainBanner').length);
		 $('.mainBanner').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1000:{
					items:1
				}
			}
		});
		
		
		$('.homeCatSlider').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:4
				},
				1000:{
					items:4
				}
			}
		});
		
		
		$('.freshDealSlider').owlCarousel({
			loop:true,
			margin:15,
			nav:true,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:4
				},
				1000:{
					items:4
				}
			}
		});
		
		
		$('.popularFreshSlider').owlCarousel({
			loop:true,
			margin:15,
			nav:true,
			responsive:{
				0:{
					items:2
				},
				600:{
					items:3
				},
				1000:{
					items:3
				}
			}
		});
		
		
		
		
	},2000);
	
	

});


function ContSlider(){
	$('.counSlider li').each(function(){
		var FlagWidt = $(this).find('.contListItem').width();
		var htTopFlag = FlagWidt * 0.6;
		$(this).find('.flageShowHide').css('height',htTopFlag);
		var ZoomHt = FlagWidt * 0.9;
		var ZoomTop = FlagWidt * 0.15;
		$(this).find('.contShowHideCont').css('height',ZoomHt);
		$(this).find('.contShowHideCont').css('top',-ZoomTop);
		var flagHt = FlagWidt * 0.6;
		$(this).find('.flagBg').css('height',flagHt);
	});
	
}