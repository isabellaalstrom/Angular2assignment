import { AuthGuard } from './account/auth.guard';
import { Component } from '@angular/core';
import { AuctionService } from './auctions/auction.service';
import { SupplierService } from './supplier/supplier.service';
import { AccountService } from './account/account.service';

@Component({
    selector: 'pm-app',
    template: `
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <a class="navbar-brand">{{pageTitle}}</a>
                <ul class="nav navbar-nav">
                    <li [routerLink]="['/login']"><a>Logga in/registrera</a></li>
                    <li [routerLink]="['/auctions']"><a>Auktioner</a></li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    </div>
    `//,
    //providers: [AuctionService, SupplierService, AccountService, AuthGuard] //flytta till app-module sen
})
export class AppComponent {
    pageTitle : string = `Nackademiska Auktionsfrämjandet`;
}