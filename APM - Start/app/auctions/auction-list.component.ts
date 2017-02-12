import { AccountService } from '../account/account.service';
import { Component, OnInit } from '@angular/core';
import { IAuction } from './auction';
import { ICategory } from './category';
import { CategoryComponent } from './category.component';
import { AuctionService } from './auction.service';
import { Router } from '@angular/router';

@Component({
    //selector:'pm-auctions',
    templateUrl: 'app/auctions/auction-list.component.html',
    styleUrls: ['app/auctions/auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
    constructor(private auctionService: AuctionService,
        private router: Router,
        private accountService: AccountService) {
    }

    pageTitle: string = 'Auktioner';
    imageWidth: number = 50;
    imageMargin: number = 2;
    listFilter: string;
    categoryFilter: boolean = false;
    auctions: IAuction[];
    categories: ICategory[];
    category: ICategory;
    errorMessage: string;
    loggedIn: boolean;
    today: Date = new Date();
    ngOnInit() {
        this.auctionService.getAllAuctions()
            .then(auctions => {
                this.auctions = auctions;
            });

        // this.auctionService.getCategories()
        //     .subscribe(
        //     categories => this.categories = categories,
        //     error => this.errorMessage = <any>error);
        this.isLoggedIn();
        this.today.getDate();
    }
    ngOnChanges() {
        this.isLoggedIn();
        this.auctionService.getAllAuctions() //funkar att uppdatera sidan efter köp
             .then(auctions => {
                 this.auctions = auctions;
             });
    }
    isLoggedIn() {
        if (this.accountService.isLoggedIn()) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    }
    // GetCategory(id: number) {
    // this.auctionService.GetCategory(id).subscribe(
    //     category => this.category = category,
    //     error => this.errorMessage = <any>error);
    // }

    goToDetails(auctionId: number) {
        this.router.navigate(['auction', auctionId]);
    }

    toggleSort() {
        if (this.categoryFilter) {
            this.categoryFilter = false;
        }
        else if (!this.categoryFilter) {
            this.categoryFilter = true;
        }
    }
}