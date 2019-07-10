;(function($) {
  $.extend($.fn, {
    sliderSwitch: function() {
      var $this = $(this);
      var $ulEl = $this.find('.thumbSliderWrap .number');
      var $liEl = $ulEl.find('.item');
      var activeIndex = 0;
      var activeWidth = 120;
      var mainSlider = $('.mainSliderWrap .list').bxSlider({
        mode: 'fade',
        infiniteLoop: false,
        controls: false,
        pager: false,
        useCss: false
      });

      function moveToPrev() {
        activeIndex = $(activeIndex === 0) ? $liEl.length - 1 : activeIndex - 1;
        $ulEl.finish().animate({'margin-left': activeWidth}, 300, function() {
          $ulEl.prepend($ulEl.find('.item').last().detach()).css({'margin-left': 0 });
        })
        showContents();
      }

      function moveToNext() {
        activeIndex = $(activeIndex === $liEl.length - 1) ? 0 : activeIndex + 1;
        $ulEl.finish().animate({'margin-left' : -activeWidth}, 300, function() {
          $ulEl.append($ulEl.find('.item').first().detach()).css({'margin-left': 0})
        });
        showContents();
      }

      function showContents() {
        var $activeItem = $ulEl.find('[data-index=' + activeIndex + ']');
        $activeItem.addClass('on').siblings().removeClass('on');
        mainSlider.goToSlide(activeIndex);
      }

      function init() {
        var $prevItem = (activeIndex === 0) ? $liEl.eq($liEl.length - 1): $liEl.eq(activeIndex - 1);
        $ulEl.prepend($prevItem.detach());
      }

      $this.find('.controls .prev').on('click', moveToPrev);
      $this.find('.controls .next').on('click', moveToNext);
      $this.find('.thumbSliderWrap a').on('click', function() {
        var $item = $(this).closest('.item');
        activeIndex = $item.attr('data-index');
        showContents();
      });

      init();
    }
  });


  $(document).ready(function() {
    $('.sliderWrap').sliderSwitch();
  });
})(jQuery);