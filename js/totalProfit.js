$(document).ready(function(){
	setup();
});

function setup(){

	//Global variables
	window.total_sold_gross = 0;
	window.total_sold_objects = [];
	window.total_bought_gross = 0;
	window.total_bought_objects = [];

	$("#mike_easy").click(function(){
		//Prevent any more ajax calls until this one finishes
		$(":button").attr("disabled", true);

		var api_key = "8EF967B5-4FB9-E64C-B919-0D5025804FDDE7B2AF39-EFAB-4878-A6BD-540F23066899";
		get_total_bought(api_key, 0);
		get_total_sold(api_key, 0);

		$(document).ajaxStop(function () {
	      post_process();
	      $(this).unbind("ajaxStop");
	  	});
	});

	$("#get_net").click(function(){
		//Prevent any more ajax calls until this one finishes
		$(":button").attr("disabled", true);

		var api_key = $("#api_key").val();
		get_total_bought(api_key, 0);
		get_total_sold(api_key, 0);

		$(document).ajaxStop(function () {
	      post_process();
	      $(this).unbind("ajaxStop");
	  	});
	});

	$("#riley_easy").click(function(){
		//Prevent any more ajax calls until this one finishes
		$(":button").attr("disabled", true);
		
        var api_key = "8427E953-2908-8F47-A705-9DD18A9C01E274B2AEEA-206E-47A2-8BF0-543BFD1D7549";
        get_total_bought(api_key, 0);
		get_total_sold(api_key, 0);

		$(document).ajaxStop(function () {
	      post_process();
	      $(this).unbind("ajaxStop");
	  	});
    });


}

function post_process(){

	var net_profit = total_sold_gross - total_bought_gross;
	$('#content').html("<p>Total Bought: " + convertToCoins(total_bought_gross) + "</p><p>Total Sold: " + convertToCoins(total_sold_gross) + "</p><p>Net: " + convertToCoins(net_profit) + "</p>");

	//Reset global variables before next query
	window.total_sold_gross = 0;
	window.total_sold_objects = [];
	window.total_bought_gross = 0;
	window.total_bought_objects = [];

	$(":button").attr("disabled", false);
}

function get_total_bought(api_key, page){

	var page_number = page;
	
	$.ajax({
		url: 'https://api.guildwars2.com/v2/commerce/transactions/history/buys?access_token=' + api_key + '&page_size=200&page='+page_number,
		type: 'GET',
		dataType: 'json',
		cache: false,
		success: function(data, textStatus, request) {

			//Get the total number of pages in this request
			var total_pages = request.getResponseHeader('X-Page-Total') - 1;

			if(page_number < total_pages){
				page_number++;
				get_total_bought(api_key, page_number);
			}else{
				
			}

			$.each(data, function(key, val) {
				update_total_bought(val);
			});

		},
		error: function(data) { 

		},
	});
}

function get_total_sold(api_key, page){
	var page_number = page;

	$.ajax({
		url: 'https://api.guildwars2.com/v2/commerce/transactions/history/sells?access_token=' + api_key + '&page_size=200&page='+page_number,
		type: 'GET',
		dataType: 'json',
		cache: false,
		success: function(data, textStatus, request) {

			//Get the total number of pages in this request
			var total_pages = request.getResponseHeader('X-Page-Total')-1;

			if(page_number < total_pages){
				page_number++;
				get_total_sold(api_key, page_number);

			}else{

			}


			$.each(data, function(key, val) {
				update_total_sold(val);
			});

		
		},
		error: function(data) { 


		},
	});
}

function update_total_bought(obj){

	//Keep a running tally of total amount bought
	total_bought_gross += obj.price;

	//Add json object to array
}

function update_total_sold(obj){

	//Keep a running tally of total amount bought
	total_sold_gross += obj.price;

	//Add json object to array
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
		nStr = nStr.replace(rgx, '$1' + '<img src="img/copper_coin.png" class="currency_icons">');
	}
	else if(nStr.length >= 3 && nStr.length <= 4){
		var rgx = /(\d+)(\d{2})/;
		nStr = nStr.replace(rgx, '$1' + '<img src="img/silver_coin.png" class="currency_icons">' + '$2' + '<img src="img/copper_coin.png" class="currency_icons">');
	}else{
		var rgx = /(\d+)(\d{2})(\d{2})/;
		nStr = nStr.replace(rgx, '$1' + '<img src="img/gold_coin.png" class="currency_icons">' + '$2' + '<img src="img/silver_coin.png" class="currency_icons">' + '$3'+ '<img src="img/copper_coin.png" class="currency_icons">');

	}

	if(is_negative){
		nStr = "-" + nStr;
	}

	return nStr;
}