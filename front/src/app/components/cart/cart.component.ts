import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private ordersService:OrdersService) { }
  products=[]
  btnStatus='Купить'
  ngOnInit(): void {
    this.products = this.ordersService.getCart()
    if (this.products.length<1){
      this.btnStatus = 'Куплено или пусто'
    }
  }
  buy(){
    if (this.products.length>0){
      this.ordersService.createOrder().subscribe(r=>{
        this.products=[]
        this.btnStatus = 'Куплено'
      })
    }
  }


}
