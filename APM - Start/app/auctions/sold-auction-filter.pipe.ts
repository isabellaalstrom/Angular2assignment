import { Pipe, PipeTransform } from '@angular/core';

import { IAuction } from './auction';

@Pipe({ name: 'soldAuction' })
export class SoldAuctionPipe implements PipeTransform {
  transform(auctions: IAuction[], today: Date) {
    auctions.filter(auction => ((auction.endTime <= today)&&(auction.startTime >= today)));
    return auctions.filter(auction => !auction.sold);
  }
}