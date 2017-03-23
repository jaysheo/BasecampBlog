﻿import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { PostModel } from "../Models/Post";
import { GlobalTicket } from "../Resources/Utility/Urls/Ticket";

@Injectable()
export class PostService {
    private headers: Headers;


    constructor(private http: Http) {
        this.headers = new Headers({ "Content-Type": "application/json" });
    }


    public Retrieve(skip: number, take: number): any {
       
        return this.http.get("Post/Retrieve?skip=" + skip +"&take=" + take, { headers: GlobalTicket.Headers})
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public AddPost(post: any): Observable<boolean> {
    
        return this.http.post("Post/Create", JSON.stringify({ Content: post }), { headers: GlobalTicket.Headers})
            .map((res: Response) => res.json())
    }

    public SearchPost(post: string): any {
        return this.http.get("Post/Search?term=" + post, { headers: GlobalTicket.Headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public Delete(id: string): any {
        return this.http.post("Post/Delete", JSON.stringify({ ID: id }), { headers: GlobalTicket.Headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }



    private handleError(error: any) {
        return Observable.throw(error);
    }


    //public Get(skip: number, take: number): Observable<boolean> {

    //    return this.http.get(ApiUrlResource.GetItems + '?skip=' + skip + '&take=' + take, { headers: GlobalApiUrlResource.Headers })
    //        .map((res: Response) => res.json());
    //}

    //public Delete(shoppingCartID: number) {

    //    return this.http.get(ApiUrlResource.Delete + '?shoppingCartId=' + shoppingCartID, { headers: GlobalApiUrlResource.Headers })
    //        .map((res: Response) => res.json());
    //}


    //public GetListSKU(sku: string): Observable<boolean> {
    //    return this.http.get('/ShoppingCart/Get' + '?' + sku, { headers: GlobalApiUrlResource.Headers })
    //        .map((res: Response) => res.json());

    //}



}