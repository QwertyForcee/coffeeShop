import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private accountService:AccountService,private authService:AuthService) { }
  account:Account

  @Output() needToCloseEvent = new EventEmitter();
  
  ngOnInit(): void {
    this.accountService.getAccount().subscribe(res => 
      {
        this.account=res
        console.log(res)
      })
  }
  logOut(){
    this.authService.logout()
    this.needToCloseEvent.emit();
  } 
}
