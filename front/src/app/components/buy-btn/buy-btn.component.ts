import { Component, Input, OnInit } from '@angular/core';
import { Coffee } from 'src/app/models/coffeeProduct';
import { OrdersService } from 'src/app/services/orders.service';
import {colors} from './colors'

@Component({
  selector: 'app-buy-btn',
  templateUrl: './buy-btn.component.html',
  styleUrls: ['./buy-btn.component.scss']
})
export class BuyBtnComponent implements OnInit {

  constructor(private ordersService:OrdersService) { }

  @Input()
  price:number

  @Input()
  coffee:Coffee

  buyBtnStyle
  ngOnInit(): void {
    this.buyBtnStyle = {'background':this.randomColor()}
  }

  randomColor(){
    let i = Math.trunc(Math.random()*10)
    return colors[i]
  }
  addToCart(){
    this.ordersService.addToCart(this.coffee)
  }
}
