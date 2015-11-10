$(document).ready(function(){
	setup();
});

function setup(){
	get_total_buy();
	// $.when(get_total_buy(), get_total_sell()).done(function(b,s){
	// 	var headers = b.getAllResponseHeaders().toLowerCase();
	// 	alert(headers);
		
	// 	b=b[0];
	// 	s=s[0];
	// 	//console.log(s);
	// 	//Add up everything bought
	// 	var total_bought = 0;

	// 	$.each(b, function(key, val) {
	// 		console.log(val.price);
	// 		console.log(val.quantity);
	// 		total_bought += (val.price*val.quantity);
	// 	});
	// 	console.log(total_bought);
	// 	//Add up everything sold
	// 	var total_sold = 0;

	// 	var net_profit = total_sold - total_bought;
	// 	//Add generated content to div
	// 	$('#content').html("<p>Net: " + net_profit + "</p>");
	// });

}

function get_total_buy(){
	var pages_found = false;
	var page_number = 0;
	var total_pages = 1;
	var total_bought = 0;
	
	for (page_number; page_number < total_pages; page_number++) { 
	//while(more_pages){
		$.ajax({
			url: 'https://api.guildwars2.com/v2/commerce/transactions/history/buys?access_token=8EF967B5-4FB9-E64C-B919-0D5025804FDDE7B2AF39-EFAB-4878-A6BD-540F23066899&page_size=200&page='+page_number,
			type: 'GET',
			dataType: 'json',
			async: false,
			success: function(data, textStatus, request) {

				//Get the total number of pages in this request
				total_pages = request.getResponseHeader('X-Page-Total');

				$.each(data, function(key, val) {
					//total_bought += (val.price*val.quantity);
					total_bought += val.price;
				});
				console.log(total_bought);
			},
			error: function(data) { 
				//more_pages = false;
				console.log(data);
			},
		});
	}
}

function get_total_sell(){
	return $.ajax({
		url: 'https://api.guildwars2.com/v2/commerce/transactions/history/sells?access_token=8EF967B5-4FB9-E64C-B919-0D5025804FDDE7B2AF39-EFAB-4878-A6BD-540F23066899',
		type: 'GET',
		dataType: 'json',
		success: function(data) { 
		},
		error: function(data) { 
			console.log(data);
		},
	});
}