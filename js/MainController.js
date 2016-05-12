var app = angular.module('andale')
.controller('MainController', ['$scope', '$sce', 'dataService',
  function ($scope, $sce, dataService) {
    
    $scope.brands = dataService.brands;
    
    $scope.allShown = false;
    
    function clear(form) {
      $scope[form] = false;
      $scope.search = '';
      $scope.commandTray = false;
    }

    $scope.showCommandTray = function() {
      $scope.commandTray = !$scope.commandTray;
    }
    
    // BRAND
    $scope.editBrand = function(brand) {
      $scope.oldItem = brand;
      $scope.editBrandForm = true;
			$scope.search = brand.name;
    }
    
    $scope.addBrand = function(brand) {
      dataService.addBrand(brand);
      clear('newBrandForm');
    }

    $scope.saveBrand = function(newBrand, oldBrand) {
      dataService.saveBrand(newBrand, oldBrand);
      clear('editBrandForm');
    };
    
    $scope.removeBrand = function(brand) {
			var confirmation = confirm('Are you sure you want to delete \'' + brand.name + '\'?\n' +
				'This will also delete all of this brand\'s products.')
			if (confirmation) {
				dataService.removeBrand(brand);
        clear('editBrandForm');
      }
    }
    
    // PRODUCT
    $scope.editProduct = function(product) {
      $scope.oldItem = product;
      $scope.editProductForm = true;
    }
    
    $scope.addProduct = function(product) {
      if(dataService.addProduct(product)) {
        clear('newProductForm');
      }
    };
    
    $scope.saveProduct = function(product, oldProduct) {
      if(dataService.saveProduct(product, oldProduct)) {
        console.log($scope.products);
        clear('editProductForm');
      }
    }
    
    $scope.removeProduct = function(product) {
      if(dataService.removeProduct(product)) {
        clear('editProductForm');
      }
    }
    
    $scope.filterProducts = function(brand) {
      return function(value) {
        if(brand) {
          return value.brand === brand;
        } else {
          return true;
        }
      }
    }
    
    $scope.productImgSelect = function(product, index) {
      product.imgToShow = index;
      product.showImg = true;
    }
    
    $scope.productImgScroll = function(right, product, numOfImages) {
      //false if left, true if right
      if(right) {
        if(product.imgToShow < numOfImages - 1) {
          product.imgToShow += 1;
        } else {
          product.imgToShow = 0;
        }
      } else {
        if(product.imgToShow >= 1) {
          product.imgToShow -= 1
        } else {
          product.imgToShow = numOfImages - 1;
        }
      }
    }
    
    // Show all pics and specs
    $scope.showAll = function() {
      $scope.allShown = !$scope.allShown;
      $scope.products.forEach(function(product) {
        product.showImg = true;
        product.showSpecs = true;
      });
    };
    
    // Hide all pics and specs
    $scope.hideAll = function() {
      $scope.allShown = !$scope.allShown;
      $scope.products.forEach(function(product) {
        product.showImg = false;
        product.showSpecs = false;
      });
    };

}]);
