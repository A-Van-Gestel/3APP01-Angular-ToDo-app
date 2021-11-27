import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { validColorHexValidator } from 'src/app/shared/valid-color-hex-validator';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})

export class ListFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  listId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  list$: Subscription = new Subscription();
  postList$: Subscription = new Subscription();
  putList$: Subscription = new Subscription();

  // reactive form
  listForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(7), validColorHexValidator()])
  });

  constructor(private router: Router, private listService: ListService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.listId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.listId != null && this.listId > 0) {
      this.list$ = this.listService.getListById(this.listId).subscribe(result => {
        this.listForm.setValue({
          name: result.name,
          color: result.color
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.list$.unsubscribe();
    this.postList$.unsubscribe();
    this.putList$.unsubscribe();
  }

  getTitle(): string {
    if (this.isAdd) {
      return 'Add new List';
    } else {
      return 'Edit List';
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postList$ = this.listService.postList(this.listForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/list");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putList$ = this.listService.putList(this.listId, this.listForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/list");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

}
