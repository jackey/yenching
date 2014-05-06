if (typeof console === "undefined" || typeof console.log === "undefined") {
  console = {};
  console.log = function() {};
}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

;(function ($) {
    // Namespace all events.
    var eventNamespace = 'waitForImages';

    // CSS properties which contain references to images.
    $.waitForImages = {
        hasImageProperties: ['backgroundImage', 'listStyleImage', 'borderImage', 'borderCornerImage', 'cursor']
    };

    // Custom selector to find `img` elements that have a valid `src` attribute and have not already loaded.
    $.expr[':'].uncached = function (obj) {
        // Ensure we are dealing with an `img` element with a valid `src` attribute.
        if (!$(obj).is('img[src!=""]')) {
            return false;
        }

        // Firefox's `complete` property will always be `true` even if the image has not been downloaded.
        // Doing it this way works in Firefox.
        var img = new Image();
        img.src = obj.src;
        return !img.complete;
    };

    $.fn.waitForImages = function (finishedCallback, eachCallback, waitForAll) {

        var allImgsLength = 0;
        var allImgsLoaded = 0;

        // Handle options object.
        if ($.isPlainObject(arguments[0])) {
            waitForAll = arguments[0].waitForAll;
            eachCallback = arguments[0].each;
      // This must be last as arguments[0]
      // is aliased with finishedCallback.
            finishedCallback = arguments[0].finished;
        }

        // Handle missing callbacks.
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;

        // Convert waitForAll to Boolean
        waitForAll = !! waitForAll;

        // Ensure callbacks are functions.
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }

        return this.each(function () {
            // Build a list of all imgs, dependent on what images will be considered.
            var obj = $(this);
            var allImgs = [];
            // CSS properties which may contain an image.
            var hasImgProperties = $.waitForImages.hasImageProperties || [];
            // To match `url()` references.
            // Spec: http://www.w3.org/TR/CSS2/syndata.html#value-def-uri
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

            if (waitForAll) {

                // Get all elements (including the original), as any one of them could have a background image.
                obj.find('*').addBack().each(function () {
                    var element = $(this);

                    // If an `img` element, add it. But keep iterating in case it has a background image too.
                    if (element.is('img:uncached')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }

                    $.each(hasImgProperties, function (i, property) {
                        var propertyValue = element.css(property);
                        var match;

                        // If it doesn't contain this property, skip.
                        if (!propertyValue) {
                            return true;
                        }

                        // Get all url() of this element.
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });
                });
            } else {
                // For images only, the task is simpler.
                obj.find('img:uncached')
                    .each(function () {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }

            allImgsLength = allImgs.length;
            allImgsLoaded = 0;

            // If no images found, don't bother.
            if (allImgsLength === 0) {
                finishedCallback.call(obj[0]);
            }

            $.each(allImgs, function (i, img) {

                var image = new Image();

                // Handle the image loading and error with the same callback.
                $(image).on('load.' + eventNamespace + ' error.' + eventNamespace, function (event) {
                    allImgsLoaded++;

                    // If an error occurred with loading the image, set the third argument accordingly.
                    eachCallback.call(img.element, allImgsLoaded, allImgsLength, event.type == 'load');

                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        return false;
                    }

                });

                image.src = img.src;
            });
        });
    };
}(jQuery));

