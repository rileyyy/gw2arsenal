$(document).ready(function(){
	setup();
});

function setup(){

	//Navigation formatting
	$("#left_nav li").click(function(){
		$("#left_nav li").removeClass('nav_active');
		$(this).addClass('nav_active');
	});

	//Navigation logic (what happens when a button is clicked)
	$("#wvw_nav").click(function(){
		$.get("https://api.guildwars2.com/v1/wvw/matches.json", function(data, status){
			$('#content').html(JSON.stringify(data, null, "\t"));
		});
	});

	$("#color_nav").click(function(){
		loadColors();
	});

}

function loadColors(){

	$.get("https://api.guildwars2.com/v1/colors.json", function(data, status){

		//Build table out of returned json;
		var generated_html = '<table class="contained">';
		generated_html += '<th>Name</th>'+
						  '<th>Item Number</th>' + 
						  '<th>Base RGB</th>' +
						  '<th>Categories</th>'+
						  '<th>Cloth</th>'+
						  '<th>Leather</th>'+
						  '<th>Metal</th>';

		$.each(data.colors, function(index, color) { 
			generated_html += '<tr>';

				generated_html += '<td>' + color.name + '</td>';
				generated_html += '<td>' + color.item + '</td>';
				generated_html += '<td>' + JSON.stringify(color.base_rgb) + '</td>';
				generated_html += '<td>' + JSON.stringify(color.categories) + '</td>';
				generated_html += '<td>' + JSON.stringify(color.cloth) + '</td>';
				generated_html += '<td>' + JSON.stringify(color.leather) + '</td>';
				generated_html += '<td>' + JSON.stringify(color.metal) + '</td>';

			generated_html += '</tr>';

		});
		generated_html += '</table>';

		//Add generated content to div
		$('#content').html(generated_html);
	});

}