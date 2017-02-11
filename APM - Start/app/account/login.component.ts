import { error } from 'util';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginInformation } from './login-information';
import { AccountService } from './account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'app/account/login.component.html'
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  loginInfo: LoginInformation = new LoginInformation();
  message: string = "";

  constructor(private location: Location,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.accountService.login(this.loginInfo).then(result => {
      if (!result) {
        this.message = "Kunde inte logga in"; 
      }
      else if (result) {
        console.log("inloggad som vanlig användare");
        this.router.navigate([this.returnUrl]);
      }
    })
  }

  logout(): void {
    this.accountService.logout();
    console.log(this.accountService.isLoggedIn());
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