"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OrderComponent = /** @class */ (function () {
    function OrderComponent(af, afAuth) {
        var _this = this;
        this.af = af;
        this.afAuth = afAuth;
        this.viewDate = new Date();
        this.today = Date.now();
        this.day = this.viewDate.getDay();
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid;
            }
        });
        this.searchItem();
    }
    OrderComponent.prototype.searchItem = function () {
        this.items = this.af.list("/users/" + this.userId + "/datesSuppliers/", {
            query: {
                orderByChild: 'date',
                orderByValue: true,
                equalTo: 0
            }
        });
        console.log(this.items.$ref);
    };
    OrderComponent.prototype.ngOnInit = function () {
        console.log('today is : ' + this.day);
        this.searchItem();
    };
    OrderComponent = __decorate([
        core_1.Component({
            selector: 'app-order',
            templateUrl: './order.component.html',
            styleUrls: ['./order.component.css'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
