import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeApiService } from '../APi/employee-api.service';
import { GeneralServicesService } from '../general-services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName:string = "";
  pageTitle:string = "Home";
  searchText:string = "";
  constructor(public empService:EmployeeApiService,private router: Router,private toastr:ToastrService,private generalService:GeneralServicesService) { 
    this.empService.userName.subscribe((value:any) => {
      this.userName = value;
    })
    this.generalService.pageTitle.subscribe((value:any) => {
      this.pageTitle = value;
    })
    this.pageTitle = this.router.url.split("/", 3)[1];
  }


  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('userName');
    this.toastr.success("Logged out")
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 1000);
  }

  onSearch(){
    this.generalService.searchText.next(this.searchText)
    
    this.router.navigate(['/cars'])


  }

  ngOnInit(): void {
  }

}
