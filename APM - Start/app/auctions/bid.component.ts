import { rename } from 'fs';
import { Observable } from 'rxjs/Rx';
import { ComponentStillLoadingError } from '@angular/compiler/src/private_import_core';
import { IBid } from './bid';
import { AuctionService } from './auction.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector:'pm-bid',
    //template: '{{bids}}f' //<button (click)="GetHighestBid()">se högsta bud</button>'
    templateUrl: 'app/auctions/bid.component.html'
})

export class BidComponent implements OnInit {
    constructor(private auctionService: AuctionService){}
    @Input() auctionId: number;
    bids: IBid[];
    highestBidPrice: number = 0;
    //highestBid: IBid;
    showBids: boolean = false;

    ngOnInit(): void {
         this.auctionService.getBids(this.auctionId).subscribe(
             bids => {
                 this.bids = bids as IBid[];
                 this.getHighestBid();
            });
    }

    getHighestBid() {
        this.bids.forEach(bid => {
            if(bid.bidPrice >= this.highestBidPrice)
            {
                this.highestBidPrice = bid.bidPrice;
            }
        });
    }
    showAllBids(){
        if(!this.showBids)
        {
            this.showBids = true;
        }
    }
}