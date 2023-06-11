import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../adminServices/admin.service';

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
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.adminService.addNewUser(this.userRegistrationForm.value).subscribe((res)=>{
      console.log("res");
      console.log(res);
    });
  }

  resetForm():void{
    //registrationForm.resetForm();
    this.userRegistrationForm.reset();
  }
}
