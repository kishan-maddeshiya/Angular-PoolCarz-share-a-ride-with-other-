import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  getRides(): Observable<any> {
    return this.http.get('/assets/rides.json');
  }

  getUsers(): Observable<any> {
    return this.http.get('/assets/users.json');
  }
}
