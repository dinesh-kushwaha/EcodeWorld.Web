import { Component, OnInit } from '@angular/core';
import { SecureAccountsService } from '../services/secure.account.service';

@Component({
  selector: 'app-secure-profile',
  templateUrl: './secure.profile.component.html',
  styleUrls: ['./secure.profile.component.css']
})
export class SecureProfileComponent implements OnInit {

  constructor(private secureAccountsService: SecureAccountsService) { }

  ngOnInit() {
  }

}
