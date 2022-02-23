angular.module('ethExplorer')
    .service('blockService', function($rootScope) {
		const web3 = $rootScope.web3;
        const number = web3.eth.blockNumber;
        var result;
        this.getBlockTime= async function(){
            const span = 10
            const times = []
            const firstBlock = await web3.eth.getBlock(number - span)
            let prevTimestamp = firstBlock.timestamp
            
            for (let i = number - span + 1; i <= number; i++) {
                const block = await web3.eth.getBlock(i)
                let time = block.timestamp - prevTimestamp
                prevTimestamp = block.timestamp
                times.push(time)
            }
            return Math.round(times.reduce((a, b) => a + b) / times.length)
        };
        this.getBlock= async function(Id){
            if(Id!==undefined) {
                result = await web3.eth.getBlock(Id);

                if(result.hash==undefined){
                    result.hash ='pending';
                }
                if(result.miner==undefined){
                    result.miner ='pending';
                }
                result.difficulty = ("" + result.difficulty).replace(/['"]+/g, '');
                result.dataFromHex = hex2a(result.extraData);
                result.time = time2d(result.timestamp);
                if(result.number!==undefined){
                    if(number == result.number ){
                        result.conf='Unconfirmed';
                    }
                    else{
                        result.conf = number - result.number + " Confirmations";
                    }
                }
            };
            return result;
        };

		function hex2a(hexx) {
			var hex = hexx.toString();//force conversion
			var str = '';
			for (var i = 0; i < hex.length; i += 2)
				str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
			return str;
		}

		//timestamp to date
		function time2d(time) {
			var date = new Date(time*1000);//force conversion 
			return date.toUTCString();
		}
	
	}
);
