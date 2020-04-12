import { Component, OnInit, ViewChild } from '@angular/core';
import{product} from '../product.model';
import {ElementRef} from '@angular/core';
import { ProductService } from '../services/product.service';
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'})

export class ProductEditComponent implements OnInit {


 Products : product[] = [];
  Product : product;
@ViewChild('imageInput')imageInput: ElementRef;
selectedFile = null;


  constructor(private productService  : ProductService, private router: Router,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.Product  = new product();
    let productId = window.localStorage.getItem("editProductId");
    if(!productId) {
      alert("Invalid action.")
      this.router.navigate(['']);
      return;
    }
    this.productService.getProduct(Number.parseInt(productId)).subscribe((p: product) => {
      if (p) {
        this.Product = p;
      }
    });
  }

  onSubmit(product) {
    const formData = new FormData();
    formData.append('Intitule', product.intitule);
    formData.append('Prix', product.prix);
    formData.append('Image', this.selectedFile, this.selectedFile.name);

     if (product) {
       this.productService.updateProduct(product).subscribe((p : product) => {
         console.log('Product updated !!!');
         this.router.navigateByUrl('/');
       })
     }
    }



  onFileSelected(event){
    this.selectedFile = event.target.files[0];
}

}



