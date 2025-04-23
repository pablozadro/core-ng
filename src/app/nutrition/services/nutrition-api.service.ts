import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CoreApiService, LiteApiResponse } from '@/core/services/core-api.service';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';


@Injectable({
  providedIn: 'root'
})
export class NutritionApiService {

  constructor(
    private readonly coreApiService: CoreApiService
  ) { }

  getCategories(): Observable<NutritionCategory[] | null> {
    return this.coreApiService
      .get('api/nutrition/categories')
      .pipe(
        map((res: LiteApiResponse) => {
          if(!res.payload) {
            return null
          }
          return res.payload.categories;
        })
      );
  }

  getItems(): Observable<NutritionItem[] | null> {
    return this.coreApiService
      .get('api/nutrition/items')
      .pipe(
        map((res: LiteApiResponse) => {
          if(!res.payload) {
            return null
          }
          return res.payload.items;
        })
      );
  }
}
