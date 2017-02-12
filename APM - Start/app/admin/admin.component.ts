import { IAuction } from '../auctions/auction';
import { AccountService } from '../account/account.service';
import { error } from 'util';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Admin } from './admin';
import { AdminService } from './admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/alert.service';

@Component({
  templateUrl: 'app/admin/admin.component.html'
})
export class AdminComponent implements OnInit {
constructor(private adminService: AdminService,
private accountService: AccountService,
private router: Router,
private alertService: AlertService){}

auctions: IAuction[];

     ngOnInit(): void {
        this.adminService.getCompletedAuctions()
            .then(auctions => {
                this.auctions = auctions;
            });
    }

    logout(){
    this.adminService.logoutAdmin();
    this.router.navigate(["/auctions"]);
    this.alertService.success("Du är utloggad som admin.", true);
    }
}