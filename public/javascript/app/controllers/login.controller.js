(function () {
    'use strict';

    angular.module('dating').controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', '$state', 'authSvc', 'toastr'];

    function loginCtrl($scope, $state, authSvc, toastr) {
        $scope.loginInfo = {};

        $scope.login = function () {
            authSvc.login($scope.loginInfo, function (result) {
                if (result) {
                    toastr.success("Lets rock");
                    $state.go('home');
                } else {
                    toastr.error("Login failed");
                }
            });
        }

        $scope.navigateTo = function () {
            $state.go('register')
        }
    }
})();