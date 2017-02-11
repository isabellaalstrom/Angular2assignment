import { IBid } from './bid';
import { Observable, Observer } from 'rxjs/Rx';
import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { IAuction } from './auction';
import { ICategory } from './category';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuctionService {

    constructor(private http: Http) { }

    getAllAuctions(): Promise<IAuction[]> {
        return this.http.get('http://nackademiskasecure.azurewebsites.net/api/auction')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getAuction(id: number): Promise<IAuction> {
        return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/auction/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getCategories(): Observable<ICategory[]> {
        return this.http.get('http://nackademiskasecure.azurewebsites.net/api/category')
            .map((response: Response) => response.json());
    }

    getBids(id: number): Observable<IBid[]> {
        return this.http.get(`http://nackademiskasecure.azurewebsites.net/api/bid/${id}`)
            .map((response: Response) => response.json());
    }

    postBid(aId: number, cId: number, bP: number) {
        return this.http.post('http://nackademiskasecure.azurewebsites.net/api/bid',
            { auctionId: aId, customerId: cId, bidPrice: bP },
            { withCredentials: true })
            .toPromise()
            .then(response => {
                response.json();
                console.log("budat");
            })
    }

    buyNow(aId: number, cId: number): Promise<boolean> {
        return this.http.post('http://nackademiskasecure.azurewebsites.net/api/auction/buynow', { auctionId: aId, customerId: cId }, { withCredentials: true })
            //tror att det inte sparats nån cookie? error 400
            .toPromise()
            .then(response => {
                response.json();
                console.log("köpt vara!");
                return true;
            })
            .catch(error => false);
    }

    private handleError(error: any): Promise<any> {
        console.error('ERROR ERROR: ' + error); //dev help
        return Promise.reject(error.message || error);
    }
}