import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../adminServices/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private adminService: AdminService) { }
  usersRecord: any
  ngOnInit(): void {

    this.adminService.getAllUsers().subscribe((result)=>{
      //console.log(result);
      this.usersRecord = result;

    })
  }

 

}
