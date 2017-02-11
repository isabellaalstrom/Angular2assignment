import { Customer } from './customer';
import { error } from 'util';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: 'app/account/register.component.html'
})

export class RegisterComponent implements OnInit {
    customer: Customer = new Customer;
    message: string;

    constructor(
        private router: Router,
        private accountService: AccountService) { }

    ngOnInit() {
    }
    register() {
        this.accountService.createCustomer(this.customer)
            .then(data => {   //registrerar, men går inte in här?
                console.log("registrerad!");
                this.router.navigate(['/auctions']);
            });
    }

}