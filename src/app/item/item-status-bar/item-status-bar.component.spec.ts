import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStatusBarComponent } from './item-status-bar.component';

describe('ItemStatusBarComponent', () => {
  let component: ItemStatusBarComponent;
  let fixture: ComponentFixture<ItemStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStatusBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
