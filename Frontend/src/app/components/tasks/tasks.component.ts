import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  Books: any = [];
  imagepath: any;
  p: number = 1;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.GetBooks().subscribe(res =>{
      this.Books = res;
      });
  }

}
