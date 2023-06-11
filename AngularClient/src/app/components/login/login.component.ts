import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl(''),
  });
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['./admin']);
    }
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login({ email:this.loginForm.value.UserName, password:this.loginForm.value.Password }).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['/admin']);
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
  }
}
