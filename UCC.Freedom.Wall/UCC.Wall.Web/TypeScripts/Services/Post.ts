import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { PostModel } from "../Models/Post";

@Injectable()
export class PostService {
    private headers: Headers;


    constructor(private http: Http) {
        this.headers = new Headers({ "Content-Type": "application/json" });
    }


    public Retrieve():any {
        return this.http.get("Post/Retrieve", { headers: this.headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public AddPost(post: any): Observable<boolean> {
        console.log(post);
        return this.http.post("Post/Create", JSON.stringify({ Content: post}), { headers: this.headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public SearchPost(post: string): any {
        return this.http.get("Post/Search?term=" + post,{ headers: this.headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public Delete(id: string): any {
        return this.http.post("Post/Delete", JSON.stringify({ ID: id}), { headers: this.headers })
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