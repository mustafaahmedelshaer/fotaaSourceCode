import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  URL = "https://fota2022.herokuapp.com/api/v1/employee"
  constructor(public http:HttpClient) { }

  login(object:any):Observable<any>
  {
   
   return this.http.post(this.URL+"/login",object);
  }
}
