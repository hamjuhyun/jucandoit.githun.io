var ebay = ebay || {};

ebay.util = $.extend({
  hasElement: function (el) {
    return ($(el).length > 0);
  }
}, ebay.util || {});

ebay.Event = ebay.Event || {};
ebay.View = ebay.View || {};
ebay.View.main = ebay.View.main || {};

ebay.View.main.slider = function () {
  this.init();
};

ebay.View.main.slider.prototype = {
  _slider: {
    auto: true,
    controls: false,
    pause: 5000,
    pager: false,
    useCSS: false
  },
  _ebaySlider: null,
  init: function () {
    this._assignElements();
    this._assignComponents();
  },
  _assignElements: function () {
    this._welSlideWrap = $('.slide_area');
    this._welSlideList = this._welSlideWrap.find('.slide_list');
    this._welSlideCurIndex = this._welSlideWrap.find('.slide_index');
    this._welSlideTotal = this._welSlideWrap.find('.slide_total');
    this._welSlideBtnArea = this._welSlideWrap.find('.slide_ctrl');
    this._welSlidePrev = this._welSlideWrap.find('.slide_prev');
    this._welSlideNext = this._welSlideWrap.find('.slide_next');
    this._welSlideAutoplay = this._welSlideWrap.find('.slide_auto');
  },
  _assignComponents: function () {
    this._ebaySlider = this._welSlideList.filter(function () {
      return $(this).find('>li').length > 1;
    }).bxSlider($.extend({}, this._slider, {
      onSliderLoad: $.proxy(this._onSliderLoad, this),
      onSlideBefore: $.proxy(this._onSlideBefore, this)
    }));
  },
  _initializeSlder: function () {
    var oSelf = this,
      deferred = $.Deferred(),
      fnTimer = setInterval(function () {
        if (oSelf._ebaySlider) {
          clearInterval(fnTimer);
          deferred.resolve();
        } else {
          deferred.notify();
        }
      }, 200);

    if (this._ebaySlider) {
      clearInterval(fnTimer);
      deferred.resolve();
    }
    return deferred.promise();
  },
  // 이해가 잘 가지 않음 ㅠㅠ 설명이 필요
  _onSliderLoad: function (oSlider, nCurrentIndex) {
    this._initializeSlder().done($.proxy(function () {
      this._bPlay = this._slider.auto;
      this._welSlideBtnArea.show();
      this._attachEventHandlers();
      this._updateSlideTotalCount(this._ebaySlider.getSlideCount());
      this._updateSlideCurrentIndex(this._ebaySlider.getCurrentSlide());
      this._setAriaHiddenSlide($(oSlider.children).eq(nCurrentIndex));
    }, this));
  },
  _onSlideBefore: function (welSlideElement, nOldIndex, nNewIndex) {
    this._updateSlideCurrentIndex(nNewIndex);
    this._setAriaHiddenSlide(welSlideElement);
  },
  _attachEventHandlers: function () {
    this._welSlideWrap.on('mouseenter focusin', $.proxy(this._onMouseenterSliderStop, this));
    this._welSlideWrap.on('mouseleave focusout', $.proxy(this._onMouseleaveSliderStart, this));
    this._welSlidePrev.on('click', $.proxy(this._onClickSlidePrev, this));
    this._welSlideNext.on('click', $.proxy(this._onClickSlideNext, this));
    this._welSlideAutoplay.on('click', $.proxy(this._onClickAutoplay, this));
  },
  _onMouseenterSliderStop: function () {
    if (this._bPlay) {
      this._ebaySlider.stopAuto();
    }
  },
  _onMouseleaveSliderStart: function () {
    if (this._bPlay) {
      this._ebaySlider.startAuto();
    }
  },
  _onClickSlidePrev: function () {
    this._stopAuto();
    this._ebaySlider.goToPrevSlide();
  },
  _onClickSlideNext: function () {
    this._stopAuto();
    this._ebaySlider.goToNextSlide();
  },
  _onClickAutoplay: function (e) {
    var welTarget = $(e.currentTarget);

    if (welTarget.hasClass('on_play')) {
      this._stopAuto();
    } else {
      this._startAuto();
    }
  },
  _stopAuto: function () {
    this._bPlay = false;
    this._ebaySlider.stopAuto();
    this._welSlideAutoplay.removeClass('on_play');
  },
  _startAuto: function () {
    this._bPlay = true;
    this._ebaySlider.startAuto();
    this._welSlideAutoplay.addClass('on_play');
  },
  _updateSlideTotalCount: function (nTotalCount) {
    this._welSlideTotal.text(this._padStartZero(nTotalCount.toString(), 2));
  },
  _updateSlideCurrentIndex: function (nCurrentIdx) {
    this._welSlideCurIndex.text(this._padStartZero((nCurrentIdx + 1).toString(), 2));
  },
  _setAriaHiddenSlide: function (welCurrentSlide) {
    welCurrentSlide.attr('aria-hidden', 'false').siblings().attr('aria-hidden', 'true');
  },
  _padStartZero: function (sText, nTargetLength) {
    return sText.length >= nTargetLength ? sText : this._padStartZero(('0' + sText), nTargetLength);
  }
};

ebay.View.main.lazyload = function () {
  this.init();
}

