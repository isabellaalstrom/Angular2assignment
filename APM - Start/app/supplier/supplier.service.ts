import { ISupplier } from './supplier';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SupplierService {

    constructor(private http: Http) { }

    getSupplier(id: number): Promise<ISupplier> {
        return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/supplier/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

        private handleError(error: any): Promise<any>
    {
        console.error('An error occured: ' + error); //dev help
        return Promise.reject(error.message || error);
    }
}