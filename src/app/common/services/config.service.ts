import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Config } from './config.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};
httpOptions.headers =
    httpOptions.headers.set('Authorization', 'my-new-auth-token');

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private http: HttpClient) { }

    configUrl = 'assets/config.json';

    getConfig() {
        return this.http.get(this.configUrl);
        // now returns an Observable of Config
        //return this.http.get<Config>(this.configUrl);
    }

    getConfigResponse(): Observable<HttpResponse<Config>> {
        return this.http.get<Config>(
            this.configUrl, { observe: 'response' });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    getConfigPipErrorHanding() {
        return this.http.get<Config>(this.configUrl)
            .pipe(
            catchError(this.handleError)
            );
    }

    getConfigReTry() {
        return this.http.get<Config>(this.configUrl)
            .pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
            );
    }
    //https://angular.io/guide/http
    getTextFile(filename: string) {
        // The Observable returned by get() is of type Observable<string>
        // because a text response was specified.
        // There's no need to pass a <string> type parameter to get().
        return this.http.get(filename, { responseType: 'text' })
            .pipe(
            tap( // Log the result or error
                //   data => this.log(filename, data),
                //   error => this.logError(filename, error)
            )
            );
    }

    /** POST: add a new hero to the database */
    addHero(hero: Config): Observable<Config> {
        return this.http.post<Config>(this.heroesUrl, hero, httpOptions)
            .pipe(catchError(e => throwError(e)));
    }
    private heroesUrl: any;
    // private handleErrorNew(mtd:string,obj:any):void {

    // };

    /** DELETE: delete the hero from the server */
    deleteHero(id: number): Observable<{}> {
        const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
        return this.http.delete(url, httpOptions)
            .pipe(
            catchError(this.handleError)
            );
    }

    test() {

        const req = this.http.get<Config>('/api/heroes');
        // 0 requests made - .subscribe() not called.
        req.subscribe();
        // 1 request made.
        req.subscribe();
        // 2 requests made.
    }

    /** PUT: update the hero on the server. Returns the updated hero upon success. */
    updateHero(hero: Config): Observable<Config> {
        return this.http.put<Config>(this.heroesUrl, hero, httpOptions)
            .pipe(
            catchError(this.handleError)
            );
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Config[]> {
        term = term.trim();

        // Add safe, URL encoded search parameter if there is a search term
        const options = term ?
            { params: new HttpParams().set('name', term) } : {};

        return this.http.get<Config[]>(this.heroesUrl, options)
            .pipe(
            catchError(this.handleError)
            );
    }
}