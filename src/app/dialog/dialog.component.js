"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../SupplierPersonal.ts"/>
var core_1 = require("@angular/core");
var SupplierPersonal_1 = require("../SupplierPersonal");
var DialogComponent = /** @class */ (function () {
    function DialogComponent(dialogRef, af, afAuth) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.af = af;
        this.afAuth = afAuth;
        this.Supplier = new SupplierPersonal_1.SupplierPersonal();
        this.dateDropDwon = [];
        this.dateSelected = [];
        this.frequencyDropDwon = [];
        this.frequencySelected = [];
        this.dropdownSettings = {};
        this.frequencydropdownSettings = {};
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid;
            }
        });
    }
    DialogComponent.prototype.ngOnInit = function () {
        this.item = this.af.object("users/" + this.userId + "/suppliers/" + this.supplierKey);
        console.log('key is  ' + this.supplierKey);
        this.dateDropDwon = [
            { 'id': 0, 'itemName': 'יום ראשון' },
            { 'id': 1, 'itemName': 'יום שני' },
            { 'id': 2, 'itemName': 'יום שלישי' },
            { 'id': 3, 'itemName': 'יום רביעי' },
            { 'id': 4, 'itemName': 'יום חמישי' },
            { 'id': 5, 'itemName': 'יום שישי' },
            { 'id': 6, 'itemName': 'יום שבת' },
        ];
        this.frequencyDropDwon = [
            { 'id': 0, 'itemName': 'כל שבוע' },
            { 'id': 1, 'itemName': 'כל חודש' },
            { 'id': 2, 'itemName': 'פעם ב4 חודשים' },
            { 'id': 3, 'itemName': 'פעם בשנה' },
        ];
        this.dropdownSettings = {
            singleSelection: false,
            text: 'ימים',
            selectAllText: 'בחר הכל',
            unSelectAllText: 'הסר הכל',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };
        this.frequencydropdownSettings = {
            singleSelection: false,
            text: 'תדירות ההזמנה',
            selectAllText: 'בחר הכל',
            unSelectAllText: 'הסר הכל',
            enableSearchFilter: true,
            classes: 'myclass custom-class'
        };
    };
    DialogComponent.prototype.onfrequencySelect = function (frequency) {
        console.log(frequency.id);
        console.log(this.frequencySelected);
    };
    DialogComponent.prototype.OnfrequencyDeSelect = function (frequency) {
        console.log(frequency);
        console.log(this.frequencySelected);
    };
    DialogComponent.prototype.onfrequencySelectAll = function (frequencys) {
        console.log(frequencys);
    };
    DialogComponent.prototype.onfrequencyDeSelectAll = function (frequencys) {
        console.log(frequencys);
    };
    DialogComponent.prototype.onDateSelect = function (date) {
        console.log(date.id);
        console.log(this.dateSelected);
    };
    DialogComponent.prototype.OnDateDeSelect = function (date) {
        console.log(date);
        console.log(this.dateSelected);
    };
    DialogComponent.prototype.onDateSelectAll = function (dates) {
        console.log(dates);
    };
    DialogComponent.prototype.onDateDeSelectAll = function (dates) {
        console.log(dates);
    };
    DialogComponent.prototype.BuildSupplier = function (name, email, SupplierNum, ClientNum, OfficeNumber, PhoneNumber, type) {
        this.Supplier.name = name;
        this.Supplier.ClientNum = ClientNum;
        this.Supplier.email = email;
        this.Supplier.OfficeNumber = OfficeNumber;
        this.Supplier.PhoneNumber = PhoneNumber;
        this.Supplier.SupplierNum = SupplierNum;
        this.Supplier.frequency = this.frequencySelected;
        this.Supplier.date = this.dateSelected;
        this.Supplier.type = type;
        this.updateItem(this.Supplier);
    };
    DialogComponent.prototype.updateItem = function (Supplier) {
        for (var i = 0; i < this.dateSelected.length; i++) {
            this.datePathFirebase = this.af.list("/users/" + this.userId + "/datesSuppliers");
            console.log(this.dateSelected[i].id);
        }
        this.item.set(Supplier);
        this.closeDialog();
    };
    DialogComponent.prototype.deleteItem = function () {
        this.item.remove();
        this.closeDialog();
    };
    DialogComponent.prototype.closeDialog = function () {
        this.dialogRef.close();
    };
    __decorate([
        core_1.Input()
    ], DialogComponent.prototype, "supplierKeyPass", void 0);
    DialogComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog',
            templateUrl: './dialog.component.html',
            styleUrls: ['./dialog.component.css']
        })
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