// Generated by CoffeeScript 1.6.1
(function() {

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "slidesjs";
    defaults = {
      width: 940,
      height: 528,
      start: 1,
      navigation: {
        active: true,
        effect: "fade"
      },
      pagination: {
        active: true,
        effect: "fade"
      },
      play: {
        active: false,
        effect: "fade",
        interval: 5000,
        auto: false,
        swap: true,
        pauseOnHover: false,
        restartDelay: 2500
      },
      effect: {
        slide: {
          speed: 500
        },
        fade: {
          speed: 300 * 3,
          crossfade: true
        }
      },
      callback: {
        loaded: function() {},
        start: function() {},
        complete: function() {}
      }
    };
    Plugin = (function() {

      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
      }

      return Plugin;

    })();
    Plugin.prototype.init = function() {
      var $element, nextButton, pagination, playButton, prevButton, stopButton,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      $.data(this, "animating", false);
      $.data(this, "total", $element.children().not(".slidesjs-navigation", $element).length);
      $.data(this, "current", this.options.start - 1);
      $.data(this, "vendorPrefix", this._getVendorPrefix());
      if (typeof TouchEvent !== "undefined") {
        $.data(this, "touch", true);
        this.options.effect.slide.speed = this.options.effect.slide.speed / 2;
      }
      $element.css({
        overflow: "hidden"
      });
      $element.slidesContainer = $element.children().not(".slidesjs-navigation", $element).wrapAll("<div class='slidesjs-container'>", $element).parent().css({
        overflow: "hidden",
        position: "relative"
      });
      $(".slidesjs-container", $element).wrapInner("<div class='slidesjs-control'>", $element).children();
      $(".slidesjs-control", $element).css({
        position: "relative",
        left: 0
      });
      $(".slidesjs-control", $element).children().addClass("slidesjs-slide").css({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 0,
        display: "none",
        // webkitBackfaceVisibility: "hidden"
      });
      $.each($(".slidesjs-control", $element).children(), function(i) {
        var $slide;
        $slide = $(this);
        return $slide.attr("slidesjs-index", i);
      });
      if (this.data.touch) {
        $(".slidesjs-control", $element).on("touchstart", function(e) {
          return _this._touchstart(e);
        });
        $(".slidesjs-control", $element).on("touchmove", function(e) {
          return _this._touchmove(e);
        });
        $(".slidesjs-control", $element).on("touchend", function(e) {
          return _this._touchend(e);
        });
      }
      $element.fadeIn(0);
      this.update();
      if (this.data.touch) {
        this._setuptouch();
      }
      $(".slidesjs-control", $element).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0, function() {
        return $(this).css({
          zIndex: 10
        });
      });
      if (this.options.navigation.active) {
        prevButton = $("<a>", {
          "class": "slidesjs-previous slidesjs-navigation",
          href: "#",
          title: "Previous",
          text: "Previous"
        }).appendTo($element);
        nextButton = $("<a>", {
          "class": "slidesjs-next slidesjs-navigation",
          href: "#",
          title: "Next",
          text: "Next"
        }).appendTo($element);
      }
      $(".slidesjs-next", $element).click(function(e) {
        e.preventDefault();
        _this.stop(true);
        return _this.next(_this.options.navigation.effect);
      });
      $(".slidesjs-previous", $element).click(function(e) {
        e.preventDefault();
        _this.stop(true);
        return _this.previous(_this.options.navigation.effect);
      });
      if (this.options.play.active) {
        playButton = $("<a>", {
          "class": "slidesjs-play slidesjs-navigation",
          href: "#",
          title: "Play",
          text: "Play"
        }).appendTo($element);
        stopButton = $("<a>", {
          "class": "slidesjs-stop slidesjs-navigation",
          href: "#",
          title: "Stop",
          text: "Stop"
        }).appendTo($element);
        playButton.click(function(e) {
          e.preventDefault();
          return _this.play(true);
        });
        stopButton.click(function(e) {
          e.preventDefault();
          return _this.stop(true);
        });
        if (this.options.play.swap) {
          stopButton.css({
            display: "none"
          });
        }
      }
      if (this.options.pagination.active) {
        pagination = $("<ul>", {
          "class": "slidesjs-pagination"
        }).appendTo($element);
        $.each(new Array(this.data.total), function(i) {
          var paginationItem, paginationLink;
          paginationItem = $("<li>", {
            "class": "slidesjs-pagination-item"
          }).appendTo(pagination);
          paginationLink = $("<a>", {
            href: "#",
            "data-slidesjs-item": i,
            html: i + 1
          }).appendTo(paginationItem);
          return paginationLink.click(function(e) {
            e.preventDefault();
            _this.stop(true);
            return _this.goto(($(e.currentTarget).attr("data-slidesjs-item") * 1) + 1);
          });
        });
      }
      $(window).bind("resize", function() {
        return _this.update();
      });
      this._setActive();
      if (this.options.play.auto) {
        this.play();
      }
      return this.options.callback.loaded(this.options.start);
    };
    Plugin.prototype._setActive = function(number) {
      var $element, current;
      $element = $(this.element);
      this.data = $.data(this);
      current = number > -1 ? number : this.data.current;
      $(".active", $element).removeClass("active");
      return $(".slidesjs-pagination li:eq(" + current + ") a", $element).addClass("active");
    };
    Plugin.prototype.update = function() {
      var $element, height, width;
      $element = $(this.element);
      this.data = $.data(this);
      $(".slidesjs-control", $element).children(":not(:eq(" + this.data.current + "))").css({
        display: "none",
        left: 0,
        zIndex: 0
      });
      width = $element.width();
      height = (this.options.height / this.options.width) * width;
      this.options.width = width;
      this.options.height = height;
      return $(".slidesjs-control, .slidesjs-container", $element).css({
        width: width,
        height: height
      });
    };
    Plugin.prototype.next = function(effect) {
      var $element;
      $element = $(this.element);
      this.data = $.data(this);
      $.data(this, "direction", "next");
      if (effect === void 0) {
        effect = this.options.navigation.effect;
      }
      if (effect === "fade") {
        return this._fade();
      } else {
        return this._slide();
      }
    };
    Plugin.prototype.previous = function(effect) {
      var $element;
      $element = $(this.element);
      this.data = $.data(this);
      $.data(this, "direction", "previous");
      if (effect === void 0) {
        effect = this.options.navigation.effect;
      }
      if (effect === "fade") {
        return this._fade();
      } else {
        return this._slide();
      }
    };
    Plugin.prototype.goto = function(number) {
      var $element, effect;
      $element = $(this.element);
      this.data = $.data(this);
      if (effect === void 0) {
        effect = this.options.pagination.effect;
      }
      if (number > this.data.total) {
        number = this.data.total;
      } else if (number < 1) {
        number = 1;
      }
      if (typeof number === "number") {
        if (effect === "fade") {
          return this._fade(number);
        } else {
          return this._slide(number);
        }
      } else if (typeof number === "string") {
        if (number === "first") {
          if (effect === "fade") {
            return this._fade(0);
          } else {
            return this._slide(0);
          }
        } else if (number === "last") {
          if (effect === "fade") {
            return this._fade(this.data.total);
          } else {
            return this._slide(this.data.total);
          }
        }
      }
    };
    Plugin.prototype._setuptouch = function() {
      var $element, next, previous, slidesControl;
      $element = $(this.element);
      this.data = $.data(this);
      slidesControl = $(".slidesjs-control", $element);
      next = this.data.current + 1;
      previous = this.data.current - 1;
      if (previous < 0) {
        previous = this.data.total - 1;
      }
      if (next > this.data.total - 1) {
        next = 0;
      }
      slidesControl.children(":eq(" + next + ")").css({
        display: "block",
        left: this.options.width
      });
      return slidesControl.children(":eq(" + previous + ")").css({
        display: "block",
        left: -this.options.width
      });
    };
    Plugin.prototype._touchstart = function(e) {
      var $element, touches;
      $element = $(this.element);
      this.data = $.data(this);
      touches = e.originalEvent.touches[0];
      this._setuptouch();
      $.data(this, "touchtimer", Number(new Date()));
      $.data(this, "touchstartx", touches.pageX);
      $.data(this, "touchstarty", touches.pageY);
      return e.stopPropagation();
    };
    Plugin.prototype._touchend = function(e) {
      var $element, duration, prefix, slidesControl, timing, touches, transform,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      touches = e.originalEvent.touches[0];
      slidesControl = $(".slidesjs-control", $element);
      if (slidesControl.position().left > this.options.width * 0.5 || slidesControl.position().left > this.options.width * 0.1 && (Number(new Date()) - this.data.touchtimer < 250)) {
        $.data(this, "direction", "previous");
        this._slide();
      } else if (slidesControl.position().left < -(this.options.width * 0.5) || slidesControl.position().left < -(this.options.width * 0.1) && (Number(new Date()) - this.data.touchtimer < 250)) {
        $.data(this, "direction", "next");
        this._slide();
      } else {
        prefix = this.data.vendorPrefix;
        transform = prefix + "Transform";
        duration = prefix + "TransitionDuration";
        timing = prefix + "TransitionTimingFunction";
        slidesControl[0].style[transform] = "translateX(0px)";
        slidesControl[0].style[duration] = this.options.effect.slide.speed * 0.85 + "ms";
      }
      slidesControl.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
        prefix = _this.data.vendorPrefix;
        transform = prefix + "Transform";
        duration = prefix + "TransitionDuration";
        timing = prefix + "TransitionTimingFunction";
        slidesControl[0].style[transform] = "";
        slidesControl[0].style[duration] = "";
        return slidesControl[0].style[timing] = "";
      });
      return e.stopPropagation();
    };
    Plugin.prototype._touchmove = function(e) {
      var $element, prefix, slidesControl, touches, transform;
      $element = $(this.element);
      this.data = $.data(this);
      touches = e.originalEvent.touches[0];
      prefix = this.data.vendorPrefix;
      slidesControl = $(".slidesjs-control", $element);
      transform = prefix + "Transform";
      $.data(this, "scrolling", Math.abs(touches.pageX - this.data.touchstartx) < Math.abs(touches.pageY - this.data.touchstarty));
      if (!this.data.animating && !this.data.scrolling) {
        e.preventDefault();
        this._setuptouch();
        slidesControl[0].style[transform] = "translateX(" + (touches.pageX - this.data.touchstartx) + "px)";
      }
      return e.stopPropagation();
    };
    Plugin.prototype.play = function(next) {
      var $element, currentSlide, slidesContainer,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      if (!this.data.playInterval) {
        if (next) {
          currentSlide = this.data.current;
          this.data.direction = "next";
          if (this.options.play.effect === "fade") {
            this._fade();
          } else {
            this._slide();
          }
        }
        $.data(this, "playInterval", setInterval((function() {
          currentSlide = _this.data.current;
          _this.data.direction = "next";
          if (_this.options.play.effect === "fade") {
            return _this._fade();
          } else {
            return _this._slide();
          }
        }), this.options.play.interval));
        slidesContainer = $(".slidesjs-container", $element);
        if (this.options.play.pauseOnHover) {
          slidesContainer.unbind();
          slidesContainer.bind("mouseenter", function() {
            return _this.stop();
          });
          slidesContainer.bind("mouseleave", function() {
            if (_this.options.play.restartDelay) {
              return $.data(_this, "restartDelay", setTimeout((function() {
                return _this.play(true);
              }), _this.options.play.restartDelay));
            } else {
              return _this.play();
            }
          });
        }
        $.data(this, "playing", true);
        $(".slidesjs-play", $element).addClass("slidesjs-playing");
        if (this.options.play.swap) {
          $(".slidesjs-play", $element).hide();
          return $(".slidesjs-stop", $element).show();
        }
      }
    };
    Plugin.prototype.stop = function(clicked) {
      var $element;
      $element = $(this.element);
      this.data = $.data(this);
      clearInterval(this.data.playInterval);
      if (this.options.play.pauseOnHover && clicked) {
        $(".slidesjs-container", $element).unbind();
      }
      $.data(this, "playInterval", null);
      $.data(this, "playing", false);
      $(".slidesjs-play", $element).removeClass("slidesjs-playing");
      if (this.options.play.swap) {
        $(".slidesjs-stop", $element).hide();
        return $(".slidesjs-play", $element).show();
      }
    };
    Plugin.prototype._slide = function(number) {
      var $element, currentSlide, direction, duration, next, prefix, slidesControl, timing, transform, value,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      if (!this.data.animating && number !== this.data.current + 1) {
        $.data(this, "animating", true);
        currentSlide = this.data.current;
        if (number > -1) {
          number = number - 1;
          value = number > currentSlide ? 1 : -1;
          direction = number > currentSlide ? -this.options.width : this.options.width;
          next = number;
        } else {
          value = this.data.direction === "next" ? 1 : -1;
          direction = this.data.direction === "next" ? -this.options.width : this.options.width;
          next = currentSlide + value;
        }
        if (next === -1) {
          next = this.data.total - 1;
        }
        if (next === this.data.total) {
          next = 0;
        }
        this._setActive(next);
        slidesControl = $(".slidesjs-control", $element);
        if (number > -1) {
          slidesControl.children(":not(:eq(" + currentSlide + "))").css({
            display: "none",
            left: 0,
            zIndex: 0
          });
        }
        slidesControl.children(":eq(" + next + ")").css({
          display: "block",
          left: value * this.options.width,
          zIndex: 10
        });
        this.options.callback.start(currentSlide + 1);
        if (this.data.vendorPrefix) {
          prefix = this.data.vendorPrefix;
          transform = prefix + "Transform";
          duration = prefix + "TransitionDuration";
          timing = prefix + "TransitionTimingFunction";
          slidesControl[0].style[transform] = "translateX(" + direction + "px)";
          slidesControl[0].style[duration] = this.options.effect.slide.speed + "ms";
          return slidesControl.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
            slidesControl[0].style[transform] = "";
            slidesControl[0].style[duration] = "";
            slidesControl.children(":eq(" + next + ")").css({
              left: 0
            });
            slidesControl.children(":eq(" + currentSlide + ")").css({
              display: "none",
              left: 0,
              zIndex: 0
            });
            $.data(_this, "current", next);
            $.data(_this, "animating", false);
            slidesControl.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");
            slidesControl.children(":not(:eq(" + next + "))").css({
              display: "none",
              left: 0,
              zIndex: 0
            });
            if (_this.data.touch) {
              _this._setuptouch();
            }
            return _this.options.callback.complete(next + 1);
          });
        } else {
          return slidesControl.stop().animate({
            left: direction
          }, this.options.effect.slide.speed, (function() {
            slidesControl.css({
              left: 0
            });
            slidesControl.children(":eq(" + next + ")").css({
              left: 0
            });
            return slidesControl.children(":eq(" + currentSlide + ")").css({
              display: "none",
              left: 0,
              zIndex: 0
            }, $.data(_this, "current", next), $.data(_this, "animating", false), _this.options.callback.complete(next + 1));
          }));
        }
      }
    };
    Plugin.prototype._fade = function(number) {
      var $element, currentSlide, next, slidesControl, value,
        _this = this;
      $element = $(this.element);
      this.data = $.data(this);
      if (!this.data.animating && number !== this.data.current + 1) {
        $.data(this, "animating", true);
        currentSlide = this.data.current;
        if (number) {
          number = number - 1;
          value = number > currentSlide ? 1 : -1;
          next = number;
        } else {
          value = this.data.direction === "next" ? 1 : -1;
          next = currentSlide + value;
        }
        if (next === -1) {
          next = this.data.total - 1;
        }
        if (next === this.data.total) {
          next = 0;
        }
        this._setActive(next);
        slidesControl = $(".slidesjs-control", $element);
        slidesControl.children(":eq(" + next + ")").css({
          display: "none",
          left: 0,
          zIndex: 10
        });
        this.options.callback.start(currentSlide + 1);
        if (this.options.effect.fade.crossfade) {
          slidesControl.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed);
          return slidesControl.children(":eq(" + next + ")").stop().fadeIn(this.options.effect.fade.speed, (function() {
            slidesControl.children(":eq(" + next + ")").css({
              zIndex: 0
            });
            $.data(_this, "animating", false);
            $.data(_this, "current", next);
            return _this.options.callback.complete(next + 1);
          }));
        } else {
          return slidesControl.children(":eq(" + currentSlide + ")").stop().fadeOut(this.options.effect.fade.speed, (function() {
            slidesControl.children(":eq(" + next + ")").stop().fadeIn(_this.options.effect.fade.speed, (function() {
              return slidesControl.children(":eq(" + next + ")").css({
                zIndex: 10
              });
            }));
            $.data(_this, "animating", false);
            $.data(_this, "current", next);
            return _this.options.callback.complete(next + 1);
          }));
        }
      }
    };
    Plugin.prototype._getVendorPrefix = function() {
      var body, i, style, transition, vendor;
      body = document.body || document.documentElement;
      style = body.style;
      transition = "transition";
      vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
      transition = transition.charAt(0).toUpperCase() + transition.substr(1);
      i = 0;
      while (i < vendor.length) {
        if (typeof style[vendor[i] + transition] === "string") {
          return vendor[i];
        }
        i++;
      }
      return false;
    };
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

}).call(this);

