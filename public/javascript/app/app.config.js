(function () {

    angular.module('dating').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', { url: '/home', templateUrl: 'partials/home', controller: 'homeCtrl' })

        $stateProvider
            .state('login', { templateUrl: 'partials/login', controller: 'loginCtrl' });
            
        $stateProvider
            .state('register',{templateUrl:'partials/register', controller:'registerCtrl'});
    });
})();