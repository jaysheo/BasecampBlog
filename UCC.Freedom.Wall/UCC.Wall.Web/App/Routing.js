"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//import { DashboardComponent } from './Component/Dashboard';
var Account_1 = require("./Component/Account");
var Post_1 = require("./Component/Post");
//import { AddProductComponent } from './Component/AddProduct';
//import { Authorize } from './Security/Session/Authorize';
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: Account_1.AccountComponent },
    { path: 'post', component: Post_1.PostComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule],
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
exports.routingComponents = [
    //DashboardComponent,
    Account_1.AccountComponent,
    Post_1.PostComponent
];
//# sourceMappingURL=Routing.js.map