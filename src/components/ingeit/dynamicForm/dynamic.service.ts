import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {

  constructor(public http: HttpClient) { }

  getDataForField(url){
    return this.http.get(url).toPromise();
  }
}
