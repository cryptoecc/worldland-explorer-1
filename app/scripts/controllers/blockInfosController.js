angular.module('ethExplorer')
    .controller('blockInfosCtrl', async function ($rootScope, $routeParams,$scope,blockService,transactionService) {
    $scope.block = await blockService.getBlock($routeParams.blockId);
    $scope.transactions = [];

    var txCount = await transactionService.getBlockTransactionCount($routeParams.blockId);
    for (var blockIdx = 0; blockIdx < txCount; blockIdx++) {
        transaction = await transactionService.getTransactionFromBlock($routeParams.blockId, blockIdx)
        $scope.transactions.push(transaction)
    }
    $scope.$apply();
    // parse transactions
});

