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

    //funkar
    login(loginInformation: LoginInformation): Promise<boolean> {
        return this.http.post('http://nackademiskasecure.azurewebsites.net/api/account/login', loginInformation, { withCredentials: true })
            .toPromise()
            .then(response => {
                let r = response.json();
                this.getCustomer(r.id).then(customer => {
                    if (r) {
                        this.customer = customer;
                    }
                    return this.isLoggedIn();
                })
                return true;
            })
            .catch(error => false);
    }

    //funkar
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

    //funkar
    getCustomer(id: number): Promise<Customer> {
        if (id != 0) {
            console.log(id);
            return this.http.get(`http://nackademiskasecure2.azurewebsites.net/api/customer/${id}`)
                .toPromise()
                .then((response: Response) => response.json());
            //.catch(this.handleError);
        }
    }

    //funkar med nackademiska, men ej secure
    createCustomer(firstName: string, lastName: string, address: string,
                postalCode: string, city: string, phone: string,
                email: string, password: string)
                // : Promise<boolean> 
                {
        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post('http://nackademiskasecure.azurewebsites.net/api/customer',
            { firstName: firstName, lastName: lastName, address: address,
                postalCode: postalCode, city: city, phone: phone,
                email: email, password: password }, headers)
            .toPromise()
            .catch(this.handleError);
    }

    // private extractData(res: Response) {
    // let body = res.json();
    // return body.data || { };
    // }

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