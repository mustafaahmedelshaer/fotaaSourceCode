import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { CarApiService } from '../APi/car-api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-car-modify',
  templateUrl: './car-modify.component.html',
  styleUrls: ['./car-modify.component.scss']
})
export class CarModifyComponent implements OnInit {
  carID:any ;
  currentCar:any ;
  constructor(private route: ActivatedRoute , private carService:CarApiService) { 
    this.carID = this.route.snapshot.paramMap.get('id');
    this.carService.getData().subscribe(data=>{
      this.currentCar = data.cars.filter((obj:any) => {
        return obj._id == this.route.snapshot.paramMap.get('id');
      });
      this.setFormValue();
    },(err)=>{
      console.log(err.error.msg)
    })
      


  }
  setFormValue() {
    this.carForm.patchValue({
      code:this.currentCar[0].code
    })
  }

  carForm = new FormGroup({
    code: new FormControl(''),
    password: new FormControl(''),
    Version: new FormControl(''),
  });




  onSubmit() {
    this.carService.addCar(this.carForm.value).subscribe(data=>{
      console.log(data.msg)
    },(err)=>{
      console.log(err.error.msg)
    })
    console.warn(this.carForm.value);
  }
  
  ngOnInit(): void {
  }

}
