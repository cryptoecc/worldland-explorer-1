angular.module('ethExplorer')
    .service('addressService', function($rootScope) {
        var web3 = $rootScope.web3;
        var result={'balance':0,'balanceInEther':0};

        this.getAddress = async function(addressId){
            if(addressId!==undefined){
                result.balance = await web3.eth.getBalance(addressId).toNumber();
                result.balanceInEther = web3.fromWei(result.balance, 'ether')
            }
            return result;
        }
    }  
);
