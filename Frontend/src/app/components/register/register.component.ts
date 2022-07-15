import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})



export class RegisterComponent implements OnInit {
  user: any = {};
  model : NgbDateStruct | undefined;


  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUpUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/edit-data']);
        },
        err => console.log(err)
      )
  }

  onPassportChange() {

  }

}