(function ($) {
	// preload image;
	var images = ["/public/misc/images/arrow_academy2.png"];

	$.each(images, function (index) {
		var img = new Image();
		img.src = images[index];
	});
})(jQuery);

(function ($) {

            return;
	// 垂直导航条重新设置大小 位置.
	function resize_slide_btns() {
		var s2_slide_btns = $(".s2:not(.s3):not(.s4)").find(".slider-btns");
		var s3_slide_btns = $(".s3").find(".slider-btns");

		s2_slide_btns.css("display", "none");
		s3_slide_btns.css("display", "none");

		return function () {
	        s2_slide_btns.each(function () {
	        	var self = $(this);
	        	var con = $(this).siblings("ul.slides");
	        	var width = con.height();
	        	self.width(con.height());

	        	self.css({
	        		"margin-left": - ( parseInt(width)/2 - 69),
	        	});
	        	s2_slide_btns.css("display", "block");
	        });

	        s3_slide_btns.each(function () {
	        	var self = $(this);
	        	var con = $(this).siblings("ul.slides");
	        	var width = con.height();
	        	self.width(con.height());

	        	self.css({
	        		"margin-left": - ( parseInt(width)/2 - 69),
	        	});
	        	s3_slide_btns.css("display", "block");
	        });
		}
	}

	function resize_right_slide_btns() {
		var width = $(".s2:not(.s3) .slides").height();
		var right_slide_btns = $(".s2:not(.s3) .slides .slide-item .btn-c");
		right_slide_btns.each(function () {
			var self = $(this);
			var con = $(self).parent(".slide-item");

			var height = 41 * $(".btn-item", self).size();

			var margin_top = - parseInt(height) / 2;
			var right = -(parseInt(width) / 2 - parseInt(height) / 2);
			self.css({
				top: "50%",
				"margin-top": margin_top,
				right: right,
				height: height,
				width: width
			});
		});

		var width = $(".s3 .slides").height();
		var right_slide_btns = $(".s3 .slides .slide-item .btn-c");
		right_slide_btns.each(function () {
			var self = $(this);
			var con = $(self).parent(".slide-item");

			var height = 41 * $(".btn-item", self).size();

			var margin_top = - parseInt(height) / 2;
			var right = -(parseInt(width) / 2 - parseInt(height) / 2);
			self.css({
				top: "50%",
				"margin-top": margin_top,
				left: - parseInt(width) / 2 + parseInt(height /2) ,
				height: height,
				width: width
			});
		});

		return function () {};
	}

	$(function () {
		// 垂直导航条重新设置大小 位置.
            var resize_slide_btns_fn = resize_slide_btns();
	    $(window).load(function () {
                return;
	    	resize_slide_btns_fn();
	    	resize_right_slide_btns();
	    });
	    $(window).resize(function () {
                return;
	    	resize_slide_btns_fn();
	    	resize_right_slide_btns();
	    });

	    // s3 垂直导航条点击事件处理
	    $("div.s3").find(".slider-btns li.btn").click(function () {
	   		var self = $(this);
	   		console.log("btn clicked: " + self.attr("class"));
	   		var cls = self.attr("class");
	   		try {
	   			var index = cls[cls.search(/[0-9]/)];
	   		}
	   		catch (e) {
	   			index = false;
	   		}
	   		if (index != false) {

	   			// Show next slide
	   			var con = self.parent().parent().siblings("ul.slides");
	   			var crtShowingSlide = $(".slide-item:not(.hideme)", con);
	   			var nextShowSlide = $(".slide-item-"+ index, con);
	   			if (!nextShowSlide.size() || !crtShowingSlide.size()) {
	   				console.log("CAN SELECT nextShowSlide or crtShowingSlide");
	   				console.log("nextShowSlide size: " + nextShowSlide.size());
	   				console.log("crtShowingSlide size: " + crtShowingSlide.size());
	   				return;
	   			}

	   			if (nextShowSlide.get(0) == crtShowingSlide.get(0)) {
	   				console.log("SELECTED SAME SLIDE !!!");
	   				return;
	   			}

	   			crtShowingSlide.css({
	   				"z-index": 1
	   			});
	   			nextShowSlide.css({
	   				"z-index": 2
	   			});
	   			console.log("crtShowingSlide size : " + crtShowingSlide.size());
	   			console.log("nextShowSlide size : " + nextShowSlide.size());
	   			console.log("SET NEXT SHOW SLIDE z-index");

	   			// Right image
	   			var r = $(".l", nextShowSlide);
	   			var img = $(".l img", nextShowSlide);

	   			if ($(".l", con).is(":animated") || $(".l img", con).is(":animated")) {
	   				console.log("MIDDLE MOVING");
	   				return;
	   			}

				var bgcolor = self.css("background-color");
				con.css({"background": bgcolor});

	   			// Hide me and behind me btn
	   			self.addClass("hideme");
	   			$(self).prevAll().addClass("hideme");
	   			console.log("HIDE SELF btn " + self.attr("class"));
	   			console.log("HIDE SELF prevAll btns: " + $(self).prevAll().size());

	   			nextShowSlide
	   				.css({
	   					position: "absolute",
	   					top: "0px",
	   				})
	   				.removeClass("hideme");
	   			console.log("REMOVE hideme on nextShowSlide: " + nextShowSlide.attr("class"));

	   			r.css({
	   				position: "relative",
	   				overflow: "hidden",
	   				"width": img.width(),
	   				"height": img.height()
	   			});
	   			console.log("image: "  + img.width());
	   			console.log("height: " + img.height());
	   			console.log("SET r.css()");
	   			img.css({
	   				position: "absolute",
	   				left: "100%",
	   				width: "100%"
	   			});
	   			console.log("SET img.css()");

	   			var time = img.attr("time");
	   			if (!time) {
	   				img.attr("time", 1);
	   				time = 1;
	   			}
	   			img.animate({
	   				left: "0px"
	   			}, 1000 * 1, function () {
	   				crtShowingSlide.addClass("hideme");
	   				console.log("ADD hideme class on crtShowingSlide:" + crtShowingSlide.attr("class"));
	   				nextShowSlide.css({
	   					position: "static",
	   					top: "auto"
	   				});

	   				// right image
	   				r.css({
	   					position: "relative",
	   					overflow: "inherit",
	   					width: "50%",
	   					height: "auto"
	   				});

	   				img.css({
	   					position: "static",
	   					left:"auto"
	   				});
	   			});

	   			// Left content
	   			var next_r = $(".r", nextShowSlide);
	   			var next_r_c = $(".r .r-c", nextShowSlide);
	   			next_r.css({
	   				position: "relative",
	   				width: next_r_c.width() - 1,
	   				overflow: "inherit"
	   			});
	   			next_r_c.css({
	   				position: "absolute",
	   				right: "100%",
	   				width: next_r.width(),
	   				top: "50%"
	   			});
	   			next_r_c.css("margin-top", - parseInt(next_r_c.innerHeight()) / 2);
	   			console.log("margin-top: "+ parseInt(next_r_c.innerHeight()) / 2);
	   			console.log("margin-top: " + next_r_c.css("margin-top"));
	   			console.log("next_r_c height: " + next_r_c.innerHeight());

	   			next_r_c.animate({
	   				right: "0px"
	   			}, 1000 * 1, function () {
		   			next_r.css({
		   				position: "static",
		   				width: "50%",
		   				overflow: "inherit"
		   			});
		   			next_r_c.css({
		   				position: "static",
		   				width: "100%",
		   				right: "auto"
		   			});
	   			});

	   			var crt_r = $(".r", crtShowingSlide);
	   			var crt_r_c = $(".r .r-c", crtShowingSlide);
	   			crt_r.css({
	   				position: "relative",
	   				width: crt_r_c.width() - 1,
	   				overflow: "hidden"
	   			});
	   			crt_r_c.css({
	   				position: "absolute",
	   				left: "0",
	   				width: crt_r.width(),
	   				top: "50%"
	   			});
	   			crt_r_c.css("margin-top", -(parseInt(crt_r_c.innerHeight()) / 2) );
	   			crt_r_c.animate({
	   				left: "100%"
	   			}, 1000* 1, function () {
		   			crt_r.css({
		   				position: "static",
		   				width: "50%",
		   				left: "auto",
		   				overflow: "inherit"
		   			});
		   			crt_r_c.css({
		   				position: "static",
		   				left: "auto",
		   				width: "100%",
		   			});
	   			});
	   		}
	    });
	
		// s3 left bar button 
		$('.s3 .btn-c .btn-item').click(function () {
			console.log("====================================");
			var self = $(this);
			var bgcolor = self.css("background-color");
			console.log(bgcolor);
			console.log(self);
			var con = self.parent().parent().parent();
			console.log(con);
			console.log(con.size());

   			if ($(".l", con).is(":animated") || $(".l img", con).is(":animated")) {
   				console.log("MOVING");
   				return;
   			}

			var crtShowingSlide = self.parent().parent();

	   		var cls = self.attr("class");
	   		try {
	   			var index = parseInt(cls[cls.search(/[0-9]/)]);
	   		}
	   		catch (e) {
	   			index = false;
	   		}

	   		console.log("SLIDE INDEX: " + index);
	   		var nextShowSlide = $(".slide-item-" + index, con);
	   		console.log("nextShowSlide count: " + nextShowSlide.size());

	   		var total = $(".slider-btns .btns .btn", con.parent()).size();
	   		for (var i = index; i < parseInt(total); i++) {
	   			$(".slider-btns .btns .btn-" + (i + 1), con.parent()).removeClass("hideme");
	   		}

	   		nextShowSlide.css({
	   			"z-index":2
	   		});
	   		crtShowingSlide.css({
	   			"z-index": 1
	   		});

   			// Left image
   			var l = $(".l", nextShowSlide);
   			var img = $(".l img", nextShowSlide);

	   		nextShowSlide.removeClass("hideme");
   			nextShowSlide
   				.css({
   					position: "absolute",
   					width: "100%",
   					top: "0px",
   				})
   				.removeClass("hideme");

   			l.css({
   				position: "relative",
   				overflow: "hidden",
   				"width": img.width(),
   				"height": img.height()
   			});
   			img.css({
   				position: "absolute",
   				right: "100%"
   			});
   			
   			img.animate({
   				right: "0px"
   			}, 1000 * 1, function () {
   				crtShowingSlide.addClass("hideme");
   				nextShowSlide.css({
   					position: "static",
   					top: "auto"
   				});

   				// Left image
   				l.css({
   					position: "static",
   					overflow: "inherit",
   					width: "50%",
   					height: "auto"
   				});
   				img.css({
   					position: "static",
   					left:"auto"
   				});
   			});

   			// Right content
   			var next_r = $(".r", nextShowSlide);
   			var next_r_c = $(".r .r-c", nextShowSlide);
   			next_r.css({
   				position: "relative",
   				width: next_r_c.width() - 1,
   				overflow: "hidden"
   			});
   			next_r_c.css({
   				position: "absolute",
   				left: "100%",
   				width: next_r.width(),
   				top: "50%"
   			});
   			next_r_c.css("margin-top", -(next_r_c.innerHeight() / 2));

   			next_r_c.animate({
   				left: "0px"
   			}, 1000 * 1, function () {
	   			next_r.css({
	   				position: "static",
	   				width: "50%",
	   				overflow: "inherit"
	   			});
	   			next_r_c.css({
	   				position: "static",
	   				right: "auto",
	   				left: "auto"
	   			});
   			});

   			var crt_r = $(".r", crtShowingSlide);
   			var crt_r_c = $(".r .r-c", crtShowingSlide);
   			crt_r.css({
   				position: "relative",
   				width: crt_r_c.width() - 1,
   				overflow: "hidden"
   			});
   			crt_r_c.css({
   				position: "absolute",
   				right: "0",
   				width: crt_r.width(),
   				top: "50%"
   			});

	   		crt_r_c.css("margin-top", -(parseInt(crt_r_c.innerHeight()) / 2) );
   			crt_r_c.animate({
   				right: "100%"
   			}, 1000* 1, function () {
	   			crt_r.css({
	   				position: "static",
	   				width: "50%",
	   				overflow: "inherit"
	   			});
	   			crt_r_c.css({
	   				position: "static",
	   				left: "auto",
	   				width: "100%",
	   			});
   			});
		});

	   	// s2 垂直导航条点击事件处理
	   	$(".s2:not(.s4):not(.s3)").find(".slider-btns li.btn").click(function () {
                    return;
	   		var self = $(this);
	   		var cls = self.attr("class");
	   		try {
	   			var index = cls[cls.search(/[0-9]/)];
	   		}
	   		catch (e) {
	   			index = false;
	   		}
	   		if (index != false) {
	   			$("~ li.btn", self).addClass("hideme");

	   			// Show next slide
	   			var con = self.parent().parent().siblings("ul.slides");
	   			var crtShowingSlide = $(".slide-item:not(.hideme)", con);
	   			var nextShowSlide = $(".slide-item-"+ index, con);

	   			// Left image
	   			var l = $(".l", nextShowSlide);
	   			var img = $(".l img", nextShowSlide);

	   			if ($(".l", con).is(":animated") || $(".l img", con).is(":animated")) {
	   				return;
	   			}

				var bgcolor = self.css("background-color");
				con.css({"background": bgcolor});

	   			// Hide me and behind me btn
	   			self.addClass("hideme");
	   			nextShowSlide
	   				.css({
	   					position: "absolute",
	   					width: "100%",
	   					top: "0px",
	   				})
	   				.removeClass("hideme");

	   			l.css({
	   				position: "relative",
	   				overflow: "hidden",
	   				"width": img.width(),
	   				"height": img.height()
	   			});
	   			img.css({
	   				position: "absolute",
	   				left: "100%"
	   			});

	   			img.animate({
	   				left: "0px"
	   			}, 1000 * 1, function () {
	   				crtShowingSlide.addClass("hideme");
	   				nextShowSlide.css({
	   					position: "static",
	   					top: "auto"
	   				});

	   				// Left image
	   				l.css({
	   					position: "static",
	   					overflow: "auto",
	   					width: "50%",
	   					height: "auto"
	   				});
	   				img.css({
	   					position: "static",
	   					left:"auto"
	   				});
	   			});

	   			// Right content
	   			var next_r = $(".r", nextShowSlide);
	   			var next_r_c = $(".r .r-c", nextShowSlide);
	   			next_r.css({
	   				position: "relative",
	   				width: next_r_c.width() -1,
	   				height: next_r.height(),
	   				overflow: "hidden"
	   			});
	   			next_r_c.css({
	   				position: "absolute",
	   				right: "100%",
	   				width: next_r.width(),
	   			});

	   			next_r_c.animate({
	   				right: "0px"
	   			}, 1000 * 1, function () {
		   			next_r.css({
		   				position: "static",
		   				width: "35%",
		   				overflow: "auto"
		   			});
		   			next_r_c.css({
		   				position: "static",
		   				right: "auto"
		   			});
	   			});

	   			var crt_r = $(".r", crtShowingSlide);
	   			var crt_r_c = $(".r .r-c", crtShowingSlide);
	   			crt_r.css({
	   				position: "relative",
	   				width: crt_r_c.width(),
	   				overflow: "hidden"
	   			});
	   			crt_r_c.css({
	   				position: "absolute",
	   				left: "0",
	   				width: crt_r.width(),
	   			});
	   			crt_r_c.animate({
	   				left: "100%"
	   			}, 1000* 1, function () {
		   			crt_r.css({
		   				position: "static",
		   				width: "auto",
		   				overflow: "auto"
		   			});
		   			crt_r_c.css({
		   				position: "static",
		   				left: "auto"
		   			});
	   			});
	   		}
	   	});
	});
})(jQuery);



