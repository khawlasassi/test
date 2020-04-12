import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { product } from '../product.model';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
URL : string = "http://localhost:8080";

  constructor(private http : HttpClient) { }


  AddProduct(formData : FormData){
    this.http.post(this.URL+'/products/Product/add',formData).subscribe(res=>{
          console.log(res);
       });
  }
  deleteProduct (id: number): Observable<any> {
    const url = `${this.URL}/products/${id}`; // DELETE api/products/1
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteProduct'))
      );
  }

  getProduct(id: number) : Observable<product> {
    const url = `${this.URL}/products/${id}`; // GET api/products/1

    return this.http.get<product>(url)
      .pipe(
        catchError(this.handleError<product>('getProduct', product))
      );
  }

  updateProduct (p: product): Observable<product> {
    const url = `${this.URL}/products`; // PUT api/products/1

    return this.http.put<product>(url, p)
      .pipe(
        catchError(this.handleError('updateproduct', product))
      );
  }
  GetListOfProduct():Observable<product[]>{

    return this.http.get<product[]>(this.URL+'/products')
    .pipe(
      catchError(this.handleError<product[]>('getProducts', []))
    );

  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
