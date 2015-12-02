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

	$("#net_gains_nav").click(function(){
		window.location.replace("totalProfit.html");
	});

}

function loadSellHistory(data){
	//Build table out of returned json;
		var generated_html = '<table class="contained">';
		generated_html += '<th>TransactionID</th>'+
						  '<th>ItemID</th>' + 
						  '<th>Price</th>' +
						  '<th>Quantity</th>'+
						  '<th>Created</th>'+
						  '<th>Purchased</th>';

		$.each(data, function(index, trans) { 
			generated_html += '<tr>';

				generated_html += '<td>' + trans.id + '</td>';
				generated_html += '<td>' + trans.item_id + '</td>';
				generated_html += '<td>' + trans.price + '</td>';
				generated_html += '<td>' + trans.quantity + '</td>';
				generated_html += '<td>' + trans.created + '</td>';
				generated_html += '<td>' + trans.purchased + '</td>';

			generated_html += '</tr>';

		});
		generated_html += '</table>';

		//Add generated content to div
		$('#content').html(generated_html);
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

				//Don't need to string parse the data. The cool thing about json data is you can gather exactly the information you need
				//by calling on the "key". JSON is just a key-value pair, so if you know the key, you can get the value.
				//Check out the difference bellow on gathering the information you care about.

				//Some more information, JSON stands for JavaScript Object Notation, so the purpose of JSON is to serialize a javascript object into a string.
				//What are the benefits of this? Well if you encode your object as a json string, you can send that data over the internet and decode it on the other end.
				//The user (us), decodes that json data back into the javascript object, which we can now use below!
				//JSON is cross language, which is why it is a great medium of transfer from Java, to C, to C#, to Perl... It is a lightweight alternative to XML

				var colorName = color.name;
				var colorItem = color.item;

				var baseColorRGB = color.base_rgb.toString(); //color.base.rgb is an array with 3 values [R,G,B]. Calling toString() handles all that string stripping you were doing earlier.

				var colorCat  = color.categories;

				var colorClthData = JSON.stringify(color.cloth); //This information is useless, purely to display right now
				var colorClthRGB = color.cloth.rgb.toString();

				var colorLthrData = JSON.stringify(color.leather); //This information is useless, purely to display right now
				var colorLthrRGB = color.leather.rgb.toString();

				var colorMetlData = JSON.stringify(color.metal); //This information is useless, purely to display right now
				var colorMetlRGB = color.metal.rgb.toString();

				generated_html += '<td>' + colorName + '</td>';
				generated_html += '<td>' + colorItem + '</td>';
				generated_html += '<td> <p style="background-color:rgb(' + baseColorRGB + ')">' + baseColorRGB + '</p></td>';
				generated_html += '<td>' + colorCat + '</td>';
				generated_html += '<td> <p style="background-color:rgb(' + colorClthRGB + ')">' + colorClthData + '</p></td>';
				generated_html += '<td> <p style="background-color:rgb(' + colorLthrRGB + ')">' + colorLthrData + '</p></td>';
				generated_html += '<td> <p style="background-color:rgb(' + colorMetlRGB + ')">' + colorMetlData + '</p></td>';

			generated_html += '</tr>';

		});
		generated_html += '</table>';

		//Add generated content to div
		$('#content').html(generated_html);
	});

}