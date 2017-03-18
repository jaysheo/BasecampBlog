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
var core_1 = require('@angular/core');
var Account_1 = require('../Services/Account');
var Post_1 = require('../Services/Post');
var Comment_1 = require('../Services/Comment');
var Comment_2 = require('../Models/Comment');
var router_1 = require('@angular/router');
require('rxjs/add/operator/map');
var AccountComponent = (function () {
    function AccountComponent(accountService, router, postService, commentService) {
        this.accountService = accountService;
        this.router = router;
        this.postService = postService;
        this.commentService = commentService;
        this.accountStatus = 'Account';
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.CheckLoggedIn();
        window.scrollTo(0, 0);
    };
    AccountComponent.prototype.AddNewPost = function (form) {
        var _this = this;
        this.postService.AddPost(form.value).subscribe(function (data) {
            console.log('success');
            form.reset();
            _this.RetrievePost();
            _this.Modal("modal-addpost", false);
        }, function (error) { console.log(error); });
    };
    AccountComponent.prototype.RetrievePost = function () {
        var _this = this;
        this.postService.Retrieve().subscribe(function (data) {
            _this.posts = data.Posts;
            console.log(data);
        }, function (error) { return console.log(error); });
    };
    AccountComponent.prototype.Login = function (form) {
        var _this = this;
        this.accountService.Login(form.value).subscribe(function (data) {
            console.log(data);
            _this.accountStatus = data.FirstName + " " + data.LastName;
            _this.accountID = data.ID;
            _this.Modal("modal-login", false);
            console.log("accountID: " + _this.accountID);
        }, function (error) {
            _this.loginMessage = "Email or Password is Invalid. Please try again.";
            console.log(error);
        });
    };
    AccountComponent.prototype.SignUp = function (form) {
        var _this = this;
        if (form.value != null) {
            this.accountService.SignUp(form.value).subscribe(function (data) {
                if (data != false) {
                    _this.signUpMessage = 'User successfuly Added.';
                    console.log(form.value);
                    _this.Login(form);
                    form.reset();
                    _this.Modal("modal-signup", false);
                }
                else
                    _this.signUpMessage = "Adding user Failed. Please try again";
            }, function (error) {
                console.log(error);
            });
        }
    };
    AccountComponent.prototype.AddNewComment = function (commentContent, postID) {
        var _this = this;
        var comment = new Comment_2.CommentModel(commentContent, postID);
        console.log(comment);
        this.commentService.AddComment(comment).subscribe(function (data) {
            _this.RetrievePost();
        }, function (error) { console.log(error); });
    };
    AccountComponent.prototype.CheckLoggedIn = function () {
        var _this = this;
        this.accountService.CheckLoggedIn().subscribe(function (data) {
            if (data.ID != null) {
                console.log(data);
                _this.accountStatus = data.UserName;
                _this.accountID = data.ID;
                console.log("accountID: " + _this.accountID);
            }
            else {
                _this.accountID = null;
            }
            _this.RetrievePost();
            console.log("accountID: " + _this.accountID);
        });
    };
    AccountComponent.prototype.Logout = function () {
        var _this = this;
        console.log('logout');
        this.accountService.Logout().subscribe(function (data) {
            _this.accountStatus = "Account";
            _this.accountID = "";
        });
    };
    AccountComponent.prototype.ParseDate = function (date) {
        if (date != null) {
            var getDate = date.replace(/[^0-9\.]/g, '');
            var display = new Date(parseInt(getDate));
            return display.toDateString();
        }
    };
    AccountComponent.prototype.DeletePost = function (id) {
        var _this = this;
        this.postService.Delete(id).subscribe(function (data) {
            _this.RetrievePost();
        }, function (error) { return console.log(error); });
    };
    AccountComponent.prototype.SearchChange = function (term) {
        var _this = this;
        setTimeout(function () {
            if (term != null) {
                _this.postService.SearchPost(term).subscribe(function (data) {
                    _this.posts = data;
                });
            }
            else {
                _this.RetrievePost();
            }
        }, 100);
        //console.log(term)
        //this.postService.SearchPost(term).subscribe(data => {
        //    this.posts = data;
        //});
    };
    AccountComponent.prototype.Modal = function (modalName, toggle) {
        var name = "#" + modalName;
        if (toggle == false) {
            $(name).modal("hide");
        }
        else {
            $(name).modal("show");
        }
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './TypeScripts/Partials/Account.html',
            providers: [Account_1.AccountService, Post_1.PostService, Comment_1.CommentService]
        }), 
        __metadata('design:paramtypes', [Account_1.AccountService, router_1.Router, Post_1.PostService, Comment_1.CommentService])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=Account.js.map