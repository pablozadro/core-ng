import { Injectable } from '@angular/core';
import { CoreApiService } from '@/core/services/core-api.service';
import { Observable, of, map, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private readonly coreApi: CoreApiService
  ) { }

  getProducts(): Observable<any> {
    const url = 'http://localhost:9001/api/v1/products';
    return this.coreApi.get(url)
      .pipe(
        map((res: any) => {
          return res.payload && res.payload.products || null;
        })
      );
  }
}
