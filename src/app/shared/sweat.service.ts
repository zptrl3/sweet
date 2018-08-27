import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ISweat } from './sweat.model';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SweatService {
  address = 'http://5.2.86.85:8083/';
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('SweatService');
  }

  get(link, params): Observable<Response> {
    console.log(this.address + link + '/' + params);
    return this.http.get<Response>(this.address + link + '/' + params);
  }

  post (link, sweat: any): Observable<ISweat> {
    return this.http.post<ISweat>(this.address + link + '/', sweat, httpOptions)
      .pipe(
        catchError(this.handleError('addSweat', sweat))
      );
  }
}
