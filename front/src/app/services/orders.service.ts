import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coffee } from '../models/coffeeProduct';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url = "https://localhost:5001/api/"
  private cart:any[]=[]
  constructor(private http:HttpClient) { }

  getOrders():Observable<any>{
    return this.http.get(this.url + 'Orders')
  }
  createOrder():Observable<any>{
    let ids= this.cart.map((c)=>c.id)
    console.log(ids)
    return this.http.post(this.url + 'Orders',ids)
  }
  addToCart(coffee:Coffee){
    if (this.cart.includes(coffee)){

    }
    else{
      this.cart.push(coffee)
    }


  }
  getCart(){
    console.log(this.cart)
    return this.cart
  }
}
