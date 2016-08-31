(function () {
    'use strict';

    angular.module('dating').controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$scope', '$state', 'DataSvc'];

    function registerCtrl($scope, $state, DataSvc) {
        $scope.userInfo = {};
        $scope.sellocation;

        $scope.register = function () {
            DataSvc.registerUser($scope.userInfo).then(function (response) {
                debugger;
            }, function (error) {

            })
        }

        $scope.searchLocation = function ($event) {
            if ($event.keyCode === 27) {
                $scope.locations = [];
            }
            if ($event.keyCode == 40) {
                var ele = $event.currentTarget.nextSibling.children[0].children[0];
                $(ele).addClass('active');
                $(ele).focus();
            } else {
                DataSvc.getLocations($scope.sellocation).then(function (res) {
                    $scope.locations = res.data;
                }, function () {

                });
            }
        }
        $scope.selectLocation = function (location, $event) {
            $scope.userInfo.location = location;
            $scope.sellocation = location.description;
            $scope.locations = [];
            $event.preventDefault();
        }
    }
})();