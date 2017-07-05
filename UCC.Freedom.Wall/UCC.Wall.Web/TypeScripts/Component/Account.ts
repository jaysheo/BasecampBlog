import { Component } from '@angular/core';
import { AccountService } from '../Services/Account';
import { PostService } from '../Services/Post';
import { NotificationService } from '../Services/Notification';
import { CommentService } from '../Services/Comment';
import { UserModel } from '../Models/User';
import { CommentModel } from '../Models/Comment';
import { Observable } from 'rxjs/Rx';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
declare var $: any;
declare var CKEDITOR: any;


@Component({
    selector: 'my-app',
    templateUrl: './TypeScripts/Partials/Account.html',
    providers: [AccountService, PostService, CommentService,NotificationService]
})
export class AccountComponent {

    public listPosts: any[];
    public posts: any[];
    public listComments: any[];
    public comment: any[];

    constructor(
        private accountService: AccountService,
        private router: Router,
        private postService: PostService,
        private commentService: CommentService,
        private notificationService: NotificationService) { }

    private loginMessage: string;
    private signUpMessage: string;
    private accountStatus: string = 'Account';
    private accountID: string;
    private postError: string;

    private skip: number = 0;
    private take: number = 2;
    private statusRetrievePost: boolean = true;
    private statusRetrievePostResult: number;
    private notifications: any[];
    private unseenNotificationsCount: any;

    private pos;

