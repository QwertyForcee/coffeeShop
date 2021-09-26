import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  url = "https://localhost:5001/api/"
  constructor(private http:HttpClient) { }

  postCoffeeProduct(formdata):Observable<any>{
    return this.http.post(this.url+'Coffee',formdata)
  }

  getCoffeeProduct():Observable<any>{
    return this.http.get(this.url+'Coffee')
  }

  getCoffeeProductWithParams(params):Observable<any>{
    return this.http.get(this.url+'Coffee/f',{'params':params})
  }

  getCoffeeProductById(id):Observable<any>{
    return this.http.get(this.url+'Coffee/'+id)
  }

}
