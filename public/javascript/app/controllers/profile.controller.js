(function () {
    'use strict';
    angular.module('dating').controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$state', 'authSvc', 'DataSvc', 'toastr'];

    function profileCtrl($scope, $state, authSvc, DataSvc, toastr) {
        $scope.sellocation = "";
        DataSvc.getUserInfo().then(function(response){
            $scope.userInfo = response.data; 
            $scope.sellocation = response.data.location.description;
        },function(error){

        });
    }
})();