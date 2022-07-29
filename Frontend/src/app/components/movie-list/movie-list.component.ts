import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  Movies:any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.GetMovies().subscribe(res =>{
      this.Movies = res;
    })
  }
}
