import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [
  {
    //When no path give for admin lad admin dash board
      path: '', 
      component: AdminDashboardComponent, 
      //children and there path for the admin dash board
      children:[
          {path:'home', component: HomeComponent},
          {path:'about', component: AboutComponent},
          {path:'services', component: ServicesComponent},
          {path:'contact', component: ContactComponent},
          {path:'',redirectTo: '/admin/home', pathMatch:'ful'},
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
