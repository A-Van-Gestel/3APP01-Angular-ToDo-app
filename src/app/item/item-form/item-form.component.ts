import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { List } from '../../list/list';
import { ListService } from '../../list/list.service';
import { Status } from '../../status/status';
import { StatusEnum } from '../../status/status-enum';
import { StatusService } from '../../status/status.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  itemId: number = 0;
  isAdd: boolean = false;
  isEdit: boolean = false;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();
  lists$: Subscription = new Subscription();
  statuses$: Subscription = new Subscription();

  date = new Date();
  dateTime = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)); // TimeZone differences: https://stackoverflow.com/a/37661393

// reactive form
  itemForm = new FormGroup({
    id: new FormControl(''),
    listId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl(this.dateTime.toISOString().substring(0, 16), [Validators.required]),
    statusId: new FormControl(StatusEnum.ONGOING, [Validators.required]), // default status is ongoing
    order: new FormControl('', [Validators.required]),
  });

  // lists select
  lists: List[] = [];

  // status
  statuses: Status[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private listService: ListService,
              private statusService: StatusService) {
    this.isAdd = this.router.url === '/new';
    this.isEdit = !this.isAdd;
  }

  ngOnInit(): void {
    // get item if in edit
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.itemId = +id;
        this.itemService.getItemById(+id).subscribe(result => {
          // Get current date
          this.date = new Date(result.date);

          this.itemForm.patchValue({
            id: result.id,
            listId: result.listId,
            title: result.title,
            description: result.description,
            date: this.date.toISOString().substring(0, 16),
            statusId: result.statusId,
            order: result.order,
          });
        });
      }
    }

    // get lists
    this.lists$ = this.listService.getLists().subscribe(result => {
      this.lists = result;
    });

    // get statuses
    this.statuses$ = this.statusService.getStatuses().subscribe(result => {
      this.statuses = result;
    });

    // Track Changes for validation messages in view
  }

  ngOnDestroy(): void {
    this.postItem$.unsubscribe();
    this.lists$.unsubscribe();
    this.statuses$.unsubscribe();
    this.putItem$.unsubscribe();
  }

  getTitle(): string {
    if (this.isAdd) {
      return 'Add new To-Do';
    } else {
      return 'Edit To-Do';
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.submitData();
  }

  submitData(): void {
    // Fixing the dateTime string to correctly convert back to the correct Date()
    let formValue = this.itemForm.value;
    let dateTime = formValue.date + ":00.000Z"; // if not added the time is an hour short
    formValue.date = dateTime;

    if (this.isAdd) {
      //Add
      this.postItem$ = this.itemService.postItem(formValue).subscribe(result => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    } else {
      //edit
      this.putItem$ = this.itemService.putItem(this.itemId, formValue).subscribe(result => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.isSubmitted = false;
          this.errorMessage = error.message;
        });
    }
  }

}
