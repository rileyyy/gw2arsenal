$(document).ready(function(){
	$("#left_nav li").click(function(){
		$("#left_nav li").removeClass('nav_active');
		$(this).addClass('nav_active');
		//alert($(this).attr('id'));

		//Add selected button id to content
		//$("#content").html($(this).attr('id'));
		if( $(this).attr('id') == 'characters_nav' )
			$.get("https://api.guildwars2.com/v1/colors.json", function(data, status){
				$('#content').html(JSON.stringify(data));
			})	
		else if( $(this).attr('id') == 'wvw_nav' )
			$.get("https://api.guildwars2.com/v1/wvw/matches.json", function(data, status){
				$('#content').html(JSON.stringify(data, null, "\t"));
			})
		else
			$('#content').html($(this).attr('id'));
		

	})
});