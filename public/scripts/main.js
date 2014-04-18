(function ($) {
	function resize_slide_btns() {
		var s2_slide_btns = $(".s2 .slider-btns");
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
		var resize_slide_btns_fn = resize_slide_btns();
	    $(window).load(resize_slide_btns_fn);
	    $(window).resize(resize_slide_btns_fn);
	});
})(jQuery);