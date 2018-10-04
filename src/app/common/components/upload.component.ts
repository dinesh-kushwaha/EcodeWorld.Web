import { Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpErrorResponse, HttpHeaders, HttpParams,HttpEventType } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Component({
    selector: 'upload-component',
    templateUrl: 'upload.component.html'
})
export class UploadComponent {
    public progress: number;
    public message: string;
    constructor(private http: HttpClient) { }

    upload(files) {
        console.log(files);
        if (files.length === 0)
            return;

        const formData = new FormData();

        for (let file of files)
            formData.append(file.name, file);

        const uploadReq = new HttpRequest('POST', `https://localhost:44395/api/upload`, formData, {
            reportProgress: true,
        });

        this.http.request(uploadReq).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress)
                this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response)
                this.message = event.body.toString();
        });
    }
}