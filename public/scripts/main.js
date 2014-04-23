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
	    	resize_slide_btns_fn();
	    	resize_right_slide_btns();
	    });
	    $(window).resize(function () {
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

(function ($) {
	$(window).load(function () {
		$(".s3 .home .slides .r").each(function () {
			$(this).css({
				height: $(this).parent().height()
			});
		});

	});
	$(function () {
		$(".s3 .next-icon .p-icon").click(function () {
			var self = $(this);
	   		var content_slides = $("> .r-c-slide", self.parent().siblings(".c"));
	   		var crt_slide = $("> :not(.hideme)", content_slides.parent());
	   		crt_slide.slideToPre();

	   		$(".s3 .next-icon .next_txt .btn").html("NEXT");
	   		$(".s3 .next-icon .n-icon").addClass("n-icon-on");
	   		self.removeClass("p-icon-on");
		});

		$(".s3 .next-icon .n-icon").click(function () {
			var self = $(this);
	   		var content_slides = $("> .r-c-slide", self.parent().siblings(".c"));

	   		var crt_slide = $("> :not(.hideme)", content_slides.parent());
	   		crt_slide.slideToNext();

	   		$(".s3 .next-icon .next_txt .btn").html("PREVIOUS");
	   		$(".s3 .next-icon .p-icon").addClass("p-icon-on");
	   		self.removeClass("n-icon-on");
		});

		$(".s3 .next-icon .next_txt .btn").click(function () {
			var self = $(this);

			if (self.text().trim() == "NEXT") {
				$(".s3 .next-icon .n-icon").trigger("click");
			}
			else {
				$(".s3 .next-icon .p-icon").trigger("click");
			}
		});
	});
})(jQuery);