import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CoreApiService, LiteApiResponse } from '@/core/services/core-api.service';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';

export interface GetItemsQuery {
  category?: string;
}

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

  getItems(query: GetItemsQuery = {}): Observable<NutritionItem[] | null> {
    let url = 'api/nutrition/items';
    if(query && query.category) {
      url = `${url}?category=${query.category}`
    }
    return this.coreApiService
      .get(url)
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
