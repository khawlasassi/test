import { Injectable } from '@angular/core';
import { product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor() { }


  uploadImage(productsList:product[]) : product[] {

    productsList.forEach(product => {  
           var reader = new FileReader();
           reader.readAsDataURL(product.image); 
           reader.onload = (_event) => { 
          product.imgURL = reader.result; 
           }
        });  
        return productsList;
  }
}
