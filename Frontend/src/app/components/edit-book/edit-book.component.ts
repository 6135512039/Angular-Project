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

  bookForm: FormGroup;
  updateForm: FormGroup;
  getId: any;


  constructor( public formBuilder: FormBuilder,
               private router: Router,
               private ngZone: NgZone,
               private activatedRoute: ActivatedRoute,
               private taskService: TaskService,) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskService.GetBook(this.getId).subscribe(res => {
      if(res['_id'] == undefined || res['_id'] == null) {
        this.updateForm.setValue({
          id: null,
          name: null,
          price: null,
          description: null,
          img: null
        });
      } else {
        this.updateForm.setValue({
          id: res['_id'],
          name: res['name'],
          price: res['price'],
          description: res['description'],
          img: res['img']
        });
      }

    })
    this.updateForm = this.formBuilder.group({
      id: [{value:null, disabled: true}],
      name: [''],
      price: [''],
      description: [''],
      img: ['']
    });


    this.bookForm = this.formBuilder.group({
      id:['',[Validators.required]],
      name: ['',[Validators.required]],
      price: ['',[Validators.required]],
      description: ['',[Validators.required]],
      img: ['',[Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  onSubmit(): any {
    if(!this.bookForm.valid) {
      this.alertdatanull = true;
    }else{
      this.taskService.AddBook(this.bookForm.value).subscribe(() => {
        console.log("Data Added Successfully");
        this.alertdatasuccess = true;
        setTimeout(()=>{
          this.ngZone.run(() => this.router.navigateByUrl('/edit-data'))
          }, 2000)
      }, (err) => {
        console.log(err);
      });
    }

  }

  onUpdate(): any {
    if(!this.updateForm.valid) {
      this.alertdatanull2 = true;
    }else{
      this.taskService.updatedBook(this.getId, this.updateForm.value).subscribe(() => {
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
