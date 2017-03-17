"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ "Content-Type": "application/json" });
    }
    PostService.prototype.Retrieve = function () {
        return this.http.get("Post/Retrieve", { headers: this.headers })
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PostService.prototype.AddPost = function (post) {
        return this.http.post("Post/Create", JSON.stringify(post), { headers: this.headers })
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PostService.prototype.SearchPost = function (post) {
        return this.http.get("Post/Search?term=" + post, { headers: this.headers })
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PostService.prototype.Delete = function (id) {
        return this.http.post("Post/Delete", JSON.stringify({ ID: id }), { headers: this.headers })
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    PostService.prototype.handleError = function (error) {
        return Rx_1.Observable.throw(error);
    };
    PostService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
//# sourceMappingURL=Post.js.map