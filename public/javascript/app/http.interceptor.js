(function () {
    'use strict';

    angular.module('dating')
        .factory('httpInterceptor', httpInterceptor);

    function httpInterceptor() {
        return {
            request: function (config) {
                if (window.localStorage['token'])
                    config.headers.Authorization = "Bearer " + window.localStorage['token'];

                return config;
            }
        }
    }
})();