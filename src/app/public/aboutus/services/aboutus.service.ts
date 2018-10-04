import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { BODMembers } from './models/aboutus.ewc.bod.team.member';
import { environment } from '../../../../environments/environment';
import { UserProfile } from '../../../secure/accounts/services/models/secure.user.profile';

const apiUrls = {
  getMembers: "/api/ECWTeamMembers"
}

@Injectable({
  providedIn: 'root'
})
export class AboutusService {
  model = { userProfile: Array<UserProfile>() };
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get(environment.apiUrl + apiUrls.getMembers);
    // now returns an Observable of Config
    //return this.http.get<Config>(this.configUrl);
  }

}