(function ($) {
            return;
	$(function () {
		$('.s2:not(.s3) .btn-c .btn-item').click(function () {
			console.log("====================================");
			var self = $(this);
			var bgcolor = self.css("background-color");
			console.log(bgcolor);
			console.log(self);
			var con = self.parent().parent().parent();

   			if ($(".l", con).is(":animated") || $(".l img", con).is(":animated")) {
   				return;
   			}

			var crtShowingSlide = self.parent().parent();

	   		var cls = self.attr("class");
	   		try {
	   			var index = parseInt(cls[cls.search(/[0-9]/)]);
	   		}
	   		catch (e) {
	   			index = false;
	   		}

	   		console.log("SLIDE INDEX: " + index);
	   		var nextShowSlide = $(".slide-item-" + index, con);
	   		console.log("nextShowSlide count: " + nextShowSlide.size());
	   		
	   		var right_c = $("~ .btn-item", self).size();
	   		console.log("right_c: " + right_c);

	   		var total = $(".slider-btns .btns .btn", con.parent()).size();
	   		console.log("total: " + total);
	   		for (var i = 0; i < parseInt(total)- parseInt(right_c); i++) {
	   			console.log(i);
	   			console.log(".slider-btns .btns .btn-" + (i + 1));
	   			console.log($(".slider-btns .btns .btn-" + (i + 1), con.parent()).size());
	   			$(".slider-btns .btns .btn-" + (i + 1), con.parent()).removeClass("hideme");
	   		}

   			// Left image
   			var l = $(".l", nextShowSlide);
   			var img = $(".l img", nextShowSlide);

	   		nextShowSlide.removeClass("hideme");
   			nextShowSlide
   				.css({
   					position: "absolute",
   					width: "100%",
   					top: "0px",
   				})
   				.removeClass("hideme");

   			l.css({
   				position: "relative",
   				overflow: "hidden",
   				"width": img.width(),
   				"height": img.height()
   			});
   			img.css({
   				position: "absolute",
   				right: "100%"
   			});
   			
   			img.animate({
   				right: "0px"
   			}, 1000 * 1, function () {
   				crtShowingSlide.addClass("hideme");
   				nextShowSlide.css({
   					position: "static",
   					top: "auto"
   				});

   				// Left image
   				l.css({
   					position: "static",
   					overflow: "auto",
   					width: "50%",
   					height: "auto"
   				});
   				img.css({
   					position: "static",
   					left:"auto"
   				});
   			});

   			// Right content
   			var next_r = $(".r", nextShowSlide);
   			var next_r_c = $(".r .r-c", nextShowSlide);
   			next_r.css({
   				position: "relative",
   				width: next_r_c.width(),
   				height: next_r_c.height(),
   				overflow: "hidden"
   			});
   			next_r_c.css({
   				position: "absolute",
   				left: "100%",
   				width: next_r.width(),
   			});

   			next_r_c.animate({
   				left: "0px"
   			}, 1000 * 1, function () {
	   			next_r.css({
	   				position: "static",
	   				width: "35%",
	   				height: "auto",
	   				overflow: "auto"
	   			});
	   			next_r_c.css({
	   				position: "static",
	   				right: "auto",
	   				left: "auto"
	   			});
   			});

   			var crt_r = $(".r", crtShowingSlide);
   			var crt_r_c = $(".r .r-c", crtShowingSlide);
   			crt_r.css({
   				position: "relative",
   				width: crt_r_c.width(),
   				height: crt_r_c.height(),
   				overflow: "hidden"
   			});
   			crt_r_c.css({
   				position: "absolute",
   				right: "0",
   				width: crt_r.width(),
   			});
   			crt_r_c.animate({
   				right: "100%"
   			}, 1000* 1, function () {
	   			crt_r.css({
	   				position: "static",
	   				width: "auto",
	   				height: "auto",
	   				overflow: "auto"
	   			});
	   			crt_r_c.css({
	   				position: "static",
	   				left: "auto",
	   				right: "auto"
	   			});
   			});
		});
	});
})(jQuery);

