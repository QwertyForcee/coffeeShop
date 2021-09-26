import { Component, HostListener, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  animations: [
    trigger('popOverState',[
      state('show',style(
        {transform: 'translateY(0)'}
      )),
      state('hide',style(
        {transform: 'translateY(-100%)'}
      )),
      transition('show => hide', animate('400ms')),
      transition('hide => show', animate('350ms'))
    ])
  ]
})
export class MainHeaderComponent implements OnInit {

  constructor(private authService:AuthService,private accountService:AccountService) { }

  show = true;
  oldScroll
  navtop = 0
  isAdmin=false

  showAccount=false

  get isLoggedIn(){
    return this.authService.isAuthenticated()
  }

  get stateName(){
    return this.show? 'show' :'hide'
  }

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.isAdminCheck()
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event){
    /*
    if (window.scrollY === 0){
      this.navtop = 105
    }
    else{
      this.navtop = 0 
    }
    console.log(this.navtop)
    */
    this.show  = window.scrollY < this.oldScroll
    this.oldScroll = window.scrollY;
  }
  AccountToggle(){
    this.showAccount = !this.showAccount
  } 
  setShowAccToFalse(event){
    this.showAccount = false
  }
  async isAdminCheck(){
    let res = this.accountService.getAccount().pipe(map((acc:any)=>{
      if (acc.roles.includes('Admin')){
        return true
      }
    })).toPromise()
    return res
  }
}
