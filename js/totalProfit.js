$(document).ready(function(){
	setup();
});

function setup(){

	$("#mike_easy").click(function(){
		var api_key = "8EF967B5-4FB9-E64C-B919-0D5025804FDDE7B2AF39-EFAB-4878-A6BD-540F23066899";
		var total_bought = get_total_bought(api_key);
		var total_sold = get_total_sold(api_key);
		var net_profit = total_sold - total_bought;
		$('#content').html("<p>Total Bought: " + convertToCoins(total_bought) + "</p><p>Total Sold: " + convertToCoins(total_sold) + "</p><p>Net: " + convertToCoins(net_profit) + "</p>");
	});

	$("#get_net").click(function(){
		var api_key = $("#api_key").val();
		var total_bought = get_total_bought(api_key);
		var total_sold = get_total_sold(api_key);
		var net_profit = total_sold - total_bought;
		$('#content').html("<p>Total Bought: " + convertToCoins(total_bought) + "</p><p>Total Sold: " + convertToCoins(total_sold) + "</p><p>Net: " + convertToCoins(net_profit) + "</p>");
	});

}

function get_total_bought(api_key){

	var page_number = 0;
	var total_pages = 1;
	var total_bought = 0;
	
	for (page_number; page_number < total_pages; page_number++) { 
		$.ajax({
			url: 'https://api.guildwars2.com/v2/commerce/transactions/history/buys?access_token=' + api_key + '&page_size=200&page='+page_number,
			type: 'GET',
			dataType: 'json',
			async: false,
			cache: false,
			success: function(data, textStatus, request) {

				//Get the total number of pages in this request
				total_pages = request.getResponseHeader('X-Page-Total');

				$.each(data, function(key, val) {
					total_bought += val.price;
				});

			},
			error: function(data) { 
	
				console.log(data);
			},
		});
	}

	return total_bought;
}

function get_total_sold(api_key){
	var page_number = 0;
	var total_pages = 1;
	var total_sold = 0;
	
	for (page_number; page_number < total_pages; page_number++) { 
		$.ajax({
			url: 'https://api.guildwars2.com/v2/commerce/transactions/history/sells?access_token=' + api_key + '&page_size=200&page='+page_number,
			type: 'GET',
			dataType: 'json',
			async: false,
			cache: false,
			success: function(data, textStatus, request) {

				//Get the total number of pages in this request
				total_pages = request.getResponseHeader('X-Page-Total');

				$.each(data, function(key, val) {
					total_sold += val.price;
				});

			},
			error: function(data) { 
	
				console.log(data);
			},
		});
	}

	return total_sold;
}

function convertToCoins(n){ 

	var is_negative = false;

	if(n < 0){
		is_negative = true;
		n = n * -1;
	}

	nStr = n+'';
	if(nStr.length <= 2){
		var rgx = /(\d+)/;
		nStr = nStr.replace(rgx, '$1' + 'c');
	}
	else if(nStr.length >= 3 && nStr.length <= 4){
		var rgx = /(\d+)(\d{2})/;
		nStr = nStr.replace(rgx, '$1' + 's' + '$2'+'c');
	}else{
		var rgx = /(\d+)(\d{2})(\d{2})/;
		nStr = nStr.replace(rgx, '$1' + 'g' + '$2' + 's' + '$3'+'c');
	}

	if(is_negative){
		nStr = "-" + nStr;
	}

	return nStr;
}