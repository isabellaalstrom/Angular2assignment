import * as path from 'path';
import { SupplierService } from './supplier/supplier.service';
import { AlertService } from './shared/alert.service';
import { AccountService } from './account/account.service';
import { AuctionService } from './auctions/auction.service';
import { AuthGuard } from './account/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { AlertComponent } from './shared/alert.component';
import { AuctionListComponent } from './auctions/auction-list.component';
import { AuctionDetailsComponent } from './auctions/auction-details.component';
import { CategoryComponent } from './auctions/category.component';
import { BidComponent } from './auctions/bid.component';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { SupplierComponent } from './supplier/supplier.component';


import { AuctionFilterPipe } from './auctions/auction-filter.pipe';
import { SoldAuctionPipe } from './auctions/sold-auction-filter.pipe';
import { CategorySortPipe } from './auctions/category-sort.pipe';
import { BidFilterPipe } from './auctions/bid-filter.pipe';

const routes: Routes = [
  { path: 'auctions', component: AuctionListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auction/:id', component: AuctionDetailsComponent },
  { path: 'supplier/:id', component: SupplierComponent },
  { path: '', redirectTo: 'auctions', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' } //gör 404?
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    AuctionListComponent,
    AuctionDetailsComponent,
    CategoryComponent,
    SupplierComponent,
    LoginComponent,
    BidComponent,
    RegisterComponent,
    SoldAuctionPipe,
    AuctionFilterPipe,
    CategorySortPipe,
    BidFilterPipe
  ],
    providers: [AuctionService, SupplierService, AccountService, AlertService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }