import { Token } from '@angular/compiler';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  getId: any;
  User: any = [];
  token: any;

  constructor( private router: Router,
               private ngZone: NgZone,
               private activatedRoute: ActivatedRoute,
               private authService: AuthService,
               private taskService: TaskService,) {

    // this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.authService.loggedIn()

    // this.authService.getUserProfile(this.getId).subscribe(res => {
    //   this.User = res.msg;
    // })
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getId = jwt_decode(this.token)
    console.log('id',this.getId._id)

    this.taskService.GetUser(this.getId._id).subscribe(res => {
      this.User = res;
      console.log(res)
    });











    // console.log('User',this.User);
    // console.log('ID',this.getId);
    // console.log(jwt_decode(this.token))
    // console.log('ID',localStorage.getItem('token'));
    // console.log('token', this.token)


  }

}
