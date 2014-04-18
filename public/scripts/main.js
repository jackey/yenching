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
	   			var slides = self.parent(".btns").parent(".slider-btns").siblings(".slides");
	   			$(">li", slides).addClass("hideme");
	   			$(".slide-item-" + index, slides).removeClass("hideme");
	   			// self.siblings("li.btn").removeClass("hideme");
	   			// self.addClass("hideme");
	   		}
	   	});
	});
})(jQuery);