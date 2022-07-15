import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import jwt_decode from "jwt-decode";

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

  constructor(
    public authService: AuthService,
    private router: Router) {

    }
  title = 'Frontend';

  ngOnInit() {
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


