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


@Component({
    selector: 'my-app',
    templateUrl: './TypeScripts/Partials/Account.html',
    providers: [AccountService, PostService, CommentService]
})
export class AccountComponent {

    public posts: any[];

    constructor(
        private accountService: AccountService,
        private router: Router,
        private postService: PostService,
        private commentService: CommentService) { }

    private loginMessage: string;
    private signUpMessage: string;
    private accountStatus: string = 'Account';
    private accountID: string;

    ngOnInit(): any {

      
        this.CheckLoggedIn();
        window.scrollTo(0, 0);
      
    }


    AddNewPost(form: NgForm) {
        
        this.postService.AddPost(form.value).subscribe(data => {
            console.log('success');
            form.reset();
           
            this.RetrievePost();
            this.Modal("modal-addpost", false)
        }, error => { console.log(error) });
       
    }

    RetrievePost(): any{
       
       this.postService.Retrieve().subscribe(data => {
          
            this.posts = data.Posts;
            console.log(data);
        }, error => console.log(error));
    }

    Login(form: NgForm) {


        this.accountService.Login(form.value).subscribe(data => {
            console.log(data);
            this.accountStatus = data.FirstName + " " + data.LastName;
            this.accountID = data.ID;
            this.Modal("modal-login", false);
            console.log("accountID: " + this.accountID);

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

    AddNewComment(commentContent:string, postID:string) {
        let comment = new CommentModel(commentContent, postID);
        console.log(comment);
        this.commentService.AddComment(comment).subscribe(data => {
          
            this.RetrievePost();
        }, error => { console.log(error) });

    }

    CheckLoggedIn() {
        this.accountService.CheckLoggedIn().subscribe(data => {

            if (data.ID != null) {
                console.log(data);
                this.accountStatus = data.UserName;
                this.accountID = data.ID
                console.log("accountID: " + this.accountID);
            } else {
                this.accountID = null;
            }

         
            this.RetrievePost();
            console.log("accountID: " + this.accountID);
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


  

    Modal(modalName: string, toggle: boolean) {
        let name: string = "#" + modalName;
       
        if (toggle== false){
            $(name).modal("hide");
        } else {
            $(name).modal("show");

        }
       
    }
   
}