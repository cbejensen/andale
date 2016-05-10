var app = angular.module('andale');

app.directive('brandForm', function() {
  return {
    restrict: 'AE',
    scope: {
      oldBrand: '=',
      isNew: '=',
      submit: '&',
      cancel: '&',
      remove: '&'
    },
    templateUrl: 'forms/brand-form.html',
    link: function(scope, elem, attrs) {
      
      function reset() {
        if(scope.oldBrand) {
          scope.brand = angular.copy(scope.oldBrand);
        } else {
          scope.brand = {};
          scope.brand.showName = true;
        }
      }
      reset();
      
      scope.$watch('oldBrand', function(newValue, oldValue) {
        if (newValue) reset();
      }, true);
    
      scope.submitBrand = function(brand) {
        scope.submit()(brand, scope.oldBrand);
        reset();
      }
      
      scope.cancelBrand = function() {
        scope.cancel();
        reset();
      }
      
      scope.removeBrand = function() {
        scope.remove()(scope.oldBrand);
        reset();
      }
    }
  };
});

app.directive('productForm', function() {
  
  var productController = ['$scope', '$firebaseArray', 'dataService', function($scope, $firebaseArray, dataService) {
  
    $scope.brands = dataService.brands;
    
    function reset() {
      if($scope.oldProduct) {
        $scope.product = angular.copy($scope.oldProduct);
      } else {
        $scope.product = {
          images: [''],
          faqs: [{question: '', answer: ''}]
        };
      }
    }
    reset();
    
    $scope.$watch('oldProduct', function(newValue, oldValue) {
      if (newValue) reset();
    }, true)
    
    $scope.addProductImg = function() {
      if($scope.product.images) {
        $scope.product.images.push('')
      } else {
        $scope.product.images = ['']
      }
    }

    $scope.addBullets = function() {
      $scope.product.specs = '\u2022 ' + $scope.product.specs.replace(/[\r\n]/g, "\n\u2022 ");
    }
  
    $scope.submitProduct = function(product) {
      $scope.submit()(product, $scope.oldProduct);
      reset();
    }
    
    $scope.cancelProduct = function() {
      $scope.cancel();
      reset();
    }
    
    $scope.removeProduct = function() {
      $scope.remove()($scope.oldProduct);
      reset();
    }
    
  }]

  return {
    restrict: 'AE',
    scope: {
      oldProduct: '=',
      isNew: '=',
      submit: '&',
      cancel: '&',
      remove: '&'
    },
    templateUrl: 'forms/product-form.html',
    controller: productController
  };
});

app.directive('renderThumbnail', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on("load", function() {
        var width = element[0].naturalWidth;
        var height = element[0].naturalHeight;
        if(width > height) {
          element.css('height', '48px');
          var halfWidth = (((width / (height / 48)) / 2) * -1) + 24;
          element.css('margin-left', halfWidth);
        } else {
          element.css('width', '48px');
          var halfHeight = (((height / (width / 48)) / 2) * -1) + 24;
          element.css('margin-top', halfHeight);
        }
      });
    }
  };
});


app.directive('setClassWhenAtTop', function($window) {

  var $win = angular.element($window);

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var classToAdd = attrs.setClassWhenAtTop;
      var offsetTop = element.prop('offsetTop');

      $win.on('scroll', function (e) {
				if ($win[0].scrollY >= offsetTop) {
					element.addClass(classToAdd);
        } else {
					element.removeClass(classToAdd);
        }
      });
    }
  };
});
