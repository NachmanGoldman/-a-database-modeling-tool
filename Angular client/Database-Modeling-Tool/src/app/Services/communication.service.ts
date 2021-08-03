import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl: string = 'https://localhost:44327/';

  post(url: string, request: any): Observable<any> {
    debugger;
    return this._httpClient.post(this.baseUrl + url, request);
  }

  get(url: string = ''): Observable<any> {
    return this._httpClient.get(this.baseUrl + url);
  }

  delete(url: string = '', tableName: string): Observable<any> {
    return this._httpClient.delete(this.baseUrl + url + tableName);
  }
}
