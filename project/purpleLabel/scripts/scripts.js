(function($) {
  $.extend($.fn, {
    sticky: function() {
      var $this = $(this);
      var $menu = $this.find('.nav li');
      var $contents = $this.find('.purpleConts');
      var $doc = $('html, body');
      var time = 500;

      var $navHeight = $menu.outerHeight();

      $menu.on('click', 'a', function(e) {
        e.preventDefault();
        var $target = $(this).parent();  //li
        var idx = $target.index();
        var $purpleCont = $contents.eq(idx); // 1, 2, 3, 4, 5 번째 컨텐츠가 드감
        var $purpleContTop = $purpleCont.offset().top;
        var $offsetTop = $purpleContTop - $navHeight;

        console.log($target, $purpleCont);

        $doc.stop().animate({
          scrollTop: $offsetTop
        }, time);
      })

      $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var visualHeight = $('.purpleVisualWrap').height() + $navHeight;

        $.each($contents, function(idx) {
          $target = $contents.eq(idx);
          $targetTop = $target.offset().top - ($navHeight) - 3;

          if (scrollTop > $targetTop) {
            $menu.removeClass('active');
            $menu.eq(idx).addClass('active');
          }
        })

        if (scrollTop > visualHeight) {
          $('.purpleNavWrap .nav').addClass('fixed');
          $('.nav').css({'background': '#2d004c'});
        } else if (visualHeight > scrollTop) {
          $('.purpleNavWrap .nav').removeClass('fixed');
          $('.nav').css({'background': 'none'});
        }
      });
    },

    purpleSlide: function() {
      return this.each(function() {
        var $slider = $(this);

        var slider = $slider.bxSlider({
          speed: 500,
          responsive: false,
          moveSlide: 1,
          minSlide: 1,
          pager: true,
          controls: true,
          infiniteLoop: true,
          auto: true,
          onSlideAfter: function() {
            slider.startAuto();
          }
        })
      })
    },

    noticeWrap: function() {
      return this.each(function() {
        var $this = $(this);
        var infoBtn = $this.find('.infoBtn');

        infoBtn.on('click', function(e) {
          e.preventDefault();

          var baseSrc = infoBtn.find('img')
          var btnSrc = baseSrc.attr('src').substring(0, baseSrc.attr('src').lastIndexOf('/') + 1);

          $(this).next().slideToggle(500);

          if (infoBtn.hasClass('on')) {
            baseSrc.attr('src', btnSrc + 'btn_noti.png');
          } else  {
            baseSrc.attr('src', btnSrc + 'btn_noti_on.png');
          }
        })
      });
    }
  });

  $('.purpleLabelWrap').sticky();
  $('.purpleTimeCont .sliders').purpleSlide();
  $('.giftSlider').purpleSlide();
  $('.purpleNotice').noticeWrap();
})(jQuery);