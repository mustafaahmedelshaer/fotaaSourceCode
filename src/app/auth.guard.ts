import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralServicesService } from './general-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *

     */
   constructor( private generalServices:GeneralServicesService, private router:Router) {}
  canActivate():boolean{
    if(this.generalServices.loggedIn()){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
