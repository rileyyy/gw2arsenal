$(document).ready(function(){
	$("#left_nav li").click(function(){
		$("#left_nav li").removeClass('nav_active');
		$(this).addClass('nav_active');
		//alert($(this).attr('id'));

		//Add selected button id to content
		$("#content").html($(this).attr('id'));
	})
});