import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Movie {
  _id!: String;
  name!: String;
  price!: String;
  description!: String;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient,) { }

  getTasks() {
    return this.http.get<any>(this.URL + '/tasks');
  }

  getPrivateTasks() {
    return this.http.get<any>(this.URL + '/private-tasks');
  }

  //Add Movie
  AddMovie(data: Movie): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.URL + '/private-add-movie', data)
      .pipe(
        catchError(this.handleError)
      )
  }

  //Get all Movies
  GetMovies() {
    return this.http.get<any>(this.URL + '/movies');
  }

  //Get Movie By Id
  GetMovie(id: any): Observable<any> {
    return this.http.get<any>(this.URL + '/movies/'+ `${id}`,{ headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  // Update
  updatedMovie(id:any, data:any): Observable<any> {
    return this.http.put<any>(this.URL+ '/private-update-movie/' + `${id}`,data,{ headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteMovie(id: any): Observable<any> {
    return this.http.delete<any>(this.URL+ '/private-delete-movie/' + `${id}`,{ headers: this.httpHeaders })
    .pipe(
      catchError(this.handleError)
    )
  }

    //Get all Users
    GetUsers() {
      return this.http.get<any>(this.URL + '/users');
    }

    //Get single object
    GetUser(id: any): Observable<any> {
      return this.http.get<any>(this.URL + '/users/'+ `${id}`,{ headers: this.httpHeaders })
        .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
        )
    }

    // Delete
    deleteUser(id: any): Observable<any> {
      return this.http.delete<any>(this.URL+ '/delete-user/' + `${id}`,{ headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
    }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Handle client error
      errorMessage = error.error.message;
    } else {
      //Handle server error
      errorMessage = `Error Code ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
    }
}

