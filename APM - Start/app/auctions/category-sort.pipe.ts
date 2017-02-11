import { Pipe, PipeTransform } from '@angular/core';

import { IAuction } from './auction';

@Pipe({ name: 'categorySort'})
export class CategorySortPipe implements PipeTransform {
  transform(auctions: IAuction[], categoryFilter: boolean ) : IAuction[] {
    if(categoryFilter)
    {
       return auctions.sort(auctions => auctions.categoryId);
    }
    else if(!categoryFilter)
    {
      return auctions.sort(auctions => auctions.id);
    }
  }
}