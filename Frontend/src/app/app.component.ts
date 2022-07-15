import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import jwt_decode from "jwt-decode";
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  AuthService: boolean = false;
  public isCollapsed = false;
  public isMenuCollapsed = true;
  getId: any;
  token: any;
  User: any;

  constructor(
    public authService: AuthService,
    public taskService: TaskService,
    private router: Router) {

    }
  title = 'Frontend';

  ngOnInit() {
    this.token = localStorage.getItem('token')
    this.getId = jwt_decode(this.token)
    this.taskService.GetUser(this.getId._id).subscribe(res => {
      this.User = res;
    });
  }

  profileUser() {
    this.token = localStorage.getItem('token')
    this.getId = jwt_decode(this.token)
    this.router.navigate(['/profile/' + this.getId._id]);
  }

  loggedIn() {
    this.AuthService = this.authService.loggedIn();
  }

  logout(){
    this.authService.logout();
  }
}


