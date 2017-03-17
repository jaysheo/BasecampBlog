import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { CommentModel } from "../Models/Comment";

@Injectable()
export class CommentService {
    private headers: Headers;


    constructor(private http: Http) {
        this.headers = new Headers({ "Content-Type": "application/json" });
    }

    
    public AddComment(post: CommentModel): Observable<boolean> {
        console.log("comment");
        console.log(post);
        return this.http.post("Comment/Create", JSON.stringify(post), { headers: this.headers })
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