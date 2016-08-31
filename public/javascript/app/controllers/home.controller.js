(function(){
    'use strict';
    
    angular.module('dating').controller('homeCtrl',homeCtrl);
    
    homeCtrl.$inject = ['$scope','$state'];
    
    function homeCtrl($scope,$state){
        $state.go('login');
    }
    
})();