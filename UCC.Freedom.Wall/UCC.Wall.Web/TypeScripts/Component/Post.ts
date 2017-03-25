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
    providers: [ CommentService]
})
export class PostComponent {

    public listPosts: any[];
    public posts: any[];
    public listComments: any[];
    public comment: any[];

    constructor() { }
}