angular.module('ethExplorer')
    .controller('transactionInfosCtrl', ['$scope','$routeParams','transactionService', async function ($scope,$routeParams,transactionService) {

      $scope= await transactionService.getTransaction($routeParams.transactionId);
      $scope.$apply();
    }]);
