import { error } from 'util';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Admin } from './admin';
import { AdminService } from './admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/alert.service';

@Component({
  templateUrl: 'app/admin/admin-login.component.html',
  styleUrls: ['app/shared/forms-validation.css']
})
export class AdminLoginComponent {

  admin: Admin = new Admin();
  message: string = "";
  loggedIn: boolean;

  constructor(private location: Location,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

//   ngOnInit() {
//     this.loggedIn = this.isLoggedIn();
//   }
//   ngOnChanges(){
//     this.loggedIn = this.isLoggedIn();
//   }
  login(): void { 
    this.adminService.loginAdmin(this.admin.email, this.admin.password).then(result => {
      if (!result) {
        this.alertService.error("Nåt gick fel, försök igen.", true)
      }
      else if (result) {
        this.alertService.success("Du är nu inloggad som admin!", true);
        this.router.navigate(["/admin"]);
      }
    })
  }

  // logout(): void {
  // this.adminService.logoutAdmin();
  //   this.router.navigate(["/admin"]);
  //   this.alertService.success("Du är nu inloggad som admin!", true);
    
  // }
}