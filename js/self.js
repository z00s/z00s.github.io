/**
 * Created by ZhangSP on 2015/3/15.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $(".post-header .post-title a").hover(
        function(){$(this).css("color","#{{ site.color.primary }}");},
        function(){$(this).css({"color":"#333333"});}
    );
});