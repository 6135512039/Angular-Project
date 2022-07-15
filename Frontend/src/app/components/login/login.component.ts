import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {};
  alertnull:boolean = false;
  alertwrong:boolean = false;
  alertsuccess:boolean = false;
  result: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signIn() {
    if(this.user.email == null || this.user.password == null) {
      this.alertnull = true;
    }else{
      this.authService.signInUser(this.user)
      .subscribe(
        res => {
          this.alertsuccess = true;
          setTimeout(()=>{
            localStorage.setItem('token', res.token);
            this.router.navigate(['/edit-data'])
              .then(() => {
                window.location.reload();
              });
            }, 2000)
        },
        (err) => {
          this.alertwrong = true;
        }
      );
    }

  }

  alertClose() {
    this.alertnull = false;
    this.alertwrong = false;
    this.alertsuccess = false;
  }

}
