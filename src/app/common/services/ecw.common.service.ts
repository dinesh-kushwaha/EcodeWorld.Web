import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
// import { Config } from './config.model';
import { User } from '../models/common.user';
// import { SessionStorage,SharedStorage } from 'ngx-store';
//https://www.npmjs.com/package/ngx-store

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};
// httpOptions.headers =
//     httpOptions.headers.set('Authorization', 'my-new-auth-token');

@Injectable({
    providedIn: 'root'
})
export class ECWCommonService {
    // @SharedStorage() userSessionShared= { userName: "", isAuthenticated: false };
    // @SessionStorage({ key: 'userSession' }) userSession = { userName: "", isAuthenticated: false };
    public isBusy: boolean = false;
    public sharedModel: User;
    constructor(private http: HttpClient) {
        this.sharedModel = JSON.parse(localStorage.getItem('currentUser'));
    }
}