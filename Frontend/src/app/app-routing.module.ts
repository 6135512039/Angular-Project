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

const routes: Routes = [
  {
    path: '',
    redirectTo: '/book-cards',
    pathMatch: 'full'
  },
  {
    path: 'book-cards',
    component: TasksComponent
  },
  {
    path: 'books',
    component: BookComponent
  },
  {
    path: 'edit-book/:id',
    component: EditBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'private-add-book',
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
