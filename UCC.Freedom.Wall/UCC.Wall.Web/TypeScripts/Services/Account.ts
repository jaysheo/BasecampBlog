import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { UserModel } from "../Models/User";

@Injectable()
export class AccountService {
    private headers: Headers;


    constructor(private http: Http) {
        this.headers = new Headers({ "Content-Type": "application/json" });
    }


    public Login(account: UserModel): Observable<UserModel> {
        return this.http.post("Account/Login", JSON.stringify(account), { headers: this.headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public SignUp(account: UserModel): Observable<boolean> {
        return this.http.post("Account/SignUp", JSON.stringify(account), { headers: this.headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public CheckLoggedIn(): any{
        return this.http.get("Account/CheckLoggedIn", { headers: this.headers })
            .map((res: Response) => res.json()).catch(this.handleError);
    }

    public Logout(): any {
        return this.http.get("Account/Logout", { headers: this.headers })
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