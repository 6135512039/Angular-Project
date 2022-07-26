import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  Books: any = [];
  alertdatanull:boolean = false;
  alertdatanull2:boolean = false;
  alertdatasuccess:boolean = false;
  alertupdatesuccess:boolean = false;

  movieForm: FormGroup;
  updateForm: FormGroup;
  getId: any;


  constructor( public formBuilder: FormBuilder,
               private router: Router,
               private ngZone: NgZone,
               private activatedRoute: ActivatedRoute,
               private taskService: TaskService,) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskService.GetMovie(this.getId).subscribe(res => {
      if(res['_id'] == undefined || res['_id'] == null) {
        this.updateForm.setValue({
          id: null,
          name: null,
          description: null,
          img: null,
          youtubeid: null,
          movieurl: null
        });
      } else {
        this.updateForm.setValue({
          id: res['_id'],
          name: res['name'],
          description: res['description'],
          img: res['img'],
          youtubeid: res['youtubeid'],
          movieurl: res['movieurl']
        });
      }

    })
    this.updateForm = this.formBuilder.group({
      id: [{value:null, disabled: true}],
      name: [''],
      description: [''],
      img: [''],
      youtubeid: [''],
      movieurl: ['']
    });


    this.movieForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: ['',[Validators.required]],
      img: ['',[Validators.required]],
      youtubeid: ['', [Validators.required]],
      movieurl: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  onSubmit(): any {
    if(!this.movieForm.valid) {
      this.alertdatanull = true;
    }else{
      this.taskService.AddMovie(this.movieForm.value).subscribe(() => {
        console.log("Data Added Successfully");
        this.alertdatasuccess = true;
        setTimeout(()=>{
          this.ngZone.run(() => this.router.navigateByUrl('/edit-data')
          .then (() => {
            window.location.reload();
            })
          )}, 2000)
      }, (err) => {
        console.log(err);
      });
    }

  }

  onUpdate(): any {
    if(!this.updateForm.valid) {
      this.alertdatanull2 = true;
    }else{
      this.taskService.updatedMovie(this.getId, this.updateForm.value).subscribe(() => {
        console.log('Data Update Successfully');
        this.alertupdatesuccess = true;
        setTimeout(()=>{
          this.ngZone.run(() => this.router.navigateByUrl('/edit-data'))
          }, 2000)
      }, (err) => {
        console.log(err);
      })
    }
  }

  alertClose() {
    this.alertdatanull = false;
    this.alertdatanull2 = false;
    this.alertdatasuccess = false;
    this.alertupdatesuccess = false;
  }

}
