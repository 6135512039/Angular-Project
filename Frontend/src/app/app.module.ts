import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDatepicker, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  declarations: [
    AppComponent,
    PrivateTasksComponent,
    TasksComponent,
    LoginComponent,
    RegisterComponent,
    MovieListComponent,
    EditMovieComponent,
    ProfileComponent,
    PlaylistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    YouTubePlayerModule,
    SafePipeModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
