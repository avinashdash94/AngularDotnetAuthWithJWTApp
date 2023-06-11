import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';


const routes: Routes = [
  {
    //When no path give for admin lad admin dash board
      path: '', 
      component: AdminDashboardComponent, 
      //children and there path for the admin dash board
      children:[
          {path:'home', component: HomeComponent},
          {path:'about', component: AboutComponent},
          {path:'userManagement', component: UserManagementComponent},
          {path:'userRegistration', component: UserRegistrationComponent},
          {path:'',redirectTo: '/admin/home', pathMatch:'full'},
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }