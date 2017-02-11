import { runInThisContext } from 'vm';
import { Observable } from 'rxjs/Rx';
import { Customer } from './customer';
import { Injectable } from '@angular/core';
import { LoginInformation } from './login-information';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
    customer: Customer = null; //får värde när man blir inloggad
    loginInfo: LoginInformation = new LoginInformation;

    constructor(private http: Http) { }

    isLoggedIn(): boolean //returnerar true om man är inloggad
    {
        return (this.customer != null);
    }

    login(loginInformation: LoginInformation): Promise<boolean> {
        return this.http.post('http://nackademiskasecure.azurewebsites.net/api/account/login', loginInformation, { withCredentials: true })
            .toPromise()
            .then(response => {
                let r = response.json();
                this.getCustomer(r.id).then(customer => {
                    if (r) {
                        this.customer = customer;
                        console.log(this.customer);
                    }
                    return this.isLoggedIn();
                })
                return true;
            })
            .catch(error => false);
    }

    logout() {
        this.http.get('http://nackademiskasecure.azurewebsites.net/api/account/logout');
        this.customer = null;
    }

    getCustomers(): Promise<Customer[]> {
        return this.http.get("http://nackademiskasecure.azurewebsites.net/api/customer")
            .toPromise()
            .then((response: Response) => response.json())
            .catch(this.handleError);;
    }

    getCustomer(id: number): Promise<Customer> {
        if (id != 0) {
            console.log(id);
            return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/customer/${id}`)
                .toPromise()
                .then((response: Response) => response.json());
            //.catch(this.handleError);
        }
    }

    createCustomer(customer: Customer): Promise<boolean> { //får in en customer
        return this.http
            .post('http://nackademiskasecure.azurewebsites.net/api/customer', customer)
            .toPromise()
            .then(((response: Response) => response.json())); //kommer inte hit, går in i catch?
        //.catch(this.handleError);
        // = ZoneAwarePromise {__zone_symbol__state: null, __zone_symbol__value: Array[0]}

    }

    private handleError(error: any): Promise<any> {
        console.error('!!!ERROR ERROR ERROR!!!', error);
        return Promise.reject(error.message || error);
    }

    ////   JWT-login - koppla till knapp?
    // loginAdmin(loginInformation: LoginInformation) {
    //     return this.http.post('http://nackademiskasecure.azurewebsites.net/api/account/admin/login', loginInformation) //jwt login + cookie
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             let customer = response.json();
    //             if (customer && customer.token) {
    //                 localStorage.setItem('currentUser', JSON.stringify(customer));
    //                 console.log("token finns");
    //                 this.customer = customer;
    //             }
    //             else
    //             { console.log("token finns inte"); }
    //         })
    // }

    // logoutAdmin() {
    //     localStorage.removeItem('currentUser');
    // }

    // private jwt() {
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     if (currentUser && currentUser.token) {
    //         let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //         return new RequestOptions({ headers: headers });
    //     }
    // }
}