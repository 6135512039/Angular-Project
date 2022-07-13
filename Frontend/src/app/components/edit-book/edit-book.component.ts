import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

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
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description']
      })
    })
    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })


    this.bookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }


  onSubmit(): any {
    this.taskService.AddBook(this.bookForm.value)
    .subscribe(() => {
      console.log("Data Added Successfully");
      this.ngZone.run(() => this.router.navigateByUrl('/private-add-book'))
    }, (err) => {
      console.log(err);
    });
  }

  onUpdate(): any {
    this.taskService.updatedBook(this.getId, this.updateForm.value).subscribe(() => {
      console.log('Data Update Successfully');
      this.ngZone.run(() => this.router.navigateByUrl('/private-add-book'))
    }, (err) => {
      console.log(err);
    })
  }

}
