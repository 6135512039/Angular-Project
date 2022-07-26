import { Component, Input, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  getId: any;
  Book: any = [];

  constructor(private taskService:TaskService,
              private activatedRoute:ActivatedRoute,
              public sanitizer: DomSanitizer) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.taskService.GetBook(this.getId).subscribe(res => {
    this.Book = res;
    })
  }

}
