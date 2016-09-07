(function () {
    'use strict';

    angular.module('dating').controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$state', 'authSvc', 'DataSvc'];

    function homeCtrl($scope, $state, authSvc, DataSvc) {
        if (!authSvc.isAuthenticated()) $state.go('login');
        //check for all profiles nearby;
        DataSvc.checkmates().then(function (response) {

        });
    }

})();