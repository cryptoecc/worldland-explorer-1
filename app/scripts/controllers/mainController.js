angular.module('ethExplorer')
    .controller('mainCtrl', ['$rootScope', '$scope', '$location', 'blockService', async function ($rootScope, $scope, $location, blockService) {

	var web3 = $rootScope.web3;
	var maxBlocks = 10; // TODO: into setting file or user select
	var blockNum = $scope.blockNum = await parseInt(await web3.eth.getBlockNumber(), 10);
	if (maxBlocks > blockNum) {
	    maxBlocks = blockNum + 1;
	}

  blockService.getBlockTime().then(function(result){
    $scope.averageTime = result;
    $scope.$apply();
  });
	// get latest 20 blocks
	$scope.blocks = [];
	for (var i = 0; i < maxBlocks; ++i) {
      await blockService.getBlock(blockNum - i).then(function(result){
        $scope.blocks.push(result)
        $scope.$apply();
      })
	}

  $scope.processRequest = function() {
        var requestStr = $scope.ethRequest.split('0x').join('');

      if (requestStr.length === 40)
        return goToAddrInfos(requestStr)
      else if(requestStr.length === 64) {
        if(/[0-9a-zA-Z]{64}?/.test(requestStr))
          return goToTxInfos('0x'+requestStr)
        else if(/[0-9]{1,7}?/.test(requestStr))
          return goToBlockInfos(requestStr)
      }else if(parseInt(requestStr) > 0)
        return goToBlockInfos(parseInt(requestStr))

      alert('Don\'t know how to handle '+ requestStr)
  };

  function goToBlockInfos(requestStr) {
      $location.path('/block/'+requestStr);
  }

  function goToAddrInfos(requestStr) {
      $location.path('/address/'+requestStr);
  }

  function goToTxInfos (requestStr) {
      $location.path('/transaction/'+requestStr);
  }

}]);
