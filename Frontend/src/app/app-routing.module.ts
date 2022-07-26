import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { BookComponent } from './components/book/book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: TasksComponent
  },
  {
    path: 'movie-list',
    component: BookComponent
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-data/:id',
    component: EditBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-data',
    component: PrivateTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
