import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeApiService } from '../APi/employee-api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-modify',
  templateUrl: './employee-modify.component.html',
  styleUrls: ['./employee-modify.component.scss']
})
export class EmployeeModifyComponent implements OnInit {

  empID:any ;
  currentEmp:any ;
  constructor(private route: ActivatedRoute , private empService:EmployeeApiService,private toastr:ToastrService ,private router:Router) { 
    this.empID = this.route.snapshot.paramMap.get('id');
    this.empService.getAll().subscribe(data=>{
      this.currentEmp = data.employees.filter((obj:any) => {
        return obj._id == this.route.snapshot.paramMap.get('id');
      });
      console.log(this.currentEmp[0])
      this.setFormValue();
    },(err)=>{
    })
      


  }

  setFormValue() {
    this.empForm.patchValue({
      username:this.currentEmp[0].username,
      password:this.currentEmp[0].password,
      fullname:this.currentEmp[0].fullname,
    })
  }
  empForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    fullname: new FormControl(''),
    profileImage: new FormControl(''),
  });


  onSubmit() {
    this.empService.editEmp(this.empForm.value).subscribe(data=>{
      console.log(data.msg)
      this.toastr.success(data.msg)
    },(err)=>{
      this.toastr.success(err.error.msg)

      console.log(err)
    })
    console.log(this.empForm.value);
  }


  deleteEmp() {
    this.empService.deleteEmp(this.currentEmp[0].username).subscribe(data=>{
      console.log(data.msg)
      this.toastr.success(data.msg)
      this.router.navigate(['/employee'])


    },(err)=>{
      console.log(err.error.msg)
      this.toastr.error(err.error.msg)

    })
    console.log(this.empForm.value);
  }


  ngOnInit(): void {
  }

}
