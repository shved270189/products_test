!function(){"use strict";angular.module("productsTestAngular",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap"])}(),function(){"use strict";function t(){return{restrict:"C",templateUrl:"app/components/product/product.html",scope:{product:"=",index:"="},controller:"ProductController",controllerAs:"prod"}}angular.module("productsTestAngular").directive("productRow",t)}(),function(){"use strict";function t(t,r){t.isEditing=!1;var e=r.clone(t.product);t.startEdit=function(){t.isEditing=!0},t.stopEdit=function(){t.isEditing=!1,n()};var n=function(){t.product.name=e.name,t.product.sku=e.sku,t.product.category=e.category};t.updateProduct=function(){t.nameForm.name.$valid&&t.skuForm.sku.$valid&&t.categoryForm.category.$valid&&t.product.$update().then(function(){t.isEditing=!1,e=r.clone(t.product)},function(){})}}angular.module("productsTestAngular").controller("ProductController",t),t.$inject=["$scope","_"]}(),function(){"use strict";function t(t,r,e){r.searchCategory="",r.paginatedProductsList=[],r.filteredProductsList=[],r.productsList=[],r.itemsPerPage=10,r.totalItems=0,r.currentPage=1,r.editProductIds=[],t.all().$promise.then(function(t){r.productsList=t,r.filterProducts()}),r.pageChanged=function(){var t=(r.currentPage-1)*r.itemsPerPage,e=t+r.itemsPerPage;r.paginatedProductsList=r.filteredProductsList.slice(t,e)},r.filterProducts=function(){r.filteredProductsList=r.searchCategory.length>0?e.filter(r.productsList,function(t){return t.category===r.searchCategory}):r.productsList,r.currentPage=1,r.totalItems=r.filteredProductsList.length,r.pageChanged()},r.resetSearch=function(){r.searchCategory="",r.filteredProductsList=r.productsList,r.currentPage=1,r.totalItems=r.filteredProductsList.length,r.pageChanged()}}angular.module("productsTestAngular").controller("MainController",t),t.$inject=["Products","$scope","_"]}(),function(){"use strict";function t(t){return t._}angular.module("productsTestAngular").factory("_",t),t.$inject=["$window"]}(),function(){"use strict";function t(t,r){var e=r(t+"/products/:productId",{productId:"@id"},{update:{method:"PUT"}}),n=function(){return e.query()};return{all:n}}angular.module("productsTestAngular").factory("Products",t),t.$inject=["domain_name","$resource"]}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("productsTestAngular").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t,r){t.state("products",{url:"/products",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),r.otherwise("/products")}angular.module("productsTestAngular").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("productsTestAngular").constant("domain_name","/api/v1")}(),function(){"use strict";function t(t){t.debugEnabled(!0)}angular.module("productsTestAngular").config(t),t.$inject=["$logProvider"]}(),angular.module("productsTestAngular").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="container"><div class="row"><div class="col-md-12"><form class="form-inline"><div class="form-group"><input type="text" class="form-control" id="search" placeholder="Category" ng-model="searchCategory"></div><a class="btn btn-primary" ng-click="filterProducts()">Search</a> <a class="btn btn-default" ng-click="resetSearch()">Reset</a></form></div></div><div class="row"><div class="col-md-12"><table class="table table-bordered"><th>#</th><th>Name</th><th>SKU</th><th>Category</th><th>Actions</th><tr ng-repeat="product in paginatedProductsList" class="product-row" product="product" index="(currentPage - 1) * itemsPerPage + $index + 1"></tr></table></div></div><div class="row"><div class="col-lg-12"><pagination ng-show="totalItems > itemsPerPage" items-per-page="itemsPerPage" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged()"></pagination></div></div></div>'),t.put("app/components/product/product.html",'<td>{{index}}</td><td><span ng-show="!isEditing">{{product.name}}</span><form name="nameForm" ng-show="isEditing"><input type="text" ng-model="product.name" name="name" required=""><div role="alert"><span class="error" ng-show="nameForm.name.$error.required">Required!</span></div></form></td><td><span ng-show="!isEditing">{{product.sku}}</span><form name="skuForm" ng-show="isEditing"><input type="text" ng-model="product.sku" name="sku" required=""><div role="alert"><span class="error" ng-show="skuForm.sku.$error.required">Required!</span></div></form></td><td><span ng-show="!isEditing">{{product.category}}</span><form name="categoryForm" ng-show="isEditing"><input type="text" ng-model="product.category" name="category" required=""><div role="alert"><span class="error" ng-show="categoryForm.category.$error.required">Required!</span></div></form></td><td><a class="btn btn-default" ng-click="startEdit()" ng-show="!isEditing">Edit</a> <a class="btn btn-primary" ng-click="updateProduct()" ng-show="isEditing">Save</a> <a class="btn btn-default" ng-click="stopEdit()" ng-show="isEditing">Cancel</a></td>')}]);