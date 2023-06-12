import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../adminServices/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(private adminService: AdminService, private router:Router) { }
  usersRecord: any
  ngOnInit(): void {
    this.getAllUsers();   
  }

  getAllUsers(){
    this.adminService.getAllUsers().subscribe((result)=>{
      //console.log(result);
      this.usersRecord = result;
    })
  }
  onEdit(item: any){
    item.isEdit = true;
    console.log(item);
  }

  updateUser(item: any){
    // delete item['isEdit'];
    // console.log(item);
    let tempUser = item;
    delete tempUser['isEdit'];
    // console.log(item);
    // console.log(tempUser);
    this.adminService.updateUser(tempUser).subscribe((result)=>{
      console.log(result);
    });  
  }

  DeleteUser(userID:any){
    console.log(userID);
    if(confirm("Do you want to remove this user\nEither OK or Cancel.")){
      this.adminService.DeleteUser(userID).subscribe((result)=>{
        if( result.toString() ==="Deleted Successfully"){
          this.getAllUsers(); 
        // this.router.navigate(['./userManagement']);
        }
        console.log(result);
      }); 
    }
  }
 

}
