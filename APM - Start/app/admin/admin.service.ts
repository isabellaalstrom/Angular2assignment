import { IAuction } from '../auctions/auction';
import { IBid } from '../auctions/bid';
import { Admin } from './admin';
import { runInThisContext } from 'vm';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

    constructor(private http: Http) { }  
    admin: Admin = null;
    isAdmin: boolean = false;

    checkIfAdmin(): boolean
    {
        return this.isAdmin;
    }
    
    
    //   JWT-login - koppla till knapp?
    loginAdmin(email: string, password: string): Promise<boolean> {
        return this.http.post('http://nackademiskasecure.azurewebsites.net/api/account/admin/login', { email: email, password: password }) //jwt login + cookie
            .toPromise()
            .then((response: Response) => {
                // login successful if there's a jwt token in the response
                let admin = response.json();
                if (admin && admin.token) {
                    localStorage.setItem('currentUser', JSON.stringify(admin));
                    this.admin = admin;
                    this.isAdmin = true;
                    console.log("token finns");
                    return true;
                }
                else
                { console.log("token finns inte"); }
            })
    }

    logoutAdmin() {
        localStorage.removeItem('currentUser');
        this.isAdmin = false;
        this.admin = null;
    }

    getCompletedAuctions(): Promise<IAuction[]>{
        return this.http.get('http://nackademiskasecure.azurewebsites.net/api/auction/sold', this.jwt())
            .toPromise()
            .then(response => response.json());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}