// Menu Hover
(function ($) {
	$(function () {
		$(".left-bar-menu li").hover(function () {
			var self = $(this);
			var con = $(this).parent();
			var menu_txt = self.html();
			if (menu_txt.trim() == "") {
				return;
			}
	   		try {
	   			var cls = self.attr("class");
	   			var index = parseInt(cls[cls.search(/[0-9]/)]);
	   		}
	   		catch (e) {
	   			index = false;
	   		}
	   		
			var menu = $(".hover-menu", con);
			if (!menu.size()) {
				var menu = $("<div class='hover-menu'></div>");
				con.append(menu);
				menu.hide();
			}
			menu.html("");
			menu.append(menu_txt);
			menu.append("<div class='arrow'></div>");
			con.append(menu);
			menu.show();
			menu.css({top: index * 50 + 50 - menu.outerHeight() });
		}, function () {
			var self = $(this);
			var con = $(this).parent();
			var menu_txt = self.html();
			var menu = $(".hover-menu", con);
			menu.hide();
		});
	});
})(jQuery);

// Slide plugin
(function ($) {
	function getIndexFromClass(cls) {
		try {
			var crt_index = parseInt(cls[cls.search(/[0-9]/)]);
		}
		catch (e) {
			crt_index = false;
		}
		return crt_index;
	}
        $.getIndexFromClass = getIndexFromClass;
	$.fn.slideToPre = function () {
		var slide = $(this);
		crt_index = getIndexFromClass(slide.attr("class"));
		if (crt_index <= 1) {
			return;
		}
		var pre_slides = slide.prevAll();
		if (pre_slides.size() <= 0) {
			return;
		}

		var pre_slide = $(pre_slides.get(0));
		slide.addClass("hideme");
		pre_slide.removeClass("hideme");
	};

	$.fn.slideToNext = function () {
		var slide = $(this);
		crt_index = getIndexFromClass(slide.attr("class"));
		var next_slides = $("~ div", slide);
		if (next_slides.size() <= 0) {
			return;
		}
		var next_slide = $(next_slides.get(0));
		slide.addClass("hideme");
		next_slide.removeClass("hideme");
	};
})(jQuery);

// Slide in signle slide  page
(function ($) {
//	$(window).load(function () {
//		$(".s3 .home .slides .r").each(function () {
//			$(this).css({
//				height: $(this).parent().height()
//			});
//		});
//	});
	// slide item 0
	$(function () {
		$(".s3 .slide-item-0 .next-icon .p-icon").click(function () {
			var self = $(this);
	   		var content_slides = $("> .r-c-slide", self.parent().siblings(".c"));
	   		var crt_slide = $("> :not(.hideme)", content_slides.parent());
	   		crt_slide.slideToPre();

	   		var btn = $(".s3 .slide-item-0 .next-icon .next_txt .btn");
	   		btn.html(btn.attr("data-nt"));
	   		$(".s3 .slide-item-0 .next-icon .n-icon").addClass("n-icon-on");
	   		self.removeClass("p-icon-on");
		});

		$(".s3 .slide-item-0 .next-icon .n-icon").click(function () {
			var self = $(this);
	   		var content_slides = $("> .r-c-slide", self.parent().siblings(".c"));

	   		var crt_slide = $("> :not(.hideme)", content_slides.parent());
	   		crt_slide.slideToNext();

	   		var btn = $(".s3 .slide-item-0 .next-icon .next_txt .btn");
	   		btn.html(btn.attr("data-pt"));
	   		$(".s3 .slide-item-0 .next-icon .p-icon").addClass("p-icon-on");
	   		self.removeClass("n-icon-on");
		});

		// $(".s3 .slide-item-0 .next-icon .next_txt .btn").click(function () {
		// 	var self = $(this);

		// 	if (self.text().trim() == "NEXT") {
		// 		$(".s3 .slide-item-0 .next-icon .n-icon").trigger("click");
		// 	}
		// 	else {
		// 		$(".s3 .slide-item-0 .next-icon .p-icon").trigger("click");
		// 	}
		// });
	});

	$(function () {
		$(".s3 .slide-item-3 .next-icon .p-icon").click(function () {
			var self = $(this);
	   		var content_slides = $("> .r-c-slide", self.parent().parent().siblings(".c"));
	   		var crt_slide = $("> :not(.hideme)", content_slides.parent());
	   		crt_slide.slideToPre();

	   		var btn = $(".s3 .slide-item-3 .next-icon .next_txt .btn");
	   		btn.html(btn.attr("data-nt"));
	   		$(".s3 .slide-item-3 .next-icon .n-icon").addClass("n-icon-on");
	   		self.removeClass("p-icon-on");
		});

		$(".s3 .slide-item-3 .next-icon .n-icon").click(function () {
			var self = $(this);
	   		var content_slides = $("> .r-c-slide", self.parent().parent().siblings(".c"));

	   		var crt_slide = $("> :not(.hideme)", content_slides.parent());
	   		crt_slide.slideToNext();

	   		var btn = $(".s3 .slide-item-3 .next-icon .next_txt .btn");
	   		btn.html(btn.attr("data-pt"));
	   		$(".s3 .slide-item-3 .next-icon .p-icon").addClass("p-icon-on");
	   		self.removeClass("n-icon-on");
		});

		// $(".s3 .slide-item-3 .next-icon .next_txt .btn").click(function () {
		// 	var self = $(this);
		// 	if (self.text().trim() == self.attr("data-nt")) {
		// 		$(".s3 .slide-item-3 .next-icon .n-icon").trigger("click");
		// 	}
		// 	else {
		// 		console.log("SLIDE TO PREVIOUS");
		// 		$(".s3 .slide-item-3 .next-icon .p-icon").trigger("click");
		// 	}
		// });
	});
})(jQuery);

