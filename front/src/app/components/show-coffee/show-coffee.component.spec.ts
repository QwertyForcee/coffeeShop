import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoffeeComponent } from './show-coffee.component';

describe('ShowCoffeeComponent', () => {
  let component: ShowCoffeeComponent;
  let fixture: ComponentFixture<ShowCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
