import { Component, TemplateRef } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  AuthService: boolean = false;
  public isCollapsed = false;
  public isMenuCollapsed = true;

  constructor(
    public authService: AuthService) {}
  title = 'Frontend';

  ngOnInit() {
  }

  loggedIn() {
    this.AuthService = this.authService.loggedIn();;
  }

  logout(){
    this.authService.logout();
  }
}


