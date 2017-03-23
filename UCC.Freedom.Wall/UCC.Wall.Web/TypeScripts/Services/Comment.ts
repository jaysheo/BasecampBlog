import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { CommentModel } from "../Models/Comment";
import { GlobalTicket } from "../Resources/Utility/Urls/Ticket";

@Injectable()
export class CommentService {
    private headers: Headers;


    constructor(private http: Http) {
    
    }

    
    public AddComment(post: CommentModel):any {
        return this.http.post("Comment/Create", JSON.stringify(post), { headers: GlobalTicket.Headers})
            .map((res: Response) => res.json()).catch(this.handleError);
    }




    private handleError(error: any) {
        return Observable.throw(error);
    }


   


}