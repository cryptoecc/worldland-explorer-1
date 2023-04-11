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
            when('/freeeth', {
                templateUrl: 'views/freeEthInfo.html',
                controller: 'freeEthInfoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(['$rootScope', function($rootScope) {
        var eth_node_urls = [
            'https://rpc.lvscan.io/',
            'http://43.200.141.6:8545'
        ]; 
        var web3 = new Web3(new Web3.providers.HttpProvider(eth_node_urls[0]));
        web3.eth.net.isListening()
        .then(() => {
            // RPC 노드가 연결되어 있는 경우, 해당 노드 사용
            web3 = web3;
        })
        .catch(() => {
            // RPC 노드가 연결되어 있지 않은 경우, 다른 노드로 시도
            for (let i = 1; i < eth_node_urls.length; i++) {
              const provider = new Web3.providers.HttpProvider(eth_node_urls[i]);
              const newWeb3 = new Web3(provider);
              newWeb3.eth.net.isListening()
              .then(() => {
                web3 = newWeb3;
              })
              .catch(() => {
                if (i === eth_node_urls.length - 1) {
                  console.error('모든 RPC 노드가 다운됨');
                }
              });
            }
        });
        $rootScope.web3 = web3
        
        /*
        var eth_node_url = 'https://rpc.lvscan.io/'; // TODO: remote URL
        var web3 = new Web3(new Web3.providers.HttpProvider(eth_node_url));
        $rootScope.web3 = web3;*/
        
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
        }
        var connected = false;
        
        if(!web3.eth.net.isListening()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'}) 
            $('#connectwarning').modal('show') 
        }
    }]);

