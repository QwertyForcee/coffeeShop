import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-coffee-page',
  templateUrl: './coffee-page.component.html',
  styleUrls: ['./coffee-page.component.scss']
})
export class CoffeePageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private coffeeService:CoffeeService,private router: Router) { }
  coffeeId:number
  coffee
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id']
    id = Number(id)
    if (typeof id === 'number' && !isNaN(id)){
      this.coffeeService.getCoffeeProductById(id).subscribe(r=>{
        if (r.length === 0){
          this.router.navigate([''])
        }else{
          this.coffee = r
        }
      })
    }else{
      this.router.navigate([''])
    }
  }

}
