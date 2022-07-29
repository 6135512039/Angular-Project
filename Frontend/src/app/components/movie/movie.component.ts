import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  Movies:any = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.GetMovies().subscribe(res =>{
      this.Movies = res;
    })
  }
}
