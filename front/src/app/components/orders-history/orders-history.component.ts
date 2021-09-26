import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {

  constructor(private ordersService:OrdersService) { }
  orders
  ngOnInit(): void {
    this.ordersService.getOrders().subscribe(r=>{
      this.orders=r
      console.log(r)
    })
  }
  productsSum(products){
    if (products.length<1) return 0
    const reducer = (previous,current) => previous + current.price
    return products.reduce(reducer,0)
  }

}
