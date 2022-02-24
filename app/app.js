'use strict';
angular.module('ethExplorer', ['ngRoute','ui.bootstrap'])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/transaction/:transactionId', {
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfo.html',
                controller: 'addressInfoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', function($rootScope) {
        var eth_node_url = 'http://3.36.252.183:8545'; // TODO: remote URL
        var web3 = new Web3(eth_node_url);
        $rootScope.web3 = web3;
        /*
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing  } 
        }
        var connected = false;
        
        if(!web3.eth.net.isListening()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'}) 
            $('#connectwarning').modal('show') 
        }*/
    }]);

