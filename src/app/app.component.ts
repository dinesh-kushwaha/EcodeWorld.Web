import { Component } from '@angular/core';
import { ECWCommonService } from './common/services/ecw.common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'ecodeworld';

  constructor(private commonService: ECWCommonService) { }

  get isBusy(): boolean {
    return this.commonService.isBusy;
  }

}
