"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProductOptions_1 = require("../ProductOptions");
var DialogEditProductsComponent = /** @class */ (function () {
    function DialogEditProductsComponent(dialogRef, af, afAuth) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.af = af;
        this.afAuth = afAuth;
        this.securing = [
            'public',
            'private',
        ];
        this.Product = new ProductOptions_1.ProductOptions();
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid;
            }
        });
    }
    DialogEditProductsComponent.prototype.ngOnInit = function () {
        this.productFirebaseRef = this.af.list("/products");
        console.log('key is ' + this.ProductKey + ' supplier key ' + this.SupplierKey + 'user id : ' + this.userId);
    };
    DialogEditProductsComponent.prototype.BuildProductForAllDB = function (ProductName, ProductNumber, UnitOfMeasure, price, discount, UnitInPackaging, MinInInventory, model, comments) {
        this.Product.ProductName = ProductName;
        this.Product.ProductNumber = ProductNumber;
        this.Product.UnitOfMeasure = UnitOfMeasure;
        this.Product.price = price;
        this.Product.discount = discount;
        this.Product.UnitInPackaging = UnitInPackaging;
        this.Product.MinInInventory = MinInInventory;
        this.Product.model = model;
        this.Product.comments = comments;
        console.log('BuildProductForAllDB');
        this.updateItem(this.Product);
    };
    DialogEditProductsComponent.prototype.updateItem = function (Product) {
        this.productFirebaseRef.push(Product);
        console.log('updated ');
        this.closeDialog();
    };
    DialogEditProductsComponent.prototype.deleteItem = function () {
        this.productFirebaseRef.remove();
        this.closeDialog();
    };
    DialogEditProductsComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    DialogEditProductsComponent.prototype.imageFinishedUploading = function (file) {
        console.log(JSON.stringify(file.serverResponse));
    };
    DialogEditProductsComponent.prototype.uploadStateChange = function () {
    };
    DialogEditProductsComponent.prototype.imageRemoved = function (file) {
        // do some stuff with the removed file.
    };
    DialogEditProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-edit-products',
            templateUrl: './dialog-edit-products.component.html',
            styleUrls: ['./dialog-edit-products.component.css']
        })
    ], DialogEditProductsComponent);
    return DialogEditProductsComponent;
}());
exports.DialogEditProductsComponent = DialogEditProductsComponent;
