import { IBid } from './bid';
import { PipeTransform, Pipe } from '@angular/core';
import { IAuction } from './auction';

@Pipe({
    name: 'bidFilter'
})

export class BidFilterPipe implements PipeTransform {
    transform(bids: IBid[]) : IBid[] {
        return bids.sort().reverse(); //sortera med högst först
    }
}