// hash scroll
(function ($) {
	$(function () {
		$(".body .left-bar .left-bar-menu .m-item").click(function () {
			var self = $(this);
			var hash_dist = $("a", self).attr("href").trim();
			hash_dist = hash_dist.substr(1);
			var section = $(hash_dist);
		});
	});
})(jQuery);

// Image scroll
(function ($) {
	$(window).load(function () {
		$(".slideshow .slideshow-con").slidesjs({
			navigation: {
				active: false,
			},
	        effect: {
	        	slide: {
	          		speed: 500
	        	},
	        }
		});
	});
})(jQuery);

(function ($) {
	$.moving_start = function (con) {
		con.addClass("moving");
	}
	$.moving_is_moving = function (con){
		return con.hasClass("moving");
	}
	$.moving_finished = function (con) {
		con.removeClass("moving");
	}
})(jQuery);

// News block 
(function ($) {
	$.loadNews = function (type, cb) {
		cb || (cb = function (){ } );
		type || (type = "");
		if (typeof type == "object" ){
			var page = type["page"];
			var news_id = type["news_id"];
			type = type["type"];
		}
		console.log("NEWS LOAD WITH " + type);
		$.ajax({
			url: "/api/news",
			data: {type: type, page: page, news_id: news_id},
			dataType: "json",
			success: function (data) {
				if (data["error"]) {
					cb(null, data["error"]);
				}
				else {
					cb(data["data"]);
				}
			}
		});
	};
	$.loadNextNews = function (news_id, cb) {
		cb || (cb = function () {});
		news_id || (news_id = 1);
		$.ajax({
			url: "/api/nextnews",
			data: {news_id: news_id},
			dataType: "json",
			success: function (data) {
				if (data["error"]) {
					cb(null, data["error"]);
				}
				else {
					cb(data["data"]);
				}
			}
		});
	};

	$.loadPreNews = function (news_id, cb) {
		cb || (cb = function () {});
		news_id || (news_id = 1);
		$.ajax({
			url: "/api/prenews",
			data: {news_id: news_id},
			dataType: "json",
			success: function (data) {
				if (data["error"]) {
					cb(null, data["error"]);
				}
				else {
					cb(data["data"]);
				}
			}
		});
	};

	$(function () {
		var con = $(".news-block");
		var news_content = $(".news-list", con);
		var news_list_tp = $("#template-news-list").html();
		var news_item_tp = $('#template-news-item').html();
		var news_date_tp = $("#template-news-date").html();
		Mustache.parse(news_list_tp);
		Mustache.parse(news_item_tp);
		Mustache.parse(news_date_tp);
		var moving_seconds = 1000 * 2;
		function moving_start(con) {
			con.addClass("moving");
		}
		function moving_is_moving(con){
			return con.hasClass("moving");
		}
		function moving_finished(con) {
			con.removeClass("moving");
		}
		var render_news = function () {
			var newslist = this.newslist;
			var c = "";
			var index = 1;
			for (var key in newslist) {
				var date = key;
				c += Mustache.render(news_date_tp, {date: key });
				for (var i =0; i < newslist[key].length; i++) {
					var id = index + i;
					var thumbnail = newslist[key][i]["images"]["thumbnail"];
					var news_id = newslist[key][i]["news_id"];
					index += i;
					c += Mustache.render(news_item_tp, {id: id, thumbnail: thumbnail, news_id: news_id});
				}
			}
			return c;
		};

		// Filter;
		$(".filters .filter a", con).click(function () {
			var self = $(this);
			self.parent().siblings().removeClass("active");
			self.parent().addClass("active");
			var news_type = self.attr("data-type");
			$.loadNews(news_type, function (news) {
				console.log("NEWS LOADED");
				console.log(news);
				console.log("BEGIN RENDER NEWS");

				var html = Mustache.render(news_list_tp, {newslist: news, newsrender: render_news});
				news_content.html(html);
				console.log("RELOAD NEWS AND PUT NEW  HTML CONTENT" + html);
			});
		});

		// Next page;
		$(".pager .next", con).click(function () {
			var self = $(this);
			if (moving_is_moving(con)) {
				return;
			}
			moving_start(con);
			console.log("NEXT PAGE =====");
			var type = $(".filters .filter.active a", con).attr("data-type");
			console.log("NEWS TYPE: " + type);
			var page_el = $("#crt-page", con);
			var page = parseInt(page_el.val()) + 1;
			$.loadNews({type: type, page: page}, function (news) {
				console.log("LOAD NEWS WITH TYPE: "+ type + " and page: " + page);
				console.log(news);
				if (Object.prototype.toString.apply(news) == "[object Array]" && news.length <= 0) {
					moving_finished(con);
					return ;
				}
				var html = Mustache.render(news_list_tp, {newslist: news, newsrender: render_news});
				var o_html = news_content.html();
				o_html = "<div class='old-content clearfix'>"+o_html+"</div>";
				var n_html = "<div class='new-content clearfix'>"+html+"</div>";
				news_content.html(o_html + n_html);
				console.log("RELOAD NEWS AND PUT NEW  HTML CONTENT" + html);

				$(".new-content", news_content).css({
					width: news_content.width()
				}).animate({
					left: "0%",
				}, moving_seconds, function () {
					console.log("YES. I finished move");
					news_content.html(html);
					page_el.val(page);
					moving_finished(con);
				});

				$(".old-content", news_content).fadeOut(moving_seconds);
			});
		});

		// Pre page;
		$(".pager .pre", con).click(function () {
			var self = $(this);

			var type = $(".filters .filter.active a", con).attr("data-type");
			var page_el = $("#crt-page", con);
			var page = parseInt(page_el.val()) - 1;
			if (page <= 0) {
				console.log("PAGE IS < 0 :" + page);
				return;
			}
			if (moving_is_moving(con)) {
				return;
			}
			moving_start(con);
			$.loadNews({type: type, page: page}, function (news) {
				console.log("LOAD NEWS WITH TYPE: "+ type + " and page: " + page);
				console.log(news);
				if (Object.prototype.toString.apply(news) == "[object Array]" && news.length <= 0) {
					moving_finished(con);
					return ;
				}
				var html = Mustache.render(news_list_tp, {newslist: news, newsrender: render_news});
				var o_html = news_content.html();
				o_html = "<div class='old-content clearfix'>"+o_html+"</div>";
				var n_html = "<div class='new-content clearfix'>"+html+"</div>";
				news_content.html(o_html + n_html);
				console.log("RELOAD NEWS AND PUT NEW  HTML CONTENT" + html);

				$(".new-content", news_content).css({
					width: news_content.width(),
					left: "auto",
					right: "100%",
				}).animate({
					right: "0%",
				}, moving_seconds, function () {
					console.log("YES. I finished move");
					news_content.html(html);
					page_el.val(page);
					moving_finished(con);
				});
				$(".old-content", news_content).fadeOut(moving_seconds);
			});
		});
	
		// First page;
		$(".pager .home", con).click(function () {
			console.log("HOME CLICKED");
			var self = $(this);

			var type = $(".filters .filter.active a", con).attr("data-type");
			var page_el = $("#crt-page", con);
			var page = 1;
			if (page >= page_el.val()) {
				console.log("NO NEED TO MOVE TO HOME");
				return;
			}
			if (moving_is_moving(con)) {
				return;
			}
			moving_start(con);
			$.loadNews({type: type, page: page}, function (news) {
				console.log("LOAD NEWS WITH TYPE: "+ type + " and page: " + page);
				console.log(news);
				if (Object.prototype.toString.apply(news) == "[object Array]" && news.length <= 0) {
					moving_finished(con);
					return ;
				}
				var html = Mustache.render(news_list_tp, {newslist: news, newsrender: render_news});
				var o_html = news_content.html();
				o_html = "<div class='old-content clearfix'>"+o_html+"</div>";
				var n_html = "<div class='new-content clearfix'>"+html+"</div>";
				news_content.html(o_html + n_html);
				console.log("RELOAD NEWS AND PUT NEW  HTML CONTENT" + html);

				$(".new-content", news_content).css({
					width: news_content.width(),
					left: "auto",
					right: "100%",
				}).animate({
					right: "0%",
				}, moving_seconds, function () {
					console.log("YES. I finished move");
					news_content.html(html);
					page_el.val(page);
					moving_finished(con);
				});
				$(".old-content", news_content).fadeOut(moving_seconds);
			});
		});

		// Last page;
		$(".pager .last", con).click(function () {
			console.log("HOME CLICKED");
			var self = $(this);
			var type = $(".filters .filter.active a", con).attr("data-type");
			var page_el = $("#crt-page", con);
			var page = page_el.val();
			if (moving_is_moving(con)) {
				return;
			}
			moving_start(con);
			self.addClass("moving");
			$.loadNews({type: type, page: page}, function (news) {
				console.log("LOAD NEWS WITH TYPE: "+ type + " and page: " + page);
				console.log(news);
				if (Object.prototype.toString.apply(news) == "[object Array]" && news.length <= 0) {
					moving_finished(con);
					return ;
				}
				var html = Mustache.render(news_list_tp, {newslist: news, newsrender: render_news});
				var o_html = news_content.html();
				o_html = "<div class='old-content clearfix'>"+o_html+"</div>";
				var n_html = "<div class='new-content clearfix'>"+html+"</div>";
				news_content.html(o_html + n_html);
				console.log("RELOAD NEWS AND PUT NEW  HTML CONTENT" + html);

				$(".new-content", news_content).css({
					width: news_content.width(),
				}).animate({
					left: "0%",
				}, moving_seconds, function () {
					console.log("YES. I finished move");
					news_content.html(html);
					page_el.val(page);
					moving_finished(con);
				});
				$(".old-content", news_content).fadeOut(moving_seconds);
			});
		});

		// News detail
	});
})(jQuery);

