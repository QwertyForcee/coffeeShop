import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeImgComponent } from './coffee-img.component';

describe('CoffeeImgComponent', () => {
  let component: CoffeeImgComponent;
  let fixture: ComponentFixture<CoffeeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
