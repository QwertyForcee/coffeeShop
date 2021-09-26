export class Coffee{
    Id?:number
    Name:string
    Description:string
    Price:number
    IsGrounded:boolean
    RoastType:string

    Country:Country
    Manufacturer:Manufacturer

    Image:File

    constructor(){}
}
export class Country{
    Id?:number
    Name:string
}
export class Manufacturer{
    Id?:number
    Name:string
}

