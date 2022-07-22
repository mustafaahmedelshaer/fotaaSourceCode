import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../APi/car-api.service';
import { EmployeeApiService } from '../APi/employee-api.service';
import { GeneralServicesService } from '../general-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeCars:any = [];
  allcars:any = [];

  ActiveCars = this.allcars.filter((obj:any) => {
    return obj.isActive;
  });
  Users:any=[];
  
  ActiveUsers = this.Users.filter((obj:any) => {
    return obj.isActive;
  });

  homeUsers:any=[];

  constructor(public carService:CarApiService , public empService:EmployeeApiService,private generalService:GeneralServicesService) { 
    this.carService.getData().subscribe(data=>{
      this.allcars = data.cars;
      this.homeCars = data.cars.slice(0, 5);
    },(err)=>{
      console.log(err.error.msg)
    })

    this.empService.getAll().subscribe(data=>{
      this.Users = data.employees
      this.homeUsers = data.employees.slice(0, 3)
    },(err)=>{
      console.log(err.error.msg)
    })
    this.generalService.pagTitle()

  }

  ngOnInit(): void {
  }

}
