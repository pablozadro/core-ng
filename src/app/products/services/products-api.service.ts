import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';


export interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
}

const products: Products[] = [
  { id: 1, title: 'product A', description: 'some product description', price: 10.210 },
  { id: 2, title: 'product B', description: 'some product description', price: 17.045 },
  { id: 3, title: 'product C', description: 'some product description', price: 78.768 },
  { id: 4, title: 'product D', description: 'some product description', price: 110.233 },
  { id: 5, title: 'product E', description: 'some product description', price: 5.765 },
]

let filtered: Products[] = [
  ...products
]


@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor() { }

  getProducts(): Observable<Products[]> {
    const products$: Observable<Products[]> = of(filtered);
    return products$.pipe(delay(1000));
  }

  deleteProductByID(id: number) {
    filtered = filtered.filter(product => product.id !== id);
    const filtered$: Observable<Products[]> = of(filtered);
    return filtered$.pipe(delay(1000));
  }
}
