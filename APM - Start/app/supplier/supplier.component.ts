import { ISupplier } from './supplier';
import {Component, OnInit} from '@angular/core';
import { IAuction } from '../auctions/auction';
import { ICategory } from '../auctions/category';
import { CategoryComponent } from '../auctions/category.component';
import { SupplierService } from './supplier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    templateUrl: 'app/supplier/supplier.component.html'
})

export class SupplierComponent implements OnInit {
    constructor(private supplierService: SupplierService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location){}

    pageTitle: string = "Leverantörsdetaljer"
    supplierId: number;
    supplier: ISupplier;

    ngOnInit(){
        this.supplierId = this.activatedRoute.snapshot.params['id'];
        this.supplierService.getSupplier(this.supplierId).then(supplier => {
            this.supplier = supplier;
        });
        console.log(this.supplierId);
    }
    onBack(): void {
        //this.router.navigate(['/auctions']);
        this.location.back();
    }
}