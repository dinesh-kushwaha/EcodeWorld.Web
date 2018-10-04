import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from '../../../environments/environment';
import { User } from '../models/common.user'

const httpOptions = {
    headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    })
};
//httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private router: Router) {

    }

    signIn(user: User): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/api/Account/SignIn`, user, httpOptions)
            .pipe(map(response => {
                if (response.isAuthenticated) {
                    response['userName'] = user.userName;
                    this.addCurrentUserInLocalStorage(response);
                } else {
                    this.removeCurrentUserInLocalStorage();
                }
                return response;
            }));
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/api/Account/Register`, user, httpOptions)
            .pipe(map(response => {
                // if (response.isAuthenticated) {
                //     response['userName'] = user.userName;
                //     this.addCurrentUserInLocalStorage(response);
                // } else {
                //     this.removeCurrentUserInLocalStorage();
                // }
                return response;
            }));
    }

    private addCurrentUserInLocalStorage(currentUser: any) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    private removeCurrentUserInLocalStorage() {
        if (localStorage['currentUser'])
            localStorage.removeItem('currentUser');
    }

    signOut() {
        // remove user from local storage to log user out
        this.removeCurrentUserInLocalStorage();
        this.router.navigate(['/']);

    }

    get user(): User {
        return JSON.parse(localStorage.getItem('currentUser')) || <User>{};
    }

}