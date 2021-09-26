import { Component, OnInit } from '@angular/core';
import { CoffeeService } from 'src/app/services/coffee.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-show-coffee',
  templateUrl: './show-coffee.component.html',
  styleUrls: ['./show-coffee.component.scss']
})
export class ShowCoffeeComponent implements OnInit {

  constructor(private service:CoffeeService,private imageService:ImageService) { }
  products=[]
  params={}

  get isEmpty(){
    return this.products.length
  }

  get isNotEmpty(){
    return !this.isEmpty
  }
  ngOnInit(): void {
    this.service.getCoffeeProduct().subscribe(d=>{
      this.products = d
      console.log(this.products)
      this.products.forEach(element => {
        element.image = this.imageService.getImage(element.imageName)
      });
    })
  }

  setParams(event){
    this.params = event
    if (Object.keys(this.params).length === 0){
      this.service.getCoffeeProduct().subscribe(d=>{
        this.products = d
        console.log(this.products)
        this.products.forEach(element => {
          element.image = this.imageService.getImage(element.imageName)
        });
      })
    }
    else{
      this.service.getCoffeeProductWithParams(this.params).subscribe(
        d=>{
          this.products = d
          console.log(this.products)
          this.products.forEach(element => {
            element.image = this.imageService.getImage(element.imageName)
          });
        }
      )
    }
  }
}
