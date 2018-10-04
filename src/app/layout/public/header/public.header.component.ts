import { Component, OnInit } from '@angular/core';
import { ECWCommonService } from '../../../common/services/ecw.common.service';
import { SharedModel } from '../../../common/services/ecw.common.model';
import { User } from '../../../common/models/common.user';
import { AuthenticationService } from '../../../common/services/authenticationService';

@Component({
  selector: 'app-public-header',
  templateUrl: './public.header.component.html',
  styleUrls: ['./public.header.component.css'],
  providers: [ECWCommonService]
})
export class PublicHeaderComponent implements OnInit {

  public authSrv: AuthenticationService;

  constructor(private authenticationService: AuthenticationService) {
    this.authSrv = this.authenticationService;
  }

  ngOnInit() {

  }

  // signOut() {
  //   this.authSrv.signOut();
  //   this.getUser();
  // }

  // private getUser() {
  //   this.user = this.authSrv.user;
  // }
}
