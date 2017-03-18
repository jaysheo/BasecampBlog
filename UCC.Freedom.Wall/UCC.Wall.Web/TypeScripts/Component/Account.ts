import { Component } from '@angular/core';
import { AccountService } from '../Services/Account';
import { PostService } from '../Services/Post';
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
    providers: [AccountService, PostService, CommentService]
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
        private commentService: CommentService) { }

    private loginMessage: string;
    private signUpMessage: string;
    private accountStatus: string = 'Account';
    private accountID: string;
    private postError: string;

    ngOnInit(): any {

      
        this.InitCKEDITOR();
        this.CheckLoggedIn();
        window.scrollTo(0, 0);
      
    }

    InitCKEDITOR() {
        CKEDITOR.replace('postdata', {
            plugins: 'wysiwygarea,toolbar,sourcearea,image,basicstyles,video',
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

                CKEDITOR.instances['postdata'].setData('');
                this.posts.unshift(data);
                this.Modal("modal-addpost", false)
            }, error => { console.log(error) });

        }
       
       
    }

    RetrievePost(): any{
       
       this.postService.Retrieve().subscribe(data => {
          
          let postHandle:any[] = data.Posts;
          this.listComments = data.Comments;
           

           for (var i = 0; i < postHandle.length; i++){
               let getComments = this.listComments.filter(x => x.PostID == postHandle[i].ID);
               postHandle[i].Comments = getComments;
          }
           this.posts = postHandle;
           //console.log("RAW DATA")
           //console.log(data);
           //console.log("Post Arranged");
           //console.log(this.posts);

        }, error => console.log(error));
    }

   

    Login(form: NgForm) {


        this.accountService.Login(form.value).subscribe(data => {
            console.log(data);
            this.accountStatus = data.FirstName + " " + data.LastName;
            this.accountID = data.ID;
            this.Modal("modal-login", false);
            //console.log("accountID: " + this.accountID);

        }, error => {
            this.loginMessage = "Email or Password is Invalid. Please try again.";
            console.log(error);
        });

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

    AddNewComment(commentContent:string, postID:string, event:any) {
        let comment = new CommentModel(commentContent, postID);

        if (commentContent != ""){
            this.commentService.AddComment(comment).subscribe(data => {

          
                $("input#commentInput").each(function () {
                    $(this).val('');
                })
                      


                for (var i in this.posts) {
                    if (this.posts[i].ID == data.PostID) {
                        this.posts[i].Comments.push(data);
                        break;
                    }

                }


            }, error => { console.log(error); this.postError = "Posting Failed. Please try Again." });
        }
      

    }

    ClearComment(e) {
     
            var enterKey = 13;
            if (e.which == enterKey) {
                $(this).val('');
          
        }
    }

    CheckLoggedIn() {
        this.accountService.CheckLoggedIn().subscribe(data => {

            if (data.ID != null) {
                console.log(data);
                this.accountStatus = data.UserName;
                this.accountID = data.ID
                ////console.log("accountID: " + this.accountID);
            } else {
                this.accountID = null;
            }

         
            this.RetrievePost();
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


    ParseDate(date:string):any {

        if (date != null) {
            var getDate = date.replace(/[^0-9\.]/g, '');
            var display = new Date(parseInt(getDate));

            
            return display.toDateString();
        }

       
    }

    DeletePost(id: string) {
     
        this.postService.Delete(id).subscribe(data => {
            this.RetrievePost();
        },error=> console.log(error));
    }


    SearchChange(term: string) {
        setTimeout(() => {
            if (term != null){
                this.postService.SearchPost(term).subscribe(data => {
                    this.posts = data;
                });
            } else {
                this.RetrievePost();
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
  

    Modal(modalName: string, toggle: boolean) {
        let name: string = "#" + modalName;
       
        if (toggle== false){
            $(name).modal("hide");
        } else {
            $(name).modal("show");

        }
       
    }
   
}