import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddCoffeeComponent } from './components/add-coffee/add-coffee.component';
import { CartComponent } from './components/cart/cart.component';
import { CoffeePageComponent } from './components/coffee-page/coffee-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { OrdersHistoryComponent } from './components/orders-history/orders-history.component';
import { ShowCoffeeComponent } from './components/show-coffee/show-coffee.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'coffee',component:ShowCoffeeComponent},
  {path:'coffee/:id',component:CoffeePageComponent},
  {path:'add-coffee',component:AddCoffeeComponent,canActivate:[AdminGuard]},
  {path:'login',component:LoginComponent},
  {path:'account',component:AccountComponent,canActivate:[AuthGuard]},
  {path:'orders',component:OrdersHistoryComponent,canActivate:[AuthGuard]},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
