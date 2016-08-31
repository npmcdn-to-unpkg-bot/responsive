(function () {
    'use strict';

    angular.module('dating').service('DataSvc', dataSvc);
    dataSvc.$inject = ['$http'];

    function dataSvc($http) {
        this.getLocations = getLocations;
        this.registerUser = registerUser;
        
        function getLocations(searchText) {
            return $http({
                url: '/locations/find/' + searchText,
                method: 'GET'
            });
        }

        function registerUser(userInfo) {
            return $http({
                url: '/user/save',
                method: 'POST',
                data: userInfo
            });
        }
    }
})();