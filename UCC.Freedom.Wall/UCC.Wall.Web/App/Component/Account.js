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
var Account_1 = require("../Services/Account");
var Post_1 = require("../Services/Post");
var Notification_1 = require("../Services/Notification");
var Comment_1 = require("../Services/Comment");
var Comment_2 = require("../Models/Comment");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var AccountComponent = (function () {
    function AccountComponent(accountService, router, postService, commentService, notificationService) {
        this.accountService = accountService;
        this.router = router;
        this.postService = postService;
        this.commentService = commentService;
        this.notificationService = notificationService;
        this.accountStatus = 'Account';
        this.skip = 0;
        this.take = 2;
        this.statusRetrievePost = true;
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        $(document).ready(function () {
            $("time.timeago").timeago();
        });
        //     $.timeago.settings.strings.inPast = "time has elapsed";
        $.timeago.settings.allowPast = true;
        this.InitCKEDITOR();
        this.CheckLoggedIn();
        window.scrollTo(0, 0);
        this.RetrievePost(this.skip, this.take);
        $(window).scroll(function () {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                // ajax call get data from server and append to the div
                _this.skip += _this.take;
                _this.take = 2;
                _this.AddPostOnScrollDown(_this.skip, _this.take);
            }
        });
        this.RetrieveCommentHub();
    };
    AccountComponent.prototype.AddPostOnScrollDown = function (skip, take) {
        var _this = this;
        this.statusRetrievePost = true;
        if (this.statusRetrievePostResult != 0 || this.statusRetrievePost != true) {
            this.postService.Retrieve(skip, take).subscribe(function (data) {
                var postHandle = data.Posts;
                _this.listComments = data.Comments;
                _this.statusRetrievePostResult = postHandle.length;
                if (postHandle.length != 0) {
                    for (var i = 0; i < postHandle.length; i++) {
                        var getComments = _this.listComments.filter(function (x) { return x.PostID == postHandle[i].ID; });
                        postHandle[i].Comments = getComments;
                    }
                    for (var x = 0; x < postHandle.length; x++) {
                        _this.posts.push(postHandle[x]);
                    }
                }
                _this.statusRetrievePost = false;
            }, function (error) { return console.log(error); });
        }
        else {
            this.statusRetrievePost = false;
        }
    };
    AccountComponent.prototype.InitCKEDITOR = function () {
        var id = 'postdata';
        var instance = CKEDITOR.instances[id];
        if (instance) {
            CKEDITOR.remove(instance);
        }
        CKEDITOR.replace(id, {
            plugins: 'wysiwygarea,toolbar,sourcearea,image,basicstyles',
            on: {
                instanceReady: function () {
                    this.dataProcessor.htmlFilter.addRules({
                        elements: {
                            img: function (el) {
                                if (!el.attributes.class)
                                    el.attributes.class = 'blogimage';
                            }
                        }
                    });
                }
            }
        });
    };
    AccountComponent.prototype.AddNewPost = function () {
        var _this = this;
        var form = CKEDITOR.instances['postdata'].getData();
        console.log(form);
        if (form != "") {
            this.postService.AddPost(form).subscribe(function (data) {
                _this.posts.unshift(data);
                _this.Modal("modal-addpost", false);
                window.scrollTo(0, 0);
            }, function (error) { console.log(error); });
        }
        CKEDITOR.instances['postdata'].setData('');
    };
    AccountComponent.prototype.RetrievePost = function (skip, take) {
        var _this = this;
        this.statusRetrievePost = true;
        this.postService.Retrieve(skip, take).subscribe(function (data) {
            var postHandle = data.Posts;
            _this.listComments = data.Comments;
            for (var i = 0; i < postHandle.length; i++) {
                var getComments = _this.listComments.filter(function (x) { return x.PostID == postHandle[i].ID; });
                postHandle[i].Comments = getComments;
            }
            _this.posts = postHandle;
            _this.statusRetrievePost = false;
            _this.statusRetrievePostResult = postHandle.length;
            console.log("RAW DATA");
            console.log(data);
            console.log("Post Arranged");
            console.log(_this.posts);
            _this.pos = data;
        }, function (error) { console.log(error); _this.statusRetrievePost = false; });
    };
    AccountComponent.prototype.Login = function (form) {
        var _this = this;
        this.accountService.Login(form.value).subscribe(function (data) {
            console.log(data);
            _this.accountStatus = data.FirstName + " " + data.LastName;
            _this.accountID = data.ID;
            _this.Modal("modal-login", false);
            _this.RetrieveNotification(0, 10);
            //console.log("accountID: " + this.accountID);
        }, function (error) {
            _this.loginMessage = "Email or Password is Invalid. Please try again.";
            console.log(error);
        });
    };
    AccountComponent.prototype.LoadComment = function (post) {
        this.commentService.AddComment(post).subscribe(function (data) {
            console.log(data);
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
    AccountComponent.prototype.AddNewComment = function (commentContent, postID, postUserID) {
        var _this = this;
        var comment = new Comment_2.CommentModel(commentContent, postID);
        if (commentContent != "") {
            this.commentService.AddComment(comment).subscribe(function (data) {
                _this.SendCommentHub(data, postUserID);
                //for (var i in this.posts) {
                //    if (this.posts[i].ID == data.PostID) {
                //        this.posts[i].Comments.push(data);
                //        break;
                //    }
                //}
            }, function (error) { console.log(error); _this.postError = "Posting Failed. Please try Again."; });
        }
        $("input#commentInput").each(function () {
            $(this).val('');
        });
    };
    //PostId
    AccountComponent.prototype.FilterID = function (value) {
        return value.replace(/[^\w\s]/gi, '');
    };
    AccountComponent.prototype.CheckLoggedIn = function () {
        var _this = this;
        this.accountService.CheckLoggedIn().subscribe(function (data) {
            if (data.ID != null) {
                console.log(data);
                _this.accountStatus = data.UserName;
                _this.accountID = data.ID;
                _this.RetrieveNotification(0, 10);
            }
            else {
                _this.accountID = null;
            }
            //console.log("accountID: " + this.accountID);
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
            var offset = display.getTimezoneOffset();
            //return $.timeago((display.toUTCString()));   
            //var sd = display.toUTCString();
            //var sdd = display.setTime(display.getTime()-15);
            return $.timeago(display);
        }
    };
    AccountComponent.prototype.DeletePost = function (id) {
        var _this = this;
        this.skip = 0;
        this.take = 2;
        this.postService.Delete(id).subscribe(function (data) {
            _this.RetrievePost(_this.skip, _this.take);
        }, function (error) { return console.log(error); });
    };
    AccountComponent.prototype.Ini = function () {
        this.accountService.Init().subscribe(function (data) {
            console.log(data);
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
            }
        }, 100);
        //console.log(term)
        //this.postService.SearchPost(term).subscribe(data => {
        //    this.posts = data;
        //});
    };
    AccountComponent.prototype.ParseDOM = function (value) {
        var sd = value;
        $('.blogContent img').addClass('image-responsive');
        return sd;
    };
    AccountComponent.prototype.RetrieveCommentHub = function () {
        var _this = this;
        var commentHub = $.connection.comment;
        $.connection.hub.start();
        commentHub.client.broadcastComment = (function (comment, postUserID) {
            _this.unseenNotificationsCount++;
        });
    };
    AccountComponent.prototype.SendCommentHub = function (comment, postUserID) {
        var commentHub = $.connection.comment;
        commentHub.server.send(comment, postUserID);
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
    AccountComponent.prototype.RetrieveNotification = function (skip, take) {
        var _this = this;
        this.notificationService.Retrieve(skip, take).subscribe(function (data) {
            _this.notifications = data;
            _this.unseenNotificationsCount = data[0].UnseenCount;
        }, function (error) { return console.log(error); });
    };
    AccountComponent.prototype.SeenNotificaton = function () {
        var _this = this;
        this.notificationService.Seen().subscribe(function (data) {
            _this.unseenNotificationsCount = 0;
        }, function (error) { return console.log(error); });
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './TypeScripts/Partials/Account.html',
        providers: [Account_1.AccountService, Post_1.PostService, Comment_1.CommentService, Notification_1.NotificationService]
    }),
    __metadata("design:paramtypes", [Account_1.AccountService,
        router_1.Router,
        Post_1.PostService,
        Comment_1.CommentService,
        Notification_1.NotificationService])
], AccountComponent);
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=Account.js.map