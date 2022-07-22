import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  URL = "https://fota2022.herokuapp.com/api/v1/car"
  result:any;
  constructor(public http:HttpClient) { }


  getData():Observable<any>
  {
   return this.http.get(this.URL+"/all");
  }


  
  addCar(object:any):Observable<any>
  {
   return this.http.post(this.URL+"/create",object);
  }

  carSearch(code:any):Observable<any>
  {
    return this.http.get(this.URL+"/search?code="+code);
  }
}
