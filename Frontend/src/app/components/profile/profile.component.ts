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
  User: any;
  token: any;
  BirthDate: any = [];

  constructor( private router: Router,
               private ngZone: NgZone,
               private activatedRoute: ActivatedRoute,
               private authService: AuthService,
               private taskService: TaskService,) {
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.getId = jwt_decode(this.token)

    this.taskService.GetUser(this.getId._id).subscribe(res => {
      this.User = res;
    });
  }

}
