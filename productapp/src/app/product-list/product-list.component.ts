import { Component ,OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { products } from '../DATA/products';
import { ProductService } from '../services/product.service';
import { product } from '../product.model';
import {Subscriber} from "rxjs/index";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList : product[];


  constructor(private productService  : ProductService, private router : Router) { }
  ngOnInit(): void {
      this.productsList = products;
  }


  share() {
    window.alert('The product has been shared!');
  }


  /**
   * Function Delete Product
   */
  deleteProduct(productId, productIndex) {
    if (this.productsList[productIndex]) {
      // http service delete product
      // if success remove from list
      this.productService.deleteProduct(productIndex).subscribe(res => {
        if (res) {
          this.productsList.splice(productIndex, 1);
        }
      })
    }
  }

  /**
   * Function Edit Product
   */
  editProduct(productId) {
    window.localStorage.removeItem("editProductId");
    window.localStorage.setItem("editProductId", productId.toString());
    this.router.navigate(['edit']);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
