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

  get(link): Observable<ISweat[]> {
    return this.http.get<ISweat[]>(this.address + link + '/')
      .pipe(
        catchError(this.handleError('getSweats', []))
      );
  }

  post (link, sweat: ISweat): Observable<ISweat> {
    return this.http.post<ISweat>(this.address + link + '/', sweat, httpOptions)
      .pipe(
        catchError(this.handleError('addSweat', sweat))
      );
  }
  /* post(link, params): Observable<Response> {
    const postHeaders = new Headers();
    postHeaders.append('Content-Type', 'application/json');
    postHeaders.append('Accept', 'application/json');

    const options = new RequestOptions({ headers: postHeaders });
    return this.http.post(this.address + link, JSON.stringify(params), options);
  } */

}
