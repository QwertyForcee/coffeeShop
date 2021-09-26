import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ShowCoffeeComponent } from './components/show-coffee/show-coffee.component';
import { AddCoffeeComponent } from './components/add-coffee/add-coffee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FilterCoffeeComponent } from './components/filter-coffee/filter-coffee.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CoffeeImgComponent } from './components/coffee-img/coffee-img.component';
import { BuyBtnComponent } from './components/buy-btn/buy-btn.component';
import { CoffeePageComponent } from './components/coffee-page/coffee-page.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { AccountComponent } from './components/account/account.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { CartComponent } from './components/cart/cart.component';
import { DynamicCoffeeComponent } from './components/dynamic-coffee/dynamic-coffee.component';
import { FooterComponent } from './components/footer/footer.component';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShowCoffeeComponent,
    AddCoffeeComponent,
    MainHeaderComponent,
    FilterCoffeeComponent,
    NotfoundComponent,
    CoffeeImgComponent,
    BuyBtnComponent,
    CoffeePageComponent,
    LoginComponent,
    AccountComponent,
    OrdersHistoryComponent,
    CartComponent,
    DynamicCoffeeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config:{
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains 
      }
    })
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.authApi
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
