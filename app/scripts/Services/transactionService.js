angular.module('ethExplorer')
    .service('transactionService', ['$rootScope', 'blockService', function($rootScope,blockService) {
		var web3 = $rootScope.web3;
        this.getTransaction = async function(txId){
            var number = web3.eth.getBlockNumber();
            if(txId!==undefined) { // add a test to check if it match tx paterns to avoid useless API call, clients are not obliged to come from the search form...
                result = await web3.eth.getTransaction(txId);
                result.txId=txId;
                if(result.blockHash==undefined){
                    result.blockHash ='pending';
                }
                if(result.blockNumber==undefined){
                    result.blockNumber ='pending';
                }
                /////////////////////
                //result.ethValue = result.value.c[0] / 10000; 
                result.dataFromHex = result.input.toString(16);
                //console.log(result.input)
                result.txprice = (result.gas * result.gasPrice)/1000000000000000000 + " ETH";
                if(result.blockNumber!==undefined){
                    result.conf = number - result.blockNumber;
                    if(result.conf===0){
                        result.conf='unconfirmed'; //TODO change color button when unconfirmed... ng-if or ng-class
                    }
                }
                    //TODO Refactor this logic, asynchron calls + services....
                if(result.blockNumber!==undefined){
                    var info = blockService.getBlock(result.blockNumber);
                    if(info!==undefined){
                        result.time = info.timestamp;
                    }
                }
            };
            return result;
        };

        this.getBlockTransactionCount = async function(blockId){
            return await web3.eth.getBlockTransactionCount(blockId);
        };

        this.getTransactionFromBlock = async function(blockId, blockIdx){
            return await web3.eth.getTransactionFromBlock(blockId, blockIdx);
        };
    }
]);
