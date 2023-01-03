import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {PageResponse, Personal} from "@lib/interfaces";
import {Response} from "@lib/interfaces/response.interface";

@Injectable({
  providedIn: 'root',
})
export class PersonalService {

  isLoggedIn$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  getPersonals(): Observable<Response<PageResponse<Personal>>> {
    return this.http.get('@api-x/personal') as Observable<Response<PageResponse<Personal>>>;
  }
  getPersonal(id:string): Observable<Response<Personal>> {
    return this.http.get(`@api-x/personal/${id}`) as Observable<Response<Personal>>;
  }
  savePersonal(payload:Personal): Observable<Response<boolean>> {
    return this.http.post(`@api-x/personal`,payload) as Observable<Response<boolean>>;
  }
  updatePersonal(payload:Personal): Observable<Response<boolean>> {
    return this.http.put(`@api-x/personal`,payload) as Observable<Response<boolean>>;
  }
  deletePersonal(id:string): Observable<Response<boolean>> {
    return this.http.delete(`@api-x/personal/${id}`) as Observable<Response<boolean>>;
  }
}
