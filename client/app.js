var myApp = angular.module('myApp',['ngRoute']);

myApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});

myApp.config(function($routeProvider){
    $routeProvider
    .when('/tabill/:A/list',{ //List of Bills
        templateUrl:'templates/list.html',
        controller:'empController'
    })
    .when('/tabill/:U/add',{
      templateUrl:'templates/add.html',
      controller:'empController'
    })
    .when('/tabill/:B/details',{
      templateUrl:'templates/show.html',
      controller:'empController'
    });
    //.when('/',{
      //  templateUrl:'templates/list.html',
       // controller:'empController'
   // })
    //.when('/employees',{
      //  templateUrl:'templates/list.html',
        //controller:'empController'
    //})
    //.when('/employees/create',{
      //  templateUrl:'templates/add.html',
       // controller:'empController'
    //})
    //.when('/employees/:id/edit',{
      //  templateUrl:'templates/edit.html',
      //  controller:'empController'
    //});


});