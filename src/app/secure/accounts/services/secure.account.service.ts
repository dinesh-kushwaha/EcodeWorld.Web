
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UserProfile } from './models/secure.user.profile';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  })
};
//httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

const apiUrls = {
  getMembers: `${environment.apiUrl}/api/ECWTeamMembers`,
  updateUserProfile: `${environment.apiUrl}/api/Account/UpdateUserProfile`
}

@Injectable({
  providedIn: 'root'
})
export class SecureAccountsService {
  model: UserProfile;
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient,) { }

  getMembers() {
    return this.http.get(apiUrls.getMembers);
    // now returns an Observable of Config
    //return this.http.get<Config>(this.configUrl);
  }

  updateUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(apiUrls.updateUserProfile, userProfile, httpOptions);
  }

}
