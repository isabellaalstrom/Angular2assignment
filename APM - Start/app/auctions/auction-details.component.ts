import { IBid } from './bid';
import { Component, OnInit } from '@angular/core';
import { IAuction } from './auction';
import { AuctionService } from './auction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { AlertService } from '../shared/alert.service';

@Component({
    //selector:'pm-auction-details',
    templateUrl: 'app/auctions/auction-details.component.html',
    styleUrls: ['app/shared/forms-validation.css']
})
export class AuctionDetailsComponent implements OnInit {
    constructor(private auctionService: AuctionService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService) {
    }

    pageTitle: string = 'Auktionsdetaljer';
    auctionId: number;
    auction: IAuction;
    message: string;
    loggedIn: boolean;
    bid: number;
    highestBid: number = 0;
    bids: IBid[];


    ngOnInit() {
        this.auctionId = this.activatedRoute.snapshot.params['id'];
        this.auctionService.getAuction(this.auctionId).then(auction => {
            this.auction = auction;
        });
        this.isLoggedIn();
        this.auctionService.getBids(this.auctionId).subscribe(
            bids => {
                this.bids = bids as IBid[];
                this.setHighestBid();
            });

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

    setHighestBid() {
        this.bids.forEach(bid => {
            if (bid.bidPrice >= this.highestBid) {
                this.highestBid = bid.bidPrice;
                this.bid = this.highestBid + 1;
            }
        });

    }

    //funkar
    onBack(): void {
        this.router.navigate(['/auctions']);
    }

    //funkar
    goToSupplier(supplierId: number) {
        this.router.navigate(['supplier', supplierId]);
    }

    //funkar i vanliga, ej secure
    postBid() {
        if (this.loggedIn) {
            if (this.bid > this.highestBid) {
                let customerId = this.accountService.customer.id; //auctionService kanske kan hämta själv?
                this.auctionService.postBid(this.auctionId, customerId, this.bid)
                    .then(response => {
                        this.alertService.success("Du har lagt ett bud.", true);  //om budet för lågt
                        this.message = "Du har lagt ett bud.";
                    });
            }
            else {
                this.alertService.error("Ditt bud är för lågt.", true);
            }
        }
        else if (!this.loggedIn) { //redirect funkar
            this.router.navigate(['login']);
        }
    }


    buyNow() { //i secure får jag error 400 men varan köps ändå
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