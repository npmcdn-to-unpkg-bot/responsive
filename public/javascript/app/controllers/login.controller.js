(function () {
    'use strict';

    angular.module('dating').controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$state', 'authSvc'];

    function loginCtrl($scope, $state, authSvc) {
        $scope.loginInfo = {};

        $scope.login = function () {
            authSvc.login($scope.loginInfo).then(function (res) {
                if(res.data.status == false){
                    //show message from server
                }
            }, function (err) {
                debugger;
            });
        }
        
        $scope.navigateTo = function(){
            $state.go('register')
        }
    }
})();