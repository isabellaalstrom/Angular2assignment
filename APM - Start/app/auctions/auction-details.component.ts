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


    ngOnInit() {
        this.auctionId = this.activatedRoute.snapshot.params['id'];
        this.auctionService.getAuction(this.auctionId).then(auction => {
            this.auction = auction;
        });
        this.isLoggedIn();
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
            let customerId = this.accountService.customer.id;
            this.auctionService.postBid(this.auctionId, customerId, 50000)
        }
    }

    buyNow() {
        if (this.loggedIn) {
            let customerId = this.accountService.customer.id;
            this.auctionService.buyNow(this.auctionId, customerId)
                .then(value => {
                        this.message = "Grattis, du har nu köpt varan!";
                        console.log("Du köpte varan.");
                        this.router.navigate(['auctions']);
                })
                .catch(error => false);
        }
        else if (!this.accountService.isLoggedIn()) {
            this.router.navigate(['login']);
        }
    }

}