// News detail image slide ;
(function ($) {

	var moving_seconds = 1000 * 1;
	$.fn.customslidesjs = function (options) {
		var container = $(this);
		console.log("container size:" + container.size());
		var index = 1;
		container.children().each(function () {
			var el = $(this);
			el.addClass("hideme");
			el.data("data-index", index);
			index += 1;
		});
		var total = index - 1;
		$(container.children().get(0)).removeClass("hideme");

		return (function() {
			var next = function () {
				var crt = $(container.children(":not(.hideme)").get(0));
				var crt_index = crt.data("data-index");
				if (crt_index >= total) {
					return;
				}
				if ($.moving_is_moving(container)) {
					return;
				}
				$.moving_start(container);
				var next = $(container.children().get(crt_index));
				console.log("NEXT IMAGE IS : ");
				console.log(next);
				console.log("HIDE CURRENT IMAGE ");

				next.removeClass("hideme");
				next.css({
					position: "absolute",
					right: "100%",
					top: "0px"
				});
				next.animate({
					right: "0%"
				}, moving_seconds, function () {
					next.css({
						position: "static"
					});
					crt.addClass("hideme");
					$.moving_finished(container);
				});
			};
			var pre = function() {
				var crt = $(container.children(":not(.hideme)").get(0));
				var crt_index = crt.data("data-index");
				var crt = container.children(":not(.hideme)");
				var crt_index = crt.data("data-index");
				if (crt_index <= 1 ) {
					return;
				}
				if ($.moving_is_moving(container)) {
					return;
				}
				$.moving_start(container);
				var next = $(container.children().get(crt_index - 2));
				console.log("NEXT IMAGE IS : ");
				console.log(next);
				console.log("HIDE CURRENT IMAGE ");

				next.removeClass("hideme");
				next.css({
					position: "absolute",
					left: "100%",
					top: "0px"
				});
				next.animate({
					left: "0%"
				}, moving_seconds, function () {
					next.css({
						position: "static"
					});
					crt.addClass("hideme");
					$.moving_finished(container);
				});
			}

			return {
				next: next,
				pre: pre
			};
		})(container);
	}

	$(function () {
		var speed = 1000 * 1;
		$(".s5 .news-block").delegate(".news-detail-right .left", "click", function () {
			var slider = $(".news-block .news-detail-right .slides .slides-wrapper").data("slider");
			slider.pre();
		});
		$(".s5 .news-block").delegate(".news-detail-right .right", "click", function () {
			var slider = $(".news-block .news-detail-right .slides .slides-wrapper").data("slider");
			slider.next();
		});


		// news detail back
		$(".s5 .news-block").delegate(".pager-links .back", "click", function () {
			var container = $(".s5 .news-block");
			var details_dom = $(".news-detail", container);
			var parent_height = $(".news-block-list-con", container).height();
			details_dom.animate({
				left: "100%"
			}, speed, function () {
				container.animate({
					height: parent_height
				}, speed);
			});
      // setTimeout(function () {
      //   $(".news-block-list-con", container).show();
      // }, 500);
		});

		// news detail "X" clicked
		$(".s5 .news-block").delegate(".right .close-btn", "click", function (event) {
			event.stopPropagation();
			var container = $(".s5 .news-block");
			var details_dom = $(".news-detail", container);
			var parent_height = $(".news-block-list-con", container).height();
			details_dom.animate({
				left: "100%"
			}, speed, function () {
				container.animate({
					height: parent_height
				}, speed);
			});

      // setTimeout(function () {
      //   $(".news-block-list-con", container).show();
      // }, 500);
		});

		// news detail panel --> next news
		var detail_news_tp = $("#template-news-detail").html();
		Mustache.parse(detail_news_tp);
		$(".s5 .news-block").delegate(".pager-links .links .pre", "click", function () {
			console.log("CICKED NEXT NEWS BUTTON");
			var container = $(".s5 .news-block");
			var details_dom_old = $(".news-detail", container);
      container.css("width", $(".news-block-list-con", container).width());
			details_dom_old.addClass("old");
			var news_id = details_dom_old.attr("data-newsid");
			if (news_id) {
				$.loadNextNews(news_id, function (news) {
          if (!news || (Object.prototype.toString.apply( news) == "[object Array]" && !news.length)) {
            console.log("EMPTY NEWS ");
            return;
          }
					news["slider"] = news["images"]["slider"];
					news["thumbnail"] = news["images"]["thumbnail"];
					var details_html = Mustache.render(detail_news_tp, news);
          $(details_html).waitForImages(function () {
            container.prepend(details_html);
            var details_dom = $(".news-detail:not(.old)", container);
            details_dom.attr("data-newsid", news["news_id"]);
            details_dom.css({
              "display": "none",
              "z-index": 2
            });
            details_dom_old.css({
              "z-index": 1
            });
            $(".img-full:eq(0)", details_dom).load(function () {
              details_dom.css("display", "block");
              var width = details_dom.width();
              var height = details_dom.height();
              details_dom.css({
                width: width ,
                height: height -5,
                position: "absolute"
              });
              details_dom.parent().animate({
                height: height
              },speed, function () {
                console.log("WIDTH: " + width + " HEIGHT: " + height);
                details_dom.animate({
                  left: "0%"
                }, speed, function () {
                  details_dom.css({
                    // width: 'auto'
                  });
                  details_dom_old.remove();
                });
              });
            });

            // append event ;
            var slider_el = $(".news-block .news-detail:not(.old) .news-detail-right .slides .slides-wrapper");
            var slider = slider_el.customslidesjs();
            slider_el.data("slider", slider);
          });
				});
			}
		});

		// news detail panel --> pre news
		$(".s5 .news-block").delegate(".pager-links .links .next", "click", function () {
			console.log("CICKED NEXT NEWS BUTTON");
			var container = $(".s5 .news-block");
			var details_dom_old = $(".news-detail", container);
      container.css("width", $(".news-block-list-con", container).width());
			details_dom_old.addClass("old");
			var news_id = details_dom_old.attr("data-newsid");
			if (news_id) {
				$.loadPreNews(news_id, function (news) {
					if (!news || (Object.prototype.toString.apply( news) == "[object Array]" && !news.length)) {
						console.log("EMPTY NEWS ");
						return;
					}
					news["slider"] = news["images"]["slider"];
					news["thumbnail"] = news["images"]["thumbnail"];
					var details_html = Mustache.render(detail_news_tp, news);
          $(details_html).waitForImages(function () {
            container.prepend(details_html);
            var details_dom = $(".news-detail:not(.old)", container);
            details_dom.attr("data-newsid", news["news_id"]);
            details_dom.css({
              "display": "none",
              "z-index": 2
            });
            details_dom_old.css({
              "z-index": 1
            });
            $(".img-full:eq(0)", details_dom).load(function () {
              details_dom.css("display", "block");
              var width = details_dom.width();
              var height = details_dom.height();
              details_dom.css({
                width: width ,
                height: height -5,
                position: "absolute",
                right: "100%",
                left: "auto"
              });
              details_dom.parent().animate({
                height: height
              },speed, function () {
                console.log("WIDTH: " + width + " HEIGHT: " + height);
                details_dom.animate({
                  right: "0%"
                }, speed, function () {
                  details_dom.css({
                    // width: 'auto'
                  });
                  details_dom_old.remove();
                });
              });
            });

            // append event ;
            var slider_el = $(".news-block .news-detail:not(.old) .news-detail-right .slides .slides-wrapper");
            var slider = slider_el.customslidesjs();
            slider_el.data("slider", slider);
          });
				});
			}
		});
	});
})(jQuery);

