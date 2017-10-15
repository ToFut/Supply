"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialog_component_1 = require("../dialog/dialog.component");
var show_all_supplier_component_1 = require("../show-all-supplier/show-all-supplier.component");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/take");
var SupplierComponent = /** @class */ (function () {
    function SupplierComponent(afAuth, af, dialog, SupplierService) {
        var _this = this;
        this.afAuth = afAuth;
        this.af = af;
        this.dialog = dialog;
        this.SupplierService = SupplierService;
        this.lastKeypress = 0;
        this.startWith = new Subject_1.Subject();
        this.endWith = new Subject_1.Subject();
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid;
                _this.items = _this.af.list("users/" + _this.userId + "/suppliers");
            }
        });
    }
    SupplierComponent.prototype.ngOnInit = function () { };
    SupplierComponent.prototype.showListOfAllDB = function () {
        console.log(this.userId);
        return this.items;
    };
    SupplierComponent.prototype.search = function ($event) {
        if ($event.timeStamp - this.lastKeypress > 200) {
            var q = $event.target.value;
            this.startWith.next(q);
            this.endWith.next(q + '\uf8ff');
        }
        this.lastKeypress = $event.timeStamp;
    };
    SupplierComponent.prototype.addItem = function () {
        this.items = this.af.list("users/" + this.userId + "/suppliers");
        var newRefToNewProduct = this.items.push({ name: '' });
        var newProductKey = newRefToNewProduct.key;
        this.openDialogEditSupplier(newProductKey);
    };
    SupplierComponent.prototype.deleteEverything = function () {
        this.items.remove();
    };
    SupplierComponent.prototype.openDialogEditSupplier = function (key) {
        var dialogRef = this.dialog.open(dialog_component_1.DialogComponent, {
            width: '600px',
            height: '600px'
        });
        dialogRef.componentInstance.supplierKey = key;
        console.log('this ket is: ' + key);
    };
    SupplierComponent.prototype.openDialogShowSupplier = function (key) {
        var dialogRef = this.dialog.open(show_all_supplier_component_1.ShowAllSupplierComponent, {
            width: '600px',
            height: '600px'
        });
        dialogRef.componentInstance.key = key;
        console.log('this ket is: ' + key);
    };
    SupplierComponent = __decorate([
        core_1.Component({
            selector: 'app-supplier',
            templateUrl: './supplier.component.html',
            styleUrls: ['./supplier.component.css'],
        })
    ], SupplierComponent);
    return SupplierComponent;
}());
exports.SupplierComponent = SupplierComponent;
