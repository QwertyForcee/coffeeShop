import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CoffeeService } from '../../services/coffee.service';

@Component({
  selector: 'app-filter-coffee',
  templateUrl: './filter-coffee.component.html',
  styleUrls: ['./filter-coffee.component.scss']
})
export class FilterCoffeeComponent implements OnInit {

  constructor(private service:CoffeeService) {
    this.filterGroup = new FormGroup(
      {
        "MinPrice": new FormControl(0,Validators.min(0)),
        "MaxPrice": new FormControl(10_000_000,Validators.min(0)),
        "RoastType": new FormControl(''),
        "IsGrounded": new FormControl(''),
        "Manufacturer": new FormControl(''),
        "Country": new FormControl('')
      }
    )
  }

  @Output() paramsChangedEvent = new EventEmitter()

  maxPrice
  filterGroup:FormGroup

  groundForms=[
    ['Grounded',true],
    ['Not grounded',false],
    ['Both',''],
  ]
  isGrounded
  gFormIndex = 1

  ngOnInit(): void {
    this.maxPrice = this.filterGroup.get('MaxPrice').value
    this.changeGround()
  }

  priceInputChanged(price){
    this.maxPrice=price
    this.inputChanged()
  }
  inputChanged(){
    this.paramsChangedEvent.emit(this.filterGroup.value)
  }
  changeGround(){
    if (this.gFormIndex == this.groundForms.length-1){
      this.gFormIndex = 0
    }
    else{
      this.gFormIndex++
    }
    this.isGrounded=this.groundForms[this.gFormIndex][0]
    this.filterGroup.patchValue({'IsGrounded':this.groundForms[this.gFormIndex][1]})
    console.log(this.filterGroup.value)
    this.inputChanged()
  }

}
