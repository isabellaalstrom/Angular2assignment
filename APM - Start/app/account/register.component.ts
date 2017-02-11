import { Customer } from './customer';
import { error } from 'util';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: 'app/account/register.component.html'
})

export class RegisterComponent {
    
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
    email: string;
    password: string;
    message: string;

    constructor(
        private router: Router,
        private accountService: AccountService) { }

    register() {  //funkar med nackademiska, men ej secure
        this.accountService.createCustomer(this.firstName, this.lastName,
            this.address, this.postalCode, this.city, this.phone,
            this.email, this.password)
            .then(response => {
                console.log("registrerad!");
                this.router.navigate(['/auctions']);
            });
    }

}