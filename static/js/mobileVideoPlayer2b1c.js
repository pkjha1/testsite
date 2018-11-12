


var mobileVideoPlayer = {
  init: function(block) {

    var th = mobileVideoPlayer;

    th.elements = {
      video: block.querySelector('video'),
      canvas: block.querySelector('canvas')
    };

    th.ctx = th.elements.canvas.getContext('2d');

    th.width = th.elements.canvas.offsetWidth;
    th.height = th.elements.canvas.offsetHeight;

    th.ctx.width = th.width;
    th.ctx.height = th.height;

    th.played = 0;

    var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = th.ctx.webkitBackingStorePixelRatio ||
                            th.ctx.mozBackingStorePixelRatio ||
                            th.ctx.msBackingStorePixelRatio ||
                            th.ctx.oBackingStorePixelRatio ||
                            th.ctx.backingStorePixelRatio || 1;

    th.ratio = devicePixelRatio / backingStoreRatio;

    th.elements.canvas.width = th.width*th.ratio;
    th.elements.canvas.height = th.height*th.ratio;

    th.ctx.scale(th.ratio, th.ratio);

    th.ctx.fillStyle = "#FFFFFF";
    th.ctx.strokeStyle = "#FFFFFF";


    th.data = {
      src: null,
      current: 0,
      duration: 0
    };


    th.timer = null;



    th.events();

  },
  setVideo: function(src) {

    var th = mobileVideoPlayer;

    th.data.src = src;
    th.elements.video.setAttribute('src', src);

    th.elements.video.oncanplay = function() {
      th.data.duration = th.elements.video.duration;
      th.elements.video.play();
    };

  },
  play: function() {

    var th = mobileVideoPlayer;


    // console.log(th.data.duration);
    // // if(th.duration == NaN || th.duration == undefined){
    // //   return
    // // }


    th.elements.video.play();

    th.timer = setInterval(function() {
      th.draw()
    }, 1000);

  },
  pause: function() {

    var th = mobileVideoPlayer;

    th.elements.video.pause();

    clearInterval(th.timer);

  },
  draw: function() {

    var th = mobileVideoPlayer;

    var ctx = th.ctx;
    ctx.clearRect(0, 0, th.width, th.height);

    th.data.current = th.elements.video.currentTime;

    var x = th.data.current/th.elements.video.duration*th.width;

    ctx.beginPath();
    ctx.arc(x, 55, 4.5, 0,2*Math.PI);
    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(0,55);
    ctx.lineTo(x,55);
    ctx.stroke();

  },
  goto: function(time) {

    var th = mobileVideoPlayer;

    th.elements.video.currentTime = time;

  },
  inlinePlay: function(src){

    var th = mobileVideoPlayer;

    $('.video-popup').addClass('video-popup_active');
    
    th.elements.video.pause();
    th.data.current = 0;
    clearInterval(th.timer);
    th.elements.video.setAttribute('src', src);
    th.elements.video.play();
    
    th.elements.video.onended = function() {
      th.elements.video.currentTime = 0;
    }

    th.timer = setInterval(function() {
      th.draw();
    }, 500);    
  },
  events: function() {

    var th = mobileVideoPlayer;

    $(document).on('click', "[data-play-video]", function(){

     if($(window).width()<= 1200){

        th.elements.video.pause();
        th.data.current = 0;
        clearInterval(th.timer);
        var src = this.getAttribute('data-play-video');
        th.elements.video.setAttribute('src', src);
        th.elements.video.play();


        th.elements.video.onended = function() {
          th.elements.video.currentTime = 0;
        }

        th.timer = setInterval(function() {
          th.draw();
        }, 500);
      }

    });

    th.elements.canvas.addEventListener('click', function(e) {
      var time = e.clientX/th.width*th.elements.video.duration;
      th.goto(time);
    });


    $(window).on('resize', function() {

      th.width = th.elements.canvas.offsetWidth;
      th.height = th.elements.canvas.offsetHeight;

      th.ctx.width = th.width;
      th.ctx.height = th.height;

      th.elements.canvas.width = th.width*th.ratio;
      th.elements.canvas.height = th.height*th.ratio;

      th.ctx.scale(th.ratio, th.ratio);

      th.ctx.fillStyle = "#FFFFFF";
      th.ctx.strokeStyle = "#FFFFFF";

    });




  }
};

var videoId = document.getElementById('mobile-video');

if(videoId != undefined){
  document.addEventListener("DOMContentLoaded", mobileVideoPlayer.init(videoId));
}














