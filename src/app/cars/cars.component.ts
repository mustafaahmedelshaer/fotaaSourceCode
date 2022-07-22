import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../APi/car-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirmwareApiService } from '../APi/firmware-api.service';
import { GeneralServicesService } from '../general-services.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  carForm = new FormGroup({
    code: new FormControl('Code'),
    password: new FormControl('Password'),
    Version: new FormControl(' Select Firmware'),
  });
  default: string = 'UK';
  searchText : any = new BehaviorSubject("");

  allCars:any = [];
  allFirmwars:any = [];
  ActiveCarsCount = this.allCars.filter((obj:any) => {
    return obj.isActive;
  });

  constructor(public carService:CarApiService ,private toastr:ToastrService, private  firmwareService:FirmwareApiService,private generalService:GeneralServicesService ) { 
    this.carService.getData().subscribe(data=>{
      this.allCars = data.cars; //.slice(0, 5)
    },(err)=>{
      this.toastr.error(err.error.msg);
    })


    this.firmwareService.getData().subscribe(data=>{
      this.allFirmwars = data.firmwares; 
    },(err)=>{
      this.toastr.error(err.error.msg);
    })
    this.generalService.pagTitle()

    this.generalService.searchText.subscribe((value:any) => {
      this.searchText= value
      if(value !== ''){
        this.carService.carSearch(value).subscribe(result=>{
          if(result.cars.length != 0){
            this.allCars=result.cars
            window.scrollTo(0,500);

          }else {
            this.toastr.error("No result Found");
          }

          console.log()
        },(err)=>{
          this.toastr.error(err.error.msg);
        })
          }
    })
  }

  onSubmit() {
    this.carService.addCar(this.carForm.value).subscribe(data=>{
      this.toastr.success(data.msg);
      location.reload();
    },(err)=>{
      this.toastr.error(err.error.msg);
    })
  }


  ngOnInit(): void {
  }

}
