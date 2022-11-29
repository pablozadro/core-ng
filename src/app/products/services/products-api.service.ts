import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

import { CoreApiService } from '@app/core/services/core-api.service';


@Injectable()
export class ProductsApiService {
  private readonly CORE_API_BASE_URL = environment.coreApiBaseUrl;

  constructor(
    private coreApiService: CoreApiService
  ) { }

  getProducts(): Observable<any> {
    return this.coreApiService.get(`${this.CORE_API_BASE_URL}/products?delay=750`)
  }

  getProductByID(id: number): Observable<any> {
    return this.coreApiService.get(`${this.CORE_API_BASE_URL}/products/${id}?delay=750`)
  }

  deleteProductByID(id: number): Observable<any> {
    return this.coreApiService.delete(`${this.CORE_API_BASE_URL}/products/${id}?delay=750`)
  }
}
