import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CarModifyComponent } from './car-modify/car-modify.component';
import { CarsComponent } from './cars/cars.component';
import { EmployeeModifyComponent } from './employee-modify/employee-modify.component';
import { EmployeeComponent } from './employee/employee.component';
import { FirmwareComponent } from './firmware/firmware.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponentComponent } from './main-component/main-component.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponentComponent,
  children: [
    {path: 'home', component: HomeComponent , canActivate:[AuthGuard]},
    {path: '', component: HomeComponent , canActivate:[AuthGuard]},
    {path: 'cars', component: CarsComponent , canActivate:[AuthGuard]},
    {path: 'employee', component: EmployeeComponent},
    {path: 'firmware', component: FirmwareComponent, canActivate:[AuthGuard]},
    {path: 'employeemodify/:id', component: EmployeeModifyComponent,  canActivate:[AuthGuard]},
    // {path: 'carmodify/:id', component: CarModifyComponent,  canActivate:[AuthGuard]},
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
