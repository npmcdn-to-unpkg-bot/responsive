(function () {

    'use strict';

    angular.module('dating').service('authSvc', authSvc);

    authSvc.$inject = ['$http', '$log'];

    function authSvc($http, $log) {
        this.login = login;
        this.getToken = getToken;
        this.isAuthenticated = isAuthenticated;
        function login(loginInfo, cb) {
            $http({
                url: '/auth/login',
                data: loginInfo,
                method: 'POST'
            }).then(function (response) {
                if (response.data.success) {
                    setAuth(response.data);
                }
            });
        }


        function setAuth(data) {
            window.localStorage['token'] = data.token;
            $http.defaults.headers.common.Authorization = data.token;
        }

        function getToken() {
            return window.localStorage['token'];
        }

        function isAuthenticated() {
            if (window.localStorage['token'])
                return true;
            return false;
        }
    }

})();