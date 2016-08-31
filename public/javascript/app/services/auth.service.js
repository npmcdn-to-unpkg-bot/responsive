(function () {

    'use strict';
    
    angular.module('dating').service('authSvc', authSvc);

    authSvc.$inject = ['$http', '$log'];

    function authSvc($http, $log) {
        this.login = login;

        function login(loginInfo) {
            return $http({
                url: '/auth/login',
                data: loginInfo,
                method:'POST'
            });
        }
    }

})();