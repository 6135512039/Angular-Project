import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  Books: any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.GetBooks().subscribe(res =>{
      console.log(res)
      this.Books = res;
      });
  }

}
