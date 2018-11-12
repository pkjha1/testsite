var videoPopupCtrl = {
	init: function() {

		this.events();

	},

	events: function(){

		$(document).on('click', "[data-play-video]", function(e){

            e.preventDefault();
            e.stopPropagation();


			if($(window).innerWidth() < 1200){

       $('.video-popup').addClass('video-popup_active');
        $('.progress').show();
        $('.button-pause').show();
        $('.button-close').show();
     }
   });

		$('[data-popup-close]').on('click', function(){

			if($(window).innerWidth() < 1200){

				$('.video-popup').removeClass('video-popup_active');
				$(".button-pause").removeClass('button-pause_active');
                mobileVideoPlayer.pause();

                $(".case__close").trigger('click');
			}
		});

		$('[data-popup-pause]').on('click', function(){

			if($(window).innerWidth() < 1200){

				if($(this).hasClass('button-pause_active')){

					$(this).removeClass('button-pause_active');

					mobileVideoPlayer.play();

				} else {

					$(this).addClass('button-pause_active');

					mobileVideoPlayer.pause();

				}
			}
		});

	}
}

var mobileMainScreenFix = {
  init: function() {
    $('.block-1__container').on('click', function(){
      $('.screen__pattern').css('z-index', 0);
    });
        $('.block-1__close').on('click', function(){
      $('.screen__pattern').css('z-index', 10);
    });
  }
}

var mobileSliderCase = {
  init: function() {
    $('.mobile-slider').slick({
      dots: true,
      slidesToShow: 1,
      fade: true,
      dots: true,
      arrows: false,
      autoplay: true
    });
  }
}


var controllsVideo = {
  init: function() {
    var th = controllsVideo;
    th.events();

  },
  events: function() {
    var th = controllsVideo;

    th.hideFunction();
    $(document).on('touchstart mousemove', '.mejs__mediaelement', function(event) {
      $('.button-full').addClass('button-full_active');
      $('.button-full').addClass('button-full_case');
      $('[data-video-close]').css('opacity', 1);
      $('.mejs__time-rail').css('opacity', 1);

      if($(window).innerWidth()<=767){
        $('.progress').show();
        $('.button-pause').show();
        $('.button-close').show();
      }
    });

  },
  hideFunction: function() {
    var th = controllsVideo;

    // if($(window).innerWidth() >= 1200){
      var time = 0;

      var interval = setInterval(function(){
        time++;
        if (time > 10){
          $('.button-full').removeClass('button-full_active');
          $('.button-full').removeClass('button-full_case');
          $('[data-video-close]').css('opacity', 0);
          $('.mejs__time-rail').css('opacity', 0);

          if($(window).innerWidth()<=767){
            $('.progress').hide();
            $('.button-pause').hide();
            $('.button-close').hide();

          }


          time = 0;
        }
      }, 500);
    // }

  }

}


var fullscreenVideo = {
  init: function() {

    var th = fullscreenVideo;

    th.elements = {
      $btnFullscreen: $('.button-full'),
      $btnClose: $('.block-1__close, .block-6__close'),
      $btnShowVideo: $('.block-1__container, .block-6__rect'),
      $cursor: $('[data-video-pattern]')
    };

    th.mods = {
      btnOpened: 'button-full_open',
      btnFullActive: 'button-full_active'
    }

    th.events();

  },
  events:function() {
    var th = fullscreenVideo;

    th.elements.$btnFullscreen.on('click', function(){
      var $btn = $(this);
      var $parent = $btn.closest('[data-fullscreen-parent]');

      if($btn.hasClass(th.mods.btnOpened)){
        th.cancelFullscreen();
        $btn.removeClass(th.mods.btnOpened);
        $('.block-6__rect').removeClass('block-6__rect_active');
        th.elements.$btnClose.show();
      } else {
        $btn.addClass(th.mods.btnOpened);
        th.setFullscreen($parent);
        $('.block-6__rect').addClass('block-6__rect_active');
        th.elements.$btnClose.hide();
      }
    });

    th.elements.$btnShowVideo.on('click', function() {
      setTimeout(function() {
        th.elements.$btnFullscreen.addClass(th.mods.btnFullActive);
      },600)
    });

    th.elements.$btnClose.on('click', function() {
       th.elements.$btnFullscreen.removeClass(th.mods.btnFullActive);
    });

    th.elements.$btnFullscreen.on('mouseenter', function() {
       th.elements.$cursor.css("opacity", 0);
    });

    th.elements.$btnFullscreen.on('mouseleave', function() {
        th.elements.$cursor.css("opacity", 1);
    });

    th.changeFullscreen();

  },
  setFullscreen: function($parent) {

     var elem = $parent[0];

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
  },
  cancelFullscreen: function(){

    var elem = document;

      if(elem.cancelFullScreen) {
       elem.cancelFullScreen();
      } else if(elem.mozCancelFullScreen) {
        elem.mozCancelFullScreen();
      } else if(elem.webkitCancelFullScreen) {
       elem.webkitCancelFullScreen();
      } else if(elem.msExitFullscreen){
      elem.msExitFullscreen();
    }
  },
  changeFullscreen: function() {
    var th = fullscreenVideo;
    var elem = document;

    elem.addEventListener('webkitfullscreenchange', exitHandler, false);
    elem.addEventListener('mozfullscreenchange', exitHandler, false);
    elem.addEventListener('fullscreenchange', exitHandler, false);
    elem.addEventListener('MSFullscreenChange', exitHandler, false);

    function exitHandler()
    {
      if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement === false)
      {
        th.elements.$btnClose.hide();
      } else {
        th.elements.$btnClose.show();
      }
    }
  }
}



$(document).ready(function() {
 if($(window).innerWidth() < 1200) {
  videoPopupCtrl.init();
}
 if($(window).innerWidth() < 767) {
  mobileSliderCase.init();
}
  fullscreenVideo.init();
  mobileMainScreenFix.init();
  controllsVideo.init();

})
