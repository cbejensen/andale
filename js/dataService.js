var app = angular.module('andale')
  .service('dataService', ['$http', '$firebaseArray', function($http, $firebaseArray) {

    var ref = new Firebase("https://andale.firebaseio.com/");
    var firebaseBrands = $firebaseArray(ref.child('brands/'));
    var firebaseProducts = $firebaseArray(ref.child('products/'));

    this.brands = firebaseBrands;
    this.products = firebaseProducts;

    function removeItem(item, array) {
      array.$remove(item).then(function(ref) {
        console.log('Deleted:', item.name, ref)
      });
    }

    function removeImgBlanks(arr) {
      if (arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
          if (!arr[i]) arr.splice(i, 1);
        }
      }
    }

    function removeFaqBlanks(arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        if (!arr[i].question || !arr[i].answer) {
          arr.splice(i, 1);
        }
      }
    }

    function confirmation(error) {
      if (error) {
        alert("Data could not be saved. Please try again.\nError: " + error);
      } else {
        alert("Data added succesfully!");
      }
    }

    // BRAND
    this.addBrand = function(brand) {
      var write = true;
      // check if brand exists
      ref.child('brands').once('value', function(snapshot) {
        var brandExists = snapshot.child(brand.name.toLowerCase()).exists();
        if (brandExists) {
          var save = confirm('A brand with this name already exists. Do you want to overwrite it?')
          if (!save) {
            write = false;
          }
        }
      })
      if (write) {
        var path = 'brands/' + brand.name.toLowerCase();
        for (var key in brand) {
          if (!brand[key]) delete brand[key];
        }
        ref.child(path).set(brand, confirmation);
        console.log('Added new brand:', brand);
      }
    }

    this.saveBrand = function(newBrand, oldBrand) {
      newBrand = {
        name: newBrand.name,
        logo: newBrand.logo,
        phone: newBrand.phone,
        showName: newBrand.showName,
        url: newBrand.url,
        products: newBrand.products
      }
      for (var key in newBrand) { //delete undefined keys as Firebase won't accept
        if (!newBrand[key]) delete newBrand[key];
      }
      if (oldBrand.name !== newBrand.name) {
        for (var key in newBrand.products) {
          firebaseProducts.forEach(function(e, i, a) {
            if (e.name.toLowerCase() === key) {
              e.brand = newBrand.name.toLowerCase();
              a.$save(e);
            }
          })
        }
        ref.child('brands/' + oldBrand.name.toLowerCase()).remove();
      }
      ref.child('brands/' + newBrand.name.toLowerCase()).set(newBrand);
    }

    this.removeBrand = function(brand) {
      var confirmation = confirm('Are you sure you want to delete \'' + brand.name + '\'?\n' +
        'This will also delete all of this brand\'s products.')
      if (confirmation) {
        for (var product in brand.products) {
          var prod = firebaseProducts.$getRecord(product);
          removeItem(prod, firebaseProducts)
        }
        removeItem(brand, firebaseBrands)
        return true;
      }
      return false;
    }

    // PRODUCT
    this.addProduct = function(product) {
      var write = true;
      // check if product exists
      ref.child('products').once("value", function(snapshot) {
        var productExists = snapshot.child(product.name.toLowerCase()).exists();
        if (productExists) {
          var save = confirm('A product with this name already exists. Do you want to overwrite it?')
          if (!save) {
            write = false;
          }
        }
      })
      if (write) {
        product.brand = product.brand.toLowerCase();
        removeImgBlanks(product.images);
        removeFaqBlanks(product.faqs);
        ref.child('products').child(product.name.toLowerCase()).set(product, confirmation);
        ref.child('brands/' + product.brand + '/products/' +
									product.name.toLowerCase()).set(product.name.toLowerCase())
        return true;
      } else {
        return false;
      }
    }

    this.saveProduct = function(product, oldProduct) {
      product = {
        brand: product.brand,
        name: product.name,
        subtitle: product.subtitle,
        url: product.url,
        manualUrl: product.manualUrl,
        images: product.images,
        specs: product.specs,
        faqs: product.faqs,
        warranty: product.warranty
      }
      for (var key in product) { //delete undefined keys as Firebase won't accept
        if (!product[key]) delete product[key];
      }
      if (product.images) removeImgBlanks(product.images);
      if (product.faqs) removeFaqBlanks(product.faqs);
      ref.child('products/' + oldProduct.name.toLowerCase()).remove();
      ref.child('products/' + product.name.toLowerCase()).set(product);
      if (product.name !== oldProduct.name) {
        var path = 'brands/' + product.brand + '/products/';
        ref.child(path + oldProduct.name.toLowerCase()).remove();
        ref.child(path + product.name.toLowerCase()).set(product.name.toLowerCase());
      }
      return true;
    }

    this.removeProduct = function(product) {
      var confirmation = confirm('Are you sure you want to delete ' + product.name + '?')
      if (confirmation) {
        var path = 'brands/' + product.brand + '/products/' + product.name.toLowerCase();
        ref.child(path).remove(); // delete product from brand
        ref.child(path).remove();
        removeItem(product, firebaseProducts);
        return true;
      }
      return false;
    }

  }]);
