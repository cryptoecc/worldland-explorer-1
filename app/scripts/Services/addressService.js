angular.module('ethExplorer')
    .service('addressService', ['$rootScope', function($rootScope) {
        var web3 = $rootScope.web3;
        var result={'balance':0,'balanceInEther':0};

        this.getAddress = async function(addressId){
            if(addressId!==undefined){
                result.balance = await web3.eth.getBalance(addressId);
                result.balanceInEther = web3.utils.fromWei(result.balance, 'ether')
            }
            return result;
        }
    }  
]);