ebay.View.main.lazyload.prototype = {
  init: function () {
    this._assignElements();
    this._attachEventHandlers();
  },
  _assignElements: function() {
    this._ebayLazyImg = $('.lazy');
    this._window = $(window);
  },
  _attachEventHandlers: function () {
    this._window.on('scroll', $.proxy(this._windowScrollEvent, this)).trigger('scroll');
  },
  _isInViewport: function(elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  _windowScrollEvent: function () {

    this._ebayLazyImg.each(function (i, elem) {
      if (this._isInViewport(elem)) {
        elem.src = elem.dataset.src;
      }
    }.bind(this));
  }
}

ebay.View.main.category = function () {
  this.init();
}

ebay.View.main.category.prototype = {
  _bMain: false,
  _bTotalMenu : false,
  init: function () {
    this._assignElements();
    this._attachEventHandlers();
  },
  _assignElements: function () {
    this._welNavWide = $('.common_nav');
    this._welCtgAll = this._welNavWide.find('.common_nav_area');
    this._welCtgList = this._welCtgAll.find('.common_nav_menu');
    this._welCtgMenu = this._welCtgList.find('.nav_menu');
    this._welCtgTotalLayer = this._welCtgAll.find('.all_total_layer');
    this._welCtgTotalMenu = this._welCtgTotalLayer.find('.all_total_menu');
    this._welCtgToggle = this._welCtgTotalLayer.find('.btn_nav_all');
  },
  _attachEventHandlers: function () {
    this._welCtgMenu.on('mouseenter', $.proxy(this._onMouseenterCategory, this));
    this._welCtgMenu.on('mouseleave', $.proxy(this._onMouseleaveCategory, this));
    this._welCtgMenu.on('click', '.ebaymn_top_link', $.proxy(this._onClickMenu, this));
    this._welCtgToggle.on('click', $.proxy(this._onClickToggle, this));
  },
  _showSubMenu: function (welCurrentMenu) {
    var oSelf = this;
    welCurrentMenu.addClass('on');
    welCurrentMenu.find('.ebaymn_top_link').attr('aria-expanded', 'true');
    welCurrentMenu.find('.nav_sub_area').attr('aria-hidden', 'false');
    welCurrentMenu.find('.nav_sub_area').off('keyup').on('keyup', function (e) {
      if (e.keyCode == 27) {
        oSelf._hideSubMenu(welCurrentMenu);
        welCurrentMenu.find('.ebaymn_top_link').focus();
      }
    });
  },
  _hideSubMenu: function (welCurrentMenu) {
    welCurrentMenu.removeClass('on');
    welCurrentMenu.find('.ebaymn_top_link').attr('aria-expanded', 'false');
    welCurrentMenu.find('.nav_sub_area').attr('aria-hidden', 'true');
  },
  _onMouseenterCategory: function (e) {
    var welTarget = $(e.currentTarget);
    if (this._bTotalMenu) {
      return;
    }
    this._showSubMenu(welTarget);
  },
  _onClickMenu: function (e) {
    e.preventDefault();
    var welTarget = $(e.currentTarget);
    this._showSubMenu(welTarget.parent());
  },
  _onMouseleaveCategory: function (e) {
    var welTarget = $(e.currentTarget);
    this._hideSubMenu(welTarget);
  },
  _onClickToggle: function (e) {
    e.preventDefault();
    var oSelf = this;
    if (this._welCtgTotalMenu.hasClass('on')) {
      this._bTotalMenu = false;
      this._welCtgTotalMenu.removeClass('on').hide();
      this._welCtgTotalLayer.removeClass('on');
      this._welCtgToggle.attr('aria-expanded', 'false');
      this._welCtgTotalMenu.attr('aria-hidden', 'true');
    } else {
      this._bTotalMenu = true;
      this._welCtgTotalMenu.addClass('on').show();
      this._welCtgTotalLayer.addClass('on');
      this._welCtgToggle.attr('aria-expanded', 'true');
      this._welCtgTotalMenu.attr('aria-hidden', 'false');
      this._welCtgTotalLayer.find('.all_menu_wrap').off('keyup').on('keyup', function (e) {
        if (e.keyCode == 27) {
          this._welCtgTotalMenu.hide();
          this._welCtgTotalLayer.find('.btn_nav_all').focus();
          this._welCtgTotalLayer.removeClass('on');
        }
      }.bind(this));
    }
  }
}

$(function () {
  //navigation
  if (ebay.util.hasElement('#skip_gnb')) {
    var mainCategory = new ebay.View.main.category();
  }

  //lazy loading
  if (ebay.util.hasElement('.lazy')) {
    var lazyLoading = new ebay.View.main.lazyload();
  }

  // main slider
  if (ebay.util.hasElement('.slide_area')) {
    var MainTopSlider = new ebay.View.main.slider();
  }

  // category data
   $.getJSON('./ebayMenu.json', function(data) {
    var cateSubArea = $('.nav_sub_area');

    cateSubArea.each(function() {
      var welCateBox = $(this).find('.cateBox');
      var cateId = welCateBox.data('id');

      $("#cateTemplate").tmpl(data[cateId]).appendTo(welCateBox);
    });

    $.each(data, function(i, val) {
      console.log(val);
      $("#allMenuTemplate").tmpl(val).appendTo(".all_menu");
    });
  });
});