angular.module('ethExplorer')
    .controller('transactionInfosCtrl', async function ($scope,$routeParams,transactionService) {

       $scope.tx= await transactionService.getTransaction($routeParams.transactionId);

    });
