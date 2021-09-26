import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBtnComponent } from './buy-btn.component';

describe('BuyBtnComponent', () => {
  let component: BuyBtnComponent;
  let fixture: ComponentFixture<BuyBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
