import {Component, OnInit} from '@angular/core';
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
    private router: Router) {
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

    ngOnInit()
    { 
        this.auctionService.getAllAuctions()
                            .then(auctions => { 
                                this.auctions = auctions;
        });

        this.auctionService.getCategories()
                            .subscribe(
                                categories => this.categories = categories,
                                error => this.errorMessage = <any>error);
    }

    // getCategory(id: number) {
    // this.auctionService.getCategory(id).subscribe(
    //     category => this.category = category,
    //     error => this.errorMessage = <any>error);
    // }

    goToDetails(auctionId: number) {
        this.router.navigate(['auction', auctionId]);
    }

    toggleSort() {
        if(this.categoryFilter)
        {
            this.categoryFilter = false;
        }
        else if(!this.categoryFilter)
        {
            this.categoryFilter = true;
        }
    }
}