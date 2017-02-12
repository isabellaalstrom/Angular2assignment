import { Pipe, PipeTransform } from '@angular/core';

import { IAuction } from './auction';

@Pipe({ name: 'categorySort' })
export class CategorySortPipe implements PipeTransform {
  transform(auctions: IAuction[], categoryFilter: boolean): IAuction[] {
    if (categoryFilter) {
      return auctions.sort((a, b) => a.categoryId - b.categoryId);
    }
    else if(!categoryFilter)
    {
      return auctions.sort((a, b) => a.id - b.id);
    }
    else
      return auctions;
  }
}