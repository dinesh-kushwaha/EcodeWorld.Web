import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/common.user';
import { AuthenticationService } from '../../../common/services/authenticationService';

@Component({
  selector: 'app-secure-header',
  templateUrl: './secure.header.component.html',
  styleUrls: ['./secure.header.component.css']
})
export class SecureHeaderComponent implements OnInit {

  public authSrv: AuthenticationService;
  
  constructor(private authenticationService: AuthenticationService) {
    this.authSrv = this.authenticationService;
   }

  ngOnInit() {
    
  }

}
