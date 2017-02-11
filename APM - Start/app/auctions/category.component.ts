import { Component, OnChanges, Input,
    Output } from '@angular/core';
import { AuctionService } from './auction.service';
import { ICategory } from './category';

@Component({
selector: 'pm-category',
template: `{{ category.name }}`
})

export class CategoryComponent {
    @Input() id: number;
    category: ICategory;
    constructor(private auctionService: AuctionService){}
    ngOnInit() { 
        //     this.auctionService.getCategory(this.id).subscribe(
        // category => this.category = category as ICategory);
        // this.auctionService.GetCategories().subscribe(
        //     categories => this.categories = categories as ICategory[]);
    }
}