// News item click ----> news details ;
(function ($) {
	$(function () {
		var detail_news_tp = $("#template-news-detail").html();
		var container = $(".s5 .news-block");
    container.css("width", $(".news-block-list-con", container).width());
		Mustache.parse(detail_news_tp);
		var speed = 1000 * 1;
		$(".s5 .news-block").delegate(".news-block li.news-item", "click", function () {
			var self = $(this);
			var news_id = self.attr("data-newsid");
			if (news_id) {
				$.loadNews({news_id: news_id}, function (news) {
          if (!news || (Object.prototype.toString.apply( news) == "[object Array]" && !news.length)) {
            console.log("EMPTY NEWS ");
            return;
          }
					news["slider"] = news["images"]["slider"];
					news["thumbnail"] = news["images"]["thumbnail"];
					var details_html = Mustache.render(detail_news_tp, news);
					// remove before;
					$(".news-detail", container).remove();
          $(details_html).waitForImages(function () {
            // do something when all images loaded
              container.prepend(details_html);
              var details_dom = $(".news-detail", container);
              // details_dom.css({
              //  width: "1px",
              //  height: "1px"
              // });
              details_dom.attr("data-newsid", news["news_id"]);
              details_dom.css("display", "none");
              $(".img-full:eq(0)", details_dom).load(function () {
                details_dom.css("display", "block");
                var width = details_dom.width();
                var height = details_dom.height();
                details_dom.css({
                  width: width ,
                  height: height -4,
                  position: "absolute"
                });
                details_dom.parent().animate({
                  height: height
                },speed, function () {
                  console.log("WIDTH: " + width + " HEIGHT: " + height);
                  details_dom.animate({
                    left: "0%"
                  }, speed, function () {
                    details_dom.css({
                      // width: 'auto'
                    });
                    //$(".news-block-list-con", container).hide();
                  });
                });
              });

              // append event ;
              var slider_el = $(".news-block .news-detail:not(.old) .news-detail-right .slides .slides-wrapper");
              var slider = slider_el.customslidesjs();
              slider_el.data("slider", slider);
          }, function (loaded, count, success) {
            if ($(details_html).hasClass("watiforimages-loaded")) {
              return;
            }
            else {

            }
          });
				});
			}
		});
	});
})(jQuery);

// scroll
(function ($) {
	$(function () {
		$(window).resize(function () {
			$(window).stellar({
				positionProperty: "position"
			});
		});
		$(window).stellar({
			positionProperty: "position"
		});

		var mywindow = $(window);
		var leftmenucon = $(".left-bar-menu");
		var htmlbody = $('html,body');
		mywindow.scroll(function () {
		    if (mywindow.scrollTop() == 0) {
		    	$("li.m-item", leftmenucon).removeClass("current");
				$('li[data-section="1"]', leftmenucon).addClass("current");
				$("#home").addClass("scrolling").siblings().removeClass("scrolling");
		    }
		    var max_scroll =  $(document).height() - $(window).height();
		    if (max_scroll <= mywindow.scrollTop() + 800) {
		    	$("li.m-item", leftmenucon).removeClass("current");
		    	$('li[data-section="5"]', leftmenucon).addClass("current");
                        $("#news").trigger("scrolling");
		    }
		});

		$("body > .maincontent > .s").waypoint(function (direction) {
			var data_id = $(this).attr("data-section");
			if (data_id == 2) {
          $(this).siblings().removeClass("scrolling");
          var self = $(this);
          $.resizeAcademyContentTop(function () {
                  self.addClass("scrolling");
                  $.waypoints('refresh');
          });
			}
			else {
        $(this).addClass("scrolling").siblings().removeClass("scrolling");
			}
                        
        $(this).trigger("scrolling");

			$("li.m-item", leftmenucon).removeClass("current");
			$('li[data-section="'+data_id+'"]', leftmenucon).addClass("current");

		    var max_scroll =  $(document).height() - $(window).height();

		    if (max_scroll <= mywindow.scrollTop() + 800) {
		    	$("li.m-item", leftmenucon).removeClass("current");
		    	$('li[data-section="5"]', leftmenucon).addClass("current");
                        $("#news").addClass("scrolling").siblings().removeClass("scrolling");
                        $("#news").trigger("scrolling");
		    }
		});

		function goToByScroll(dataslide) {
		    htmlbody.animate({
		        scrollTop: dataslide.offset().top
		    }, 2000, 'easeInOutExpo');
		}

		$("li.m-item", leftmenucon).click(function () {
			var data_id = $(this).attr("data-section");
			goToByScroll($("body > .maincontent > .s[data-section='"+data_id+"']"));
			$("li.m-item", leftmenucon).removeClass("current");
			$('li[data-section="'+data_id+'"]', leftmenucon).addClass("current");
		});
	});
})(jQuery);

(function ($) {
	$.resizeAcademyContentTop = function(cb) {
		// var container = $("#academy");
		// $("#academy .content-top .header").animate({
		// 	"padding-top": "10px",
		// 	"padding-bottom": "38px"
		// }, 800, function () {
			
		// });

		// $("#academy .home .video").animate({
		// 	"margin": 0,
		// 	"height": 0
		// }, 800, function () {
		// 	$(this).hide();
		// });

		// $("#academy .header h1").animate({
		// 	"font-size": "17px"
		// });
		// $("#academy  .home .c").animate({
		// 	"font-size": "13px"
		// }, 800);

		// $("#academy .home .star").animate({
		// 	"width": 0,
		// 	"height": 0
		// }, 800);


		// setTimeout(function () {
		// 	$("#academy .content-top .header").removeAttr("style");
		// 	$("#academy .home .video").removeAttr("style");
		// 	$("#academy .header h1").removeAttr("style");
		// 	$("#academy  .home .c").removeAttr("style");
		// 	$("#academy  .home .star").removeAttr("style");
		// 	cb();
		// }, 1000 * 1);
	}

	$.resizeProgramContentTop = function (cb) {
		// var container = $("#program");
		// $(".content-top .header", container).animate({
		// 	"padding-top": "10px",
		// 	"margin-bottom": "38px"
		// }, 800, function () {
			
		// });

		// $(".header h1", container).animate({
		// 	"font-size": "17px"
		// });
		// $(".home .c", container).animate({
		// 	"font-size": "13px"
		// }, 800);


		// setTimeout(function () {
		// 		$(".content-top .header", container).removeAttr("style");
		// 		$(".header h1", container).removeAttr("style");
		// 		$(".home .c", container).removeAttr("style");
		// cb();
		// }, 1000 * 1);
	}
} )(jQuery);

(function ($) {
    $(function () {
        $("#home .home-nav .lan-bar").toggle(function () {
            $(this).siblings(".more-info").removeClass("hideme");
        }, function () {
            $(this).siblings(".more-info").addClass("hideme");
        });
    });
	$(function () {

	});
})(jQuery);

(function ($) {
    $.computeContentWidth = function (num_of_bars, width_of_bars, total_width) {
        var cut_width = num_of_bars * width_of_bars;
        return total_width - cut_width;
    };
    
    $(function () {
      $("#news").on("scrolling", function () {
        var self = $(this);
        if ($.moving_is_moving(self)) {
          return;
        }
        else {
          $.moving_start(self);
        }
        var news_list = $(".news-list li", self);
        var total = news_list.size();
        (function render_img(index) {
          if (index >= total) {
            $.moving_finished(self);
            return;
          }
          else {
            var img = $("> img",$(news_list.get(index)));
            if (img.size() && !img.attr("src")) {
              var image = img.get(0);
              image.src = img.attr("data-src");
              image.onload = function () {
                setTimeout(function () {
                  render_img(index + 1);
                }, 300);
              };
              img.hide().fadeIn("slow");
            }
            else {
              render_img(index + 1);
            }
          }
        })(0);
      });
    });
})(jQuery);

(function ($) {
  $(function () {
    var videoconver = $(".overconver-video");
    var video = videojs("yenching-video-con");
    videoconver.click(function () {
      var videocon = $("#yenching-video-con");
      video.pause();
      videocon.css({
        top: 0,
        bottom: 0,
        left:0,
        right: 0,
        margin: "auto"
      }).animate({
        width: 0,
        height: 0,
      }, 1000 * 1, function () {
        videocon.removeAttr("style");
        videoconver.removeAttr("style");
      });
    });
    video.on("fullscreenchange", function () {
      var videocon = $("#yenching-video-con");
      var videoconver = $(".overconver-video");
      if (video.isFullScreen()) {
        videocon.css({
          "margin-left": 0,
          "margin-top": 0,
          "position": "static"
        });
        videoconver.css("opacity", 1);
      }
      else {
        videocon.removeAttr("style");
        videocon.css("display", 'block');
        videoconver.removeAttr("style");
        videoconver.css("display", "block");
      }
    });
    video.ready(function () {
      var videocon = $("#yenching-video-con");
      var videoconver = $(".overconver-video");
      $("#academy .video img").click(function () {
        videoconver.show();
        var width = videocon.width();
        var height = videocon.height();

        videocon.css({
          width: "0px",
          height: "0px",
          top: 0,
          bottom: 0,
          left:0,
          right: 0,
          margin: "auto"
        });
        videocon.css("display", "block");
        videocon.animate({
          width: width,
          height: height
        }, 1000 * 1, function () {
          videocon.removeAttr("style");
          videocon.css("display", "block");
        });
      });
    });

  });
})(jQuery);




function rotate(angle){
    if (angle >= 0) {
        var rotation = Math.PI * angle / 180;
    } else {
        var rotation = Math.PI * (360+angle) / 180;
    }
    var c = Math.cos(rotation),
    s = Math.sin(rotation);
    var filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+c+",M12="+(-s)+",M21="+s+",M22="+c+",SizingMethod='auto expand')";
    
    console.log(filter);
}

rotate(270);