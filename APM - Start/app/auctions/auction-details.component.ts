import { Component, OnInit } from '@angular/core';
import { IAuction } from './auction';
import { AuctionService } from './auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Component({
    //selector:'pm-auction-details',
    templateUrl: 'app/auctions/auction-details.component.html'
})
export class AuctionDetailsComponent implements OnInit {
    constructor(private auctionService: AuctionService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService) {
    }

    pageTitle: string = 'Auktionsdetaljer';
    auctionId: number;
    auction: IAuction;
    message: string;
    loggedIn: boolean;
    bid: number = 50000; //gör till nuvarande högsta bud istället


    ngOnInit() {
        this.auctionId = this.activatedRoute.snapshot.params['id'];
        this.auctionService.getAuction(this.auctionId).then(auction => {
            this.auction = auction;
        });
        this.isLoggedIn();
        //this.bid = highestBid; //FIXA?
    }

    ngDoCheck() {
        this.isLoggedIn();
    }

    isLoggedIn() {
        if (this.accountService.isLoggedIn()) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    }

    onBack(): void {
        this.router.navigate(['/auctions']);
    }

    goToSupplier(supplierId: number) {
        this.router.navigate(['supplier', supplierId]);
    }

    postBid() {

        if (this.loggedIn) {
            // console.log("bud: " + this.bid);
            // console.log("auktion: " + this.auctionId);
            let customerId = this.accountService.customer.id; //auctionService kanske kan hämta själv?
            // console.log("användare: " + customerId);
            this.auctionService.postBid(this.auctionId, customerId, this.bid);
        }
        else if (!this.loggedIn) { //redirect ok
            this.router.navigate(['login']);
        }
    }

    buyNow() {
        if (this.loggedIn) {
            let customerId = this.accountService.customer.id;
            this.auctionService.buyNow(this.auctionId, customerId)
                .then(value => { //kommer hit trots 400 och varan köps
                    this.message = "Grattis, du har nu köpt varan!";
                    console.log("Du köpte varan.");
                    this.router.navigate(['auctions']);
                })
                .catch(error => false);
        }
        else if (!this.loggedIn) {
            this.router.navigate(['login']);
        }
    }

}