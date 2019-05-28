var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

var refresh = function() {
  $http.get('/db_name').success(function(response) {
    $scope.db_name = response;
    $scope.stu = "";
  });
};

refresh();

$scope.insert_reg = function() {
  console.log($scope.stu);
  $http.post('/db_name', $scope.stu).success(function(response) {
    console.log(response);
    refresh();
  });
};


$scope.remove_reg = function(id) {
  console.log(id);
  $http.delete('/db_name/' + id).success(function(response) {
    refresh();
  });
};


$scope.edit_reg = function(id) {
  console.log(id);
  $http.get('/db_name/' + id).success(function(response) {
    $scope.stu = response;
  });
};  

$scope.update_reg = function() {
  console.log($scope.stu._id);
  $http.put('/db_name/' + $scope.stu._id, $scope.stu).success(function(response) {
    refresh();
  })
};

$scope.clear = function() {
  $scope.stu = "";
}


}]);﻿