import { error } from 'util';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginInformation } from './login-information';
import { AccountService } from './account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: 'app/account/login.component.html'
})
export class LoginComponent implements OnInit {

  loginInfo: LoginInformation = new LoginInformation();
  message: string = "";
  loggedIn: boolean;

  constructor(private location: Location,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loggedIn = this.isLoggedIn();
  }
  ngOnChanges(){
    this.loggedIn = this.isLoggedIn();
  }
  login(): void {  //funkar
    this.accountService.login(this.loginInfo).then(result => {
      if (!result) {
        this.alertService.error("Nåt gick fel, försök igen.", true)
      }
      else if (result) {
        this.alertService.success("Du är nu inloggad!", true);
        this.location.back();
      }
    })
  }

  logout(): void {  //funkar
    this.accountService.logout();
    this.router.navigate(["/auctions"]);
  }

  // //JWT ADMIN
  // adminLogin() {
  //   this.accountService.loginAdmin(this.model)
  //     .subscribe(
  //     data => {
  //       this.router.navigate([this.returnUrl]);
  //       console.log("inloggad som admin!");
  //     },
  //     error => {
  //       this.message = "Kunde inte logga in!";
  //       console.log("inte inloggad");
  //       this.loading = false;
  //     }
  //     )
  // }

  isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();

  }
}