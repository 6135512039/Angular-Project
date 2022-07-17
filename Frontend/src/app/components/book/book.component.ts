import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  Books:any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.GetBooks().subscribe(res =>{
      this.Books = res;
    })
  }
}
