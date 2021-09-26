import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Coffee, Country, Manufacturer } from 'src/app/models/coffeeProduct';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-add-coffee',
  templateUrl: './add-coffee.component.html',
  styleUrls: ['./add-coffee.component.scss']
})
export class AddCoffeeComponent implements OnInit {
  coffeeForm:FormGroup;
  src;
  constructor(private service:CoffeeService) {
    this.coffeeForm = new FormGroup(
      {
        "Name":new FormControl("",Validators.required),
        "Price":new FormControl(0,Validators.required),
        "Description":new FormControl("",Validators.required),
        "Manufacturer":new FormControl("",Validators.required),
        "Country":new FormControl("",Validators.required),
        "RoastType":new FormControl("",Validators.required),
        "IsGrounded":new FormControl(false),
        "Image":new FormControl()
      }
    )
   }

  ngOnInit(): void {
  }

  openFile(event){
    let input = event.target;
    this.coffeeForm.controls["Image"].setValue(input.files[0])
        let reader = new FileReader();
        reader.onload = () => {
            // this 'text' is the content of the file
            var text = reader.result;
            
            this.src=text
        }
        reader.readAsDataURL(input.files[0]);
  }
  submit(){
    //console.log(this.coffeeForm)
    let coffeeObj = {
      'Name':this.coffeeForm.controls["Name"].value,
      'Description':this.coffeeForm.controls["Description"].value,
      'Price':this.coffeeForm.controls["Price"].value,
      'Manufacturer':this.coffeeForm.controls["Manufacturer"].value,
      'Country':this.coffeeForm.controls["Country"].value,
      'IsGrounded':this.coffeeForm.controls["IsGrounded"].value,
      'RoastType':this.coffeeForm.controls["RoastType"].value,
    }
    let coffee = new FormData()
    /*
    coffee.append('Name',this.coffeeForm.controls["Name"].value)
    coffee.append('Description',this.coffeeForm.controls["Description"].value)
    coffee.append('Price',this.coffeeForm.controls["Price"].value)
    coffee.append('Manufacturer',this.coffeeForm.controls["Manufacturer"].value)
    coffee.append('Country',this.coffeeForm.controls["Country"].value)
    coffee.append('IsGrounded',this.coffeeForm.controls["IsGrounded"].value)
    coffee.append('RoastType',this.coffeeForm.controls["RoastType"].value)
    */
    coffee.append('Image',this.coffeeForm.controls["Image"].value)
    coffee.append('Coffee',JSON.stringify(coffeeObj))
    
    this.service.postCoffeeProduct(coffee).subscribe(d=>{
      console.log(d)
    })
    
  }


}
