
///////////////////////////////
$(function(){

    if ($(".classSlider").length > 0) {
        let params = (new URL(document.location)).searchParams; 
        if (params && params.get("id")) {
        let slideID = parseInt(params.get("id"));
        $(".classSlider").slickGoTo(slideID);
        }
    }

	$(".header__btn").on("click", function () {
    $(".header__btn").toggleClass("header__btn--active");
    $(".header__navigation").toggleClass("active");
		$("body").toggleClass("lock");
  });

  //меню главной страницы
  $(".main-menu__btn").on("click", function () {
    $(".main-menu__btn").addClass("active");
    $(".main-body").addClass("menuOpened");
  });
  $(".main-menu__close").on("click", function () {
    $(".main-menu__btn").removeClass("active");
    $(".main-body").removeClass("menuOpened");
  });



  //валидация формы
  $("#subform").validate({
    rules: {
      login: {
        required: true,
        minlength: 3
      },
      password: {
        required: true,
        minlength: 3
      },
      email: {
        required: true,
        email: true
      },
    }
  });
	
	if ($('.nomination__slider').length > 0){
		// var $slider = $('.nomination__slider');
		// if ($slider.length) {
		// 	var currentSlide;
		// 	var slidesCount;
		// 	var sliderCounter = document.createElement('div');
		// 	sliderCounter.classList.add('slider__counter');
			
		// 	var updateSliderCounter = function(slick, currentIndex) {
		// 		currentSlide = slick.slickCurrentSlide() + 1;
		// 		slidesCount = slick.slideCount;
		// 		$(sliderCounter).text(currentSlide + '/' +slidesCount)
		// 	};
	
		// 	$slider.on('init', function(event, slick) {
		// 		$slider.append(sliderCounter);
		// 		updateSliderCounter(slick);
		// 	});
	
		// 	$slider.on('afterChange', function(event, slick, currentSlide) {
		// 		updateSliderCounter(slick, currentSlide);
		// 	});
	
		// }
		// $('.nomination__slider').slick({
		// 	prevArrow: '<button class="slider__left"><span></span></button>',
		// 	nextArrow: '<button class="slider__right"><span></span></button>',
		// 	slidesToShow: 2,
		// 	rows: 3,
		// 	dots: false,
		// 	arrows: true,
		// 	responsive: [
		// 		{
		// 			breakpoint: 500,
		// 			settings: {
		// 				slidesToShow: 1,
		// 				slidesToScroll: 3,
	
		// 			}
		// 		}
		// 	]
		// });

        $(".nomination__inner-slider").slick({
            nextArrow: '<button class="slider__right"><span></span></button>',
            prevArrow: '<button class="slider__left"><span></span></button>',
            slidesToShow: 1,
            rows: 1,
            dots: !1,
            arrows: !0
        })
	}

	

  $('.master__slider').slick({
    nextArrow: '<button class="slider__right" src="images/src/content/modernArrow-left"><svg width="53" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.94 10.94a1.5 1.5 0 000 2.12l9.545 9.547a1.5 1.5 0 102.122-2.122L4.12 12l8.486-8.485a1.5 1.5 0 10-2.122-2.122L.94 10.94zM53 10.5H2v3h51v-3z" fill="#fff"/></svg></button>',
    prevArrow: '<button class="slider__left" src="images/src/content/modernArrow-right"><svg width="53" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.94 10.94a1.5 1.5 0 000 2.12l9.545 9.547a1.5 1.5 0 102.122-2.122L4.12 12l8.486-8.485a1.5 1.5 0 10-2.122-2.122L.94 10.94zM53 10.5H2v3h51v-3z" fill="#fff"/></svg></button>',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    fade: true
  });

	$('.picture-slider').slick({
		nextArrow: '<button class="slider__left"><span></span></button>',
		prevArrow: '<button class="slider__right"><span></span></button>',
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		fade: true
	});


});


//параллакс
document.addEventListener("mousemove", parallax);
function parallax(event) {
	this.querySelectorAll(".modal__parallax").forEach((shift) => {
		const position = shift.getAttribute("value");
		const x = (window.innerWidth + event.pageX * position) / 90;
		const y = (window.innerHeight + event.pageY * position) / 90;
		shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
	});
}

//аудиоплеер
function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
   }
   
   jQuery(document).ready(function($) {
    $(".picture-slider__item.slick-slide").each(function(){
     var parent = $(this);
     var player = parent.find('audio')[0];
     var $play_button = parent.find('.play');
     var $pause_button = parent.find('.pause');
     var durationPlayer = player.duration;
     var $bar = parent.find('.bar');
     var update_time;
    
     var minutesSum = pad(Math.floor(durationPlayer / 60), 2);
     var secondsSum = pad(Math.floor(durationPlayer - minutesSum * 60), 2);
     parent.find('.elapsed span:nth-child(2)').html(minutesSum + ':' + secondsSum);
     
     function startNupdate() {
       player.pause();
       player.play();
       $play_button.hide();
       $pause_button.show();
       clearInterval(update_time);
       update_time = setInterval(function() {
      var gradients = '';
      for (var i = 0; i < player.buffered.length; i++) {
        var perc_start = ((player.buffered.start(i) / player.duration) * 100).toString();
        var perc_end = ((player.buffered.end(i) / player.duration) * 100).toString();
   
        if (i > 0) {
       gradients = gradients + ',rgba(240,240,240) ' + perc_start + '%,#9D9D9D ' + perc_start + '%' +
         ', #9D9D9D ' + perc_end + '%, rgba(240,240,240) ' + perc_end + '%'
        } else {
       gradients = gradients + '#9D9D9D ' + perc_start + '%' + ', #9D9D9D ' + perc_end +
         '%, rgba(240,240,240) ' + perc_end + '%'
        }
      }
      gradients = gradients + ',rgba(240,240,240) ' + ((player.buffered.end(player.buffered.length - 1) / player
        .duration) * 100) + '%, rgba(240,240,240)'
      $bar.css({
        "background": "linear-gradient(to right, #F0F0F0, " + gradients + ")"
      })
      var minutes = pad(Math.floor(player.currentTime / 60), 2);
      var seconds = pad(Math.floor(player.currentTime - minutes * 60), 2);
      parent.find('.elapsed span:nth-child(1)').html(minutes + ':' + seconds);
      parent.find('.position-marker').css({
        "left": ((player.currentTime / player.duration) * 100) + '%'
      })
       }, 1000)
     }
   
     $bar.on('click', function(event) {
       var pos_perc = event.offsetX / event.target.offsetWidth;
       player.currentTime = (player.duration * pos_perc);
       startNupdate();
     })
   
     $play_button.on('click', function() {
       startNupdate();
     });
     $pause_button.on('click', function() {
       player.pause();
       $pause_button.hide();
       $play_button.show();
       clearInterval(update_time);
     });
    });
    
    $(".picture-slider").on("beforeChange", function (){
     $(".picture-slider__item.slick-active").each(function(){
      var parent = $(this);
      var player = parent.find("audio")[0];
      var $play_button = parent.find('.play');
      var $pause_button = parent.find('.pause');
      player.pause();
      $pause_button.hide();
      $play_button.show();
     });
    });
   });