app.directive('colorInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
       info: '=' 
    }, 
    templateUrl: 'js/directives/colorInfo.html' 
  }; 
});

// app.directive('installApp', function() { 
//   return { 
//     restrict: 'E', 
//     scope: {}, 
//     templateUrl: 'js/directives/colorInfo.html' ,
//   }; 
// });
