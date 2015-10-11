var app = angular.module('myApp', []);

app.controller('MainController', function($scope, $http) {
    $http.get("https://api.guildwars2.com/v1/colors.json")
    .success(function(response) {$scope.colors = response.colors;});
});
