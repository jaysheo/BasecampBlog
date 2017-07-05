import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { CommentModel } from "../Models/Comment";
import { GlobalTicket } from "../Resources/Utility/Urls/Ticket";

@Injectable()
export class NotificationService {
    private headers: Headers;


    constructor(private http: Http) {

    }


    public Retrieve(skip:number, take :number): any {
        return this.http.get("Notification/Retrieve?skip=" + skip+"&take=" + take, { headers: GlobalTicket.Headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public Seen(): any {
        return this.http.get("Notification/Seen", { headers: GlobalTicket.Headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }




    private handleError(error: any) {
        return Observable.throw(error);
    }





}