import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeApiService } from '../APi/employee-api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor( public empService:EmployeeApiService , public router:Router,private toastr: ToastrService) { }
  onSubmit() {
    this.empService.login(this.loginForm.value).subscribe(data=>{
      this.toastr.success(data.msg);
      this.empService.userName.next(data.employee.fullname)
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('userName', data.employee.fullname);
      this.router.navigate(['/home'])
    },(err)=>{
      this.toastr.error(err.error.msg);
    })
  }

  ngOnInit(): void {
  }

}
