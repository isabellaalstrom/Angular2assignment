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
  loggedIn: boolean;

  constructor(private location: Location,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; //finns ej nåt returnurl?
    this.loggedIn = this.isLoggedIn();
  }
  ngOnChanges(){
    this.loggedIn = this.isLoggedIn();
  }
  login(): void {  //funkar
    this.accountService.login(this.loginInfo).then(result => {
      if (!result) {
        this.message = "Kunde inte logga in"; 
      }
      else if (result) {
        console.log(this.returnUrl); 
        this.router.navigate([this.returnUrl]); 
        //kommer tillbaka till auctions, ej returnurl?
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