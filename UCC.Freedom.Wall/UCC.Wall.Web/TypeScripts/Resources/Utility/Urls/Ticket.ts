import { Headers } from "@angular/http";
import { AccountService } from "../../../Services/Account";
export class GlobalTicket {
    private static headers: Headers;
    private object: any[];
    constructor(private accountService: AccountService) { }

    
    public static get Headers(): Headers {
       
        this.headers = new Headers({
            "Content-Type": "application/json",
            "75e27c69-1186-4316-b322-9303265c9597": "c6e3a0ff-c1aa-4e52-bcfa-334f741d223e"


        });
        return this.headers;
    }
}