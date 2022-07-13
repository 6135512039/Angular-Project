import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Book {
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

  //Add Books
  AddBook(data: Book): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.URL + '/private-add-book', data)
      .pipe(
        catchError(this.handleError)
      )
  }

  //Get all Books
  GetBooks() {
    return this.http.get<any>(this.URL + '/books');
  }

  //Get Book By Id
  GetBook(id: any): Observable<any> {
    return this.http.get<any>(this.URL + '/books/'+ `${id}`,{ headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  // Update
  updatedBook(id:any, data:any): Observable<any> {
    return this.http.put<any>(this.URL+ '/private-update-book/' + `${id}`,data,{ headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteBook(id: any): Observable<any> {
    return this.http.delete<any>(this.URL+ '/private-delete-book/' + `${id}`,{ headers: this.httpHeaders })
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

