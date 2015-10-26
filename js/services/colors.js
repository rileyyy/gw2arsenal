app.factory('colors', ['$http', function($http){
	return $http.get('https://api.guildwars2.com/v1/colors.json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);