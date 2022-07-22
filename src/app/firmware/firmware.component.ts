import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirmwareApiService } from '../APi/firmware-api.service';
import { GeneralServicesService } from '../general-services.service';

@Component({
  selector: 'app-firmware',
  templateUrl: './firmware.component.html',
  styleUrls: ['./firmware.component.scss']
})
export class FirmwareComponent implements OnInit {
  allFirmwars:any=[];
  latestFirmwares:any=[];

  constructor(private firmwareService:FirmwareApiService ,
             private toastr:ToastrService,
            private generalService:GeneralServicesService) { 
    this.firmwareService.getData().subscribe(data=>{
      this.allFirmwars = data.firmwares; 
    },(err)=>{
      this.toastr.error(err.error.msg);
    })

    // this.firmwareService.latestFirmware().subscribe(data=>{
    //   this.latestFirmwares = data; 
    // },(err)=>{
    // })

    this.generalService.pagTitle()
    
  }


  firmwareForm = new FormGroup({
    versionName: new FormControl(''),
    description: new FormControl(''),
    file: new FormControl(''),
  });
  onFileSelected(event:any){
    this.firmwareForm.patchValue({
      file:event.target.files[0]
    })
  }

  onSubmit() {

    this.firmwareService.addFirmware(this.firmwareForm.value).subscribe(data=>{
      this.toastr.success(data.msg);
      console.log(data)
    },(err)=>{
      this.toastr.error(err.error.msg);
    })
  }


  ngOnInit(): void {
  }

}
