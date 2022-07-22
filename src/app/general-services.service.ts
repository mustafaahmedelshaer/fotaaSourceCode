import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {
  constructor(private router:Router) { }
  
  pageTitle : any = new BehaviorSubject(localStorage.getItem('pageTitle'));
  searchText : any = new BehaviorSubject("");


pagTitle(){
  this.pageTitle.next(this.router.url.split("/", 3)[1])
  this.pageTitle.subscribe((value:any) => {
    localStorage.setItem('pageTitle',value)
  })
}

  loggedIn(){
    return !!localStorage.getItem('access_token');
  }

}
