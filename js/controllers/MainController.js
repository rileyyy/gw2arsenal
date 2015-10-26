
app.controller('MainController', ['$scope', 'colors', function($scope, colors) {
  
  	$scope.getColors = function(){
		colors.success(function(data){
			$scope.color_data = data.colors;
		});
	}
  
}]);
