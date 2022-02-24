angular.module('ethExplorer')
    .controller('addressInfoCtrl', async function ($rootScope, $scope, $routeParams, addressService) {
      $scope.address = await addressService.getAddress($routeParams.addressId);
      $scope.addressId = $routeParams.addressId;
      $scope.$apply();
      //console.log( $scope.address)
});
