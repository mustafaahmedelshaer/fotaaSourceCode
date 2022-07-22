import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnectionService } from 'src/http/connections.service';


@Injectable({
  providedIn: 'root'
})
export class FirmwareApiService {
  createURL = "https://fota2022.herokuapp.com/api/v1/firmware/create"
  getURL = "https://fota2022.herokuapp.com/api/v1/firmwares"
  latestURL = "https://fota2022.herokuapp.com/api/v1/latest/firmware"

  constructor(public http:HttpClient , private connectionService:ConnectionService) { }


  
  getData():Observable<any>
  {
   return this.http.get(this.getURL);
  }

  latestFirmware():Observable<any>
  {
   return this.http.get(this.latestURL);
  }
  
  // addFirmware(object:any):Observable<any>
  // {
  //  console.log("object",object)
  //  return this.http.post(this.createURL,object,{
  //   headers: {
  //     'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
  //   }});
  // }

  addFirmware(object:any):Observable<any>{
    console.log("obj",object)
    return this.connectionService.postFormData(this.createURL,object)
  }

}
