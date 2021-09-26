import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCoffeeComponent } from './dynamic-coffee.component';

describe('DynamicCoffeeComponent', () => {
  let component: DynamicCoffeeComponent;
  let fixture: ComponentFixture<DynamicCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
