import { Component, ForwardRefFn, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.scss']
})
export class PrivateTasksComponent implements OnInit {

  id: any;
  Users: any = [];
  Books:any = [];
  updateForm: FormGroup;
  getid: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private taskService: TaskService,) {



      this.updateForm = this.formBuilder.group({
        _id:[''],
        name: [''],
        price: [''],
        description: [''],
        img: ['']
      })
    }

  ngOnInit(): void {
    this.taskService.GetBooks().subscribe((res: any) =>{
      this.Books = res;
    })
    this.taskService.GetUsers().subscribe((res: any) =>{
      this.Users = res;
    })

  }

  deleteBook(id:any, i:any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.taskService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      });
    }
  }

  deleteUser(id: any, i: any) {
    if (window.confirm('Do you want to go ahead?')) {
      this.taskService.deleteUser(id).subscribe((res) => {
        this.Users.splice(i, 1);
      });
    }
  }

}
