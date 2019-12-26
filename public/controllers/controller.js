var app = angular.module('myApp',['ngResource']);

app.controller('AppCtrl', [ '$scope','$http','$resource' ,function ($scope,$http,$resource) {
  
  function refresh() {
    var ContactResource = $resource('/contactList');
    $scope.contactList = ContactResource.query();
    $scope.contact = {} ;
  };

  refresh();
  $scope.addContact = () => {
    $http.post('/contactList',$scope.contact).then((res)=>{
      console.log('Recieved from mongo');
    });
    refresh();
  };

  $scope.remove = (id) => {
    $http.delete('/contactList/' + id).then((res)=>{
      refresh();
    });
  };

  $scope.edit = (id) => {
    let contact = $scope.contactList.filter((item)=>{
      return item._id === id;
    })[0];
    $scope.contact = contact;
    $scope.disable = true;
  };

  $scope.clear = ()=>{$scope.contact={};$scope.disable=false};

  $scope.update = () => {
    $http.put('/contactList/' + $scope.contact._id,$scope.contact).then((res)=>{
      refresh();
    });
  }

}]);