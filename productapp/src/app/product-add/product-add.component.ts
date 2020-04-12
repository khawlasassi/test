import { Component, OnInit, ViewChild } from '@angular/core';
import{product} from '../product.model';
import {ElementRef} from '@angular/core';
import { ProductService } from '../services/product.service';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})

export class ProductAddComponent implements OnInit {


 Products : product[] = [];
  Product : product;
@ViewChild('imageInput')imageInput: ElementRef;
selectedFile = null;


  constructor(private productService  : ProductService) { }

  ngOnInit(): void {
    this.Product  = new product();
  }

  onSubmit(product) {
    const formData = new FormData();
    formData.append('Intitule', product.intitule);
    formData.append('Prix', product.prix);
    formData.append('Image', this.selectedFile, this.selectedFile.name);

      this.Products.push(product);
   //this.productService.AddProduct(formData);
      this.clear();
    }

    clear(){
      this.Product.intitule = null;
      this.Product.prix =null;
      this.imageInput.nativeElement.value = null;
    }


  onFileSelected(event){
    this.selectedFile = event.target.files[0];
}
 
}



