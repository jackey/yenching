(function ($) {
	// preload image
	var images = ["/public/misc/images/arrow_academy2.png"];

	$.each(images, function (index) {
		var img = new Image();
		img.src = images[index];
	});
})(jQuery);

(function ($) {

	// 垂直导航条重新设置大小 位置.
	function resize_slide_btns() {
		var s2_slide_btns = $(".s2:not(.s3):not(.s4)").find(".slider-btns");
		var s3_slide_btns = $(".s3 .slider-btns");

		s2_slide_btns.css("display", "none");
		s3_slide_btns.css("display", "none");

		return function () {
	        s2_slide_btns.each(function () {
	        	var self = $(this);
	        	var con = $(this).siblings("ul.slides");
	        	var width = con.height();
	        	self.width(con.height());

	        	self.css({
	        		"margin-left": -( parseInt(width)/2 - 69),
	        	});
	        	s2_slide_btns.css("display", "block");
	        });

	        s3_slide_btns.each(function () {
	        	var self = $(this);
	        	var con = $(this).siblings("ul.slides");
	        	var width = con.height();
	        	self.width(con.height());

	        	self.css({
	        		"margin-left": -( parseInt(width)/2 + 55),
	        	});

	        	s3_slide_btns.css("display", "block");
	        });
		}
	}

	function resize_right_slide_btns() {
		var width = $(".slides").height();
		var right_slide_btns = $(".slides .slide-item .btn-c");
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

		return function () {};
	}

	$(function () {
		// 垂直导航条重新设置大小 位置.
		var resize_slide_btns_fn = resize_slide_btns();
	    $(window).load(function () {
	    	resize_slide_btns_fn();
	    	resize_right_slide_btns();
	    });
	    $(window).resize(function () {
	    	resize_slide_btns_fn();
	    	resize_right_slide_btns();
	    });

	   	// 垂直导航条点击事件处理
	   	$(".s2:not(.s3):not(.s4)").find(".slider-btns li.btn").click(function () {
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
	   				width: next_r_c.width(),
	   				height: next_r_c.width(),
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
		   				height: "auto",
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
	   				height: crt_r_c.width(),
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
		   				height: "auto",
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
	$(function () {
		$('.btn-c .btn-item').click(function () {
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
   				height: next_r_c.width(),
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
   				height: crt_r_c.width(),
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