import { PipeTransform, Pipe } from '@angular/core';
import { IAuction } from './auction';

@Pipe({
    name: 'auctionFilter'
})

export class AuctionFilterPipe implements PipeTransform {
    transform(value: IAuction[], filterBy: string) : IAuction[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null; //arrayfilterfunction
        return filterBy ? value.filter((auction: IAuction) =>
            auction.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}