(function ($) {

	// 垂直导航条重新设置大小 位置.
	function resize_slide_btns() {
		var s2_slide_btns = $(".s2:not(.s3):not(.s4)").find(".slider-btns");
		var s3_slide_btns = $(".s3 .slider-btns");

		return function () {
	        s2_slide_btns.each(function () {
	        	var self = $(this);
	        	var con = $(this).siblings("ul.slides");
	        	var width = con.height();
	        	self.width(con.height());

	        	self.css({
	        		"margin-left": -( parseInt(width)/2 - 69),
	        	});
	        });

	        s3_slide_btns.each(function () {
	        	var self = $(this);
	        	var con = $(this).siblings("ul.slides");
	        	var width = con.height();
	        	self.width(con.height());

	        	self.css({
	        		"margin-left": -( parseInt(width)/2 + 55),
	        	});
	        });
		}
	}

	$(function () {
		// 垂直导航条重新设置大小 位置.
		var resize_slide_btns_fn = resize_slide_btns();
	    $(window).load(resize_slide_btns_fn);
	    $(window).resize(resize_slide_btns_fn);

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
	   		console.log(index);
	   		if (index != false) {
	   			var slides = self.parent(".btns").parent(".slider-btns").siblings(".slides");
	   			$("li", slides).addClass("hideme");
	   			$(".slide-item-" + index, slides).removeClass("hideme");

	   		}
	   	});

	});
})(jQuery);