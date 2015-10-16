var app = angular.module('myApp', []);

$(document).ready(function(){

	//Test function
	$("#left_nav li").click(function(){
		$("#left_nav li").removeClass('nav_active');
		$(this).addClass('nav_active');
		//alert($(this).attr('id'));

		//Add selected button id to content
		//$("#content").html($(this).attr('id'));
		//$('#content').html($(this).attr('id'));
	});

	//Navigation logic (what happens when a button is clicked)
	$("#wvw_nav").click(function(){
		$.get("https://api.guildwars2.com/v1/wvw/matches.json", function(data, status){
			$('#content').html(JSON.stringify(data, null, "\t"));
		});
	});

	$("#characters_nav").click(function(){
		$.get("https://api.guildwars2.com/v1/colors.json", function(data, status){
			$('#content').html(JSON.stringify(data));
		});
	});
});