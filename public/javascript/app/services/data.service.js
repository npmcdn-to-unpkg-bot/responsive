(function () {
    'use strict';

    angular.module('dating').service('DataSvc', dataSvc);
    dataSvc.$inject = ['$http'];

    function dataSvc($http) {
        this.getLocations = getLocations;
        this.registerUser = registerUser;
        this.isNameAvailable = isNameAvailable;
        this.checkEmailExists = checkEmailExists;
        this.checkmates = checkmates;

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
                data: { userInfo: userInfo }
            });
        }

        function isNameAvailable(name) {
            return $http({
                url: '/user/exists/' + name,
                method: 'GET'
            });
        }

        function checkEmailExists(email) {
            return $http({
                url: '/user/email/exists/' + email,
                method: 'GET'
            });
        }

        function checkmates() {
            return $http({
                url: '/matches',
                method: 'GET'
            });
        }
    }
})();