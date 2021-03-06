import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogInMode=true
  constructor(private authService:AuthService,private router:Router) { }
  loginForm:FormGroup = new FormGroup({
    "email":new FormControl(),
    "password": new FormControl()
  })

  ngOnInit(): void {
    
  }
  submitLogin(){
    let login = this.loginForm.value
    this.authService.login(login).subscribe(r=>{
        this.router.navigate([''])
    })
  }
  submitRegister(){
    let login = this.loginForm.value
    this.authService.signup(login).subscribe(r=>{
        this.router.navigate([''])
    })
  }
  changeMode(){
    this.isLogInMode=!this.isLogInMode
  }
}
