import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCoffeeComponent } from './filter-coffee.component';

describe('FilterCoffeeComponent', () => {
  let component: FilterCoffeeComponent;
  let fixture: ComponentFixture<FilterCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
