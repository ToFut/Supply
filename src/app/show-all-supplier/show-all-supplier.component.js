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
var dialog_component_1 = require("../dialog/dialog.component");
var ShowAllSupplierComponent = /** @class */ (function () {
    function ShowAllSupplierComponent(dialogRef, af, afAuth, dialog, router) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.af = af;
        this.afAuth = afAuth;
        this.dialog = dialog;
        this.router = router;
        this.Product = new ProductOptions_1.ProductOptions();
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid;
            }
        });
    }
    ShowAllSupplierComponent.prototype.editSupplier = function () {
        var dialogRef = this.dialog.open(dialog_component_1.DialogComponent, {
            width: '600px',
            height: '600px'
        });
        dialogRef.componentInstance.supplierKey = this.key;
    };
    ShowAllSupplierComponent.prototype.ngOnInit = function () {
        this.infoSupply = this.af.object("users/" + this.userId + "/suppliers/" + this.key);
        console.log('key is constratcor ' + this.key);
    };
    ShowAllSupplierComponent.prototype.deleteItem = function () {
        this.infoSupply.remove();
        this.closeDialog();
    };
    ShowAllSupplierComponent.prototype.associateProduct = function () {
        var navigationExtras = {
            queryParams: {
                'userId': this.userId,
                'supplierKey': this.key
            }
        };
        this.router.navigate(['correctSupplierProducts'], navigationExtras);
        console.log('userId' + this.userId + ' supplier key ' + this.key);
        this.closeDialog();
    };
    ShowAllSupplierComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    ShowAllSupplierComponent = __decorate([
        core_1.Component({
            selector: 'app-show-all-supplier',
            templateUrl: './show-all-supplier.component.html',
            styleUrls: ['./show-all-supplier.component.css']
        })
    ], ShowAllSupplierComponent);
    return ShowAllSupplierComponent;
}());
exports.ShowAllSupplierComponent = ShowAllSupplierComponent;
