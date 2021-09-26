import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { map, tap } from 'rxjs/operators';
   

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = "https://localhost:5001/api/"
  constructor(private http:HttpClient) { }

  getAccount():Observable<Account>{
    return this.http.get<Account>(this.url+'Accounts')
  }

}
