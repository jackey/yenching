(function ($) {
    $.resizeAcademySlideBtns = function () {
        var con = $("#academy");
        var slideBtnCon = $(".slider-btns", con);
        var slidesCon = slideBtnCon.siblings(".slides");
        var height = $(slidesCon).height();
        slideBtnCon.css({
            width: height - 1
        });
        var margin_left = -(height / 2  - slideBtnCon.height() / 2);
        slideBtnCon.css({
            "margin-left": margin_left
        });
        slideBtnCon.css("display", "block");
    };
    
    $(window).load(function () {
        $.resizeAcademySlideBtns();
    });
})(jQuery);