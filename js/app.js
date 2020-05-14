var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'page/trangchu.html'
	})
	.when('/gioithieu',{
		templateUrl:'page/gioithieu.html'
	})
	.when('/dangnhap',{
		templateUrl:'page/dangnhap.html'
	})
	.when('/sanpham',{
		templateUrl:'page/sanpham.html'
	})
	.when('/dangky',{
		templateUrl:'page/dangky.html'
	});
});	

app.controller('AppCtrl', function ($scope, $http) {
    $scope.countries = [ 
        {name: 'Vietnam'},        
    ];
    $http.get('data/products.json').then(function (res) {
        $scope.products = res.data;
    });
    $scope.carts = []; 
    
    var CartInStorage = sessionStorage.getItem('cart');
    if (CartInStorage) {        
        $scope.carts = angular.fromJson(CartInStorage);
    }
    $scope.show_product = function (sp) {
        $scope.products = res.data;
    }
    $scope.add_to_cart = function (sp) {
        var itemExists = checkCartExists(sp.id);

        
        if (itemExists != -1) {
            $scope.carts[itemExists].quantity += 1;
        } else {
            sp.quantity = 1; 
            $scope.carts.push(sp);
        }        
        sessionStorage.setItem('cart', angular.toJson($scope.carts));
        $scope.cart = sp;
    }    
    function checkCartExists(id) {
        for (var i in $scope.carts) {
            if ($scope.carts[i].id == id) {
                return i;
            }
        }
        return -1; 
    }    
    $scope.remove_cart = function(id) {
        var itemExists = checkCartExists(id); 
        if (itemExists != -1) {
            $scope.carts.splice(itemExists,1);
            sessionStorage.setItem('cart', angular.toJson($scope.carts));
        }
    }
});