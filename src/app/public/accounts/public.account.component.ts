import { Component, OnInit } from '@angular/core';
// import { Login } from './services/models/login.model';
// import { Register } from './services/models/register.model';

@Component({
  selector: 'app-public-account',
  templateUrl: './public.account.component.html',
  styleUrls: ['./public.account.component.css']
})
export class PublicAccountComponent implements OnInit {
  //model = { login: <Login>{}, register: <Register>{}, errorMessage: <string>{} };

  constructor() { }

  ngOnInit() {
   // this.model.login = <Login>{};
    //this.model.register = <Register>{};

    // this.model.login.userName = "Dinesh";
    // this.model.login.password = "123";
  }

  authenticateUser() {
    // console.log(this.model.login);
    // this.model.errorMessage="authenticateUser";
  }

  createUser() {
    // console.log(this.model.register);
    // this.model.errorMessage="createUser";
  }
}