    ngOnInit(): any {

        $(document).ready(function () {
            $("time.timeago").timeago();
        });

   //     $.timeago.settings.strings.inPast = "time has elapsed";
       $.timeago.settings.allowPast = true;
       
        this.InitCKEDITOR();
        this.CheckLoggedIn();
        window.scrollTo(0, 0);
        this.RetrievePost(this.skip,this.take);   
        $(window).scroll(() => {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                // ajax call get data from server and append to the div
                this.skip += this.take;
                this.take = 2;
              this.AddPostOnScrollDown(this.skip, this.take);


            }
        });
        this.RetrieveCommentHub();

      
       
    }


    AddPostOnScrollDown(skip: number, take: number) {
        this.statusRetrievePost = true;
        if (this.statusRetrievePostResult != 0 || this.statusRetrievePost != true){
            this.postService.Retrieve(skip, take).subscribe(data => {

                let postHandle: any[] = data.Posts;
                this.listComments = data.Comments;
                this.statusRetrievePostResult = postHandle.length;
             
                if (postHandle.length != 0) {
                    for (var i = 0; i < postHandle.length; i++) {
                        let getComments = this.listComments.filter(x => x.PostID == postHandle[i].ID);
                        postHandle[i].Comments = getComments;
                    }

                    for (var x = 0; x < postHandle.length; x++) {
                        this.posts.push(postHandle[x]);
                    }

                }
                this.statusRetrievePost = false;


            }, error => console.log(error));
        } else {
            this.statusRetrievePost = false;
        }

       
    }

    InitCKEDITOR() {
        var id = 'postdata'
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
    }    


    AddNewPost() {
        let form: any = CKEDITOR.instances['postdata'].getData();
        console.log(form);
        if (form != "") {
            this.postService.AddPost(form).subscribe(data => {

              
                this.posts.unshift(data);
                this.Modal("modal-addpost", false);
                window.scrollTo(0,0);
            }, error => { console.log(error) });

        }

        CKEDITOR.instances['postdata'].setData('');
       
    }

    RetrievePost(skip:number,take:number): any{
        this.statusRetrievePost = true;
       this.postService.Retrieve(skip,take).subscribe(data => {
          
          let postHandle:any[] = data.Posts;
          this.listComments = data.Comments;
           

           for (var i = 0; i < postHandle.length; i++){
               let getComments = this.listComments.filter(x => x.PostID == postHandle[i].ID);
               postHandle[i].Comments = getComments;
          }
           this.posts = postHandle;
           this.statusRetrievePost = false;
           this.statusRetrievePostResult = postHandle.length;
           console.log("RAW DATA")
           console.log(data);
           console.log("Post Arranged");
           console.log(this.posts);
           this.pos = data;

       }, error => { console.log(error); this.statusRetrievePost = false; });
    }

   

    Login(form: NgForm) {


        this.accountService.Login(form.value).subscribe(data => {
            console.log(data);
            this.accountStatus = data.FirstName + " " + data.LastName;
            this.accountID = data.ID;
            this.Modal("modal-login", false);
            this.RetrieveNotification(0,10);
            //console.log("accountID: " + this.accountID);

        }, error => {
            this.loginMessage = "Email or Password is Invalid. Please try again.";
            console.log(error);
        });

    }


    public LoadComment(post:CommentModel) {
        this.commentService.AddComment(post).subscribe(data => {
            console.log(data);

        })
    }


    SignUp(form: NgForm) {
        if (form.value != null) {

            this.accountService.SignUp(form.value).subscribe(data => {
                if (data != false) {
                    this.signUpMessage = 'User successfuly Added.';
                    console.log(form.value);
                    this.Login(form);
                    form.reset();
                    this.Modal("modal-signup", false);
                   
                }

                else
                    this.signUpMessage = "Adding user Failed. Please try again";



            }, error => {

                console.log(error);

            });

        }




    }

    AddNewComment(commentContent:string, postID:string, postUserID:string) {
        let comment = new CommentModel(commentContent, postID);

        if (commentContent != "") {
           
            this.commentService.AddComment(comment).subscribe(data => {
                
                
                this.SendCommentHub(data, postUserID);
              
                //for (var i in this.posts) {
                //    if (this.posts[i].ID == data.PostID) {
                //        this.posts[i].Comments.push(data);
                //        break;
                //    }

                //}


            }, error => { console.log(error); this.postError = "Posting Failed. Please try Again." });
        }

        $("input#commentInput").each(function () {
            $(this).val('');
        })

    }
    //PostId
    FilterID(value:string):string {
       return value.replace(/[^\w\s]/gi, '');
    }
  

    CheckLoggedIn() {
        this.accountService.CheckLoggedIn().subscribe(data => {

            if (data.ID != null) {
                console.log(data);
                this.accountStatus = data.UserName;
                this.accountID = data.ID
                this.RetrieveNotification(0,10);
                ////console.log("accountID: " + this.accountID);
            } else {
                this.accountID = null;
            }

         
        
            //console.log("accountID: " + this.accountID);
        });
       
    }

    Logout() {
        console.log('logout');
        this.accountService.Logout().subscribe(data => {
            this.accountStatus = "Account";
            this.accountID = "";
        })
    }


    ParseDate(date:any):any {

        if (date != null) {
            var getDate = date.replace(/[^0-9\.]/g, '');
            var display = new Date(parseInt(getDate));
            var offset = display.getTimezoneOffset();
          
            //return $.timeago((display.toUTCString()));   
            //var sd = display.toUTCString();
            //var sdd = display.setTime(display.getTime()-15);
            return $.timeago(display);
            
           // return display.toDateString();
        }

       
    }

    DeletePost(id: string) {

        this.skip = 0;
        this.take = 2;
        this.postService.Delete(id).subscribe(data => {
            this.RetrievePost(this.skip,this.take);
        },error=> console.log(error));
    }

    Ini() {
        this.accountService.Init().subscribe(data => {
            console.log(data);
        }, error => console.log(error));
    }


    SearchChange(term: string) {
        setTimeout(() => {
            if (term != null){
                this.postService.SearchPost(term).subscribe(data => {
                    this.posts = data;
                });
            } else {
               // this.RetrievePost();
            }
          

        }, 100);

        //console.log(term)
        //this.postService.SearchPost(term).subscribe(data => {
        //    this.posts = data;
        //});

       
       
    }


    ParseDOM(value:any): any {
        
        let sd = value;
        $('.blogContent img').addClass('image-responsive');
        return sd;

    }

    RetrieveCommentHub() {
        var commentHub = $.connection.comment;
        $.connection.hub.start();
        commentHub.client.broadcastComment = ((comment, postUserID) => {
            this.unseenNotificationsCount++;
        });
    }
    SendCommentHub(comment:CommentModel,postUserID) {
        var commentHub = $.connection.comment;
        commentHub.server.send(comment,postUserID);
       
    }


    Modal(modalName: string, toggle: boolean) {
        let name: string = "#" + modalName;
       
        if (toggle== false){
            $(name).modal("hide");
        } else {
            $(name).modal("show");

        }
       
    }

    RetrieveNotification(skip:number, take:number) {

        this.notificationService.Retrieve(skip, take).subscribe(data => {
            this.notifications = data;
            this.unseenNotificationsCount = data[0].UnseenCount;
        }, error => console.log(error));
    }

    SeenNotificaton() {
        this.notificationService.Seen().subscribe(data => {
            this.unseenNotificationsCount = 0;
        }, error => console.log(error));
    }
   
}