import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../adminServices/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm = new FormGroup({
    UserName: new FormControl(''),
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
  });
  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.adminService.addNewUser(this.userRegistrationForm.value).subscribe((res)=>{
      console.log("res");
      console.log(res);
      alert("user Added successflly...")
      this.userRegistrationForm.reset();
     // this.router.navigate(['../userManagement']);
    });
  }

  resetForm():void{
    //registrationForm.resetForm();
    this.userRegistrationForm.reset();
  }
}
