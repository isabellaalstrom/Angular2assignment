import { AuthGuard } from './account/auth.guard';
import { Component } from '@angular/core';
import { AuctionService } from './auctions/auction.service';
import { SupplierService } from './supplier/supplier.service';
import { AccountService } from './account/account.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
    //providers: [AuctionService, SupplierService, AccountService, AuthGuard] //flytta till app-module sen
})
export class AppComponent {
    constructor(private accountService: AccountService){}
    pageTitle : string = `Nackademiska Auktionsfrämjandet`;
    loggedIn: boolean = this.accountService.isLoggedIn();

    ngDoCheck(){
        this.loggedIn = this.accountService.isLoggedIn();
    }
}