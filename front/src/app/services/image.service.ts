import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url = "https://localhost:5001/api/images/"
  constructor(private http:HttpClient) { }

  getImage(imageName){
    return this.url+imageName
  }

}
