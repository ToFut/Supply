"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SupplierService = /** @class */ (function () {
    function SupplierService(db, afAuth, af) {
        var _this = this;
        this.db = db;
        this.afAuth = afAuth;
        this.af = af;
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userId = user.uid;
            }
        });
    }
    SupplierService.prototype.ngOnInit = function () {
        console.log(this.userId);
    };
    SupplierService.prototype.getSupplier = function (start, end) {
        return this.db.list("users/" + this.userId + "/supplier", {
            query: {
                orderByChild: 'name',
                limitToFirst: 20,
                startAt: start,
                endAt: end
            }
        });
    };
    SupplierService = __decorate([
        core_1.Injectable()
    ], SupplierService);
    return SupplierService;
}());
exports.SupplierService = SupplierService;
