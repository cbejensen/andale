var app = angular.module('andale')
.controller('MainController', ['$scope', '$sce', 'dataService',
  function ($scope, $sce, dataService) {
    
    $scope.brands = dataService.brands;
    
		$scope.infoBox, $scope.newBrandForm, $scope.newProductForm,
			$scope.editBrandForm, $scope.editProductForm = false;
    
    function clear() {
      $scope.infoBox = $scope.newBrandForm = $scope.newProductForm = $scope.editBrandForm = $scope.editProductForm = false;
      $scope.commandTray = false;
    }

    $scope.showCommandTray = function() {
      $scope.commandTray = !$scope.commandTray;
    }
    
		$scope.create = function(type, item) {
			if (dataService.create(type, item)) {
				clear();
				$scope.search = item.name;
			};
		};

    $scope.update = function(type, newItem, oldItem) {
      if (dataService.update(type, newItem, oldItem)) {
				clear();
				$scope.search = newItem.name;
			}
    };
    
    $scope.remove = function(type, item) {
			var msg = 'Are you sure you want to delete \'' + item.name + '\'?\n';
			if (type === 'brand') msg += 'This wiil also delete all of this brand\'s products.';
			var confirmRemove = confirm(msg);
			if (confirmRemove) {
				dataService.remove(type, item);
        clear();
      }
    };

		$scope.edit = function(type, item) {
			var str = type.substr(0, 1).toUpperCase() + type.substr(1);
			var form = 'edit' + str + 'Form';
			$scope.oldItem = item;
			$scope[form] = true;
		};
    
    $scope.filterProducts = function(brand) {
      return function(value) {
        if (brand) {
          return value.brand === brand;
        } else {
          return true;
        }
      }
    }

		$scope.showImgGallery = function(product, btnNum) {
			product.showImg = !product.showImg;
			product.imgToShow = 0;

		}
    
    $scope.productImgSelect = function(product, index) {
      product.imgToShow = index;
      product.showImg = true;
    }
    
    $scope.productImgScroll = function(right, product, numOfImages) {
      // right is true, false is left
			if (right && product.imgToShow < numOfImages - 1) {
				product.imgToShow += 1;
			} else if (right) {
				product.imgToShow = 0;
			} else if (product.imgToShow >= 1) {
				product.imgToShow -= 1
			} else {
				product.imgToShow = numOfImages - 1;
			};
    };

}]);
