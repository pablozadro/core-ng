import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CoreApiService, LiteApiResponse, LiteApiError } from '@/core/services/core-api.service';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';

import { NutritionItemsQueryState } from '@/nutrition/state/nutrition.reducer';


export interface GetCategoriesResponse {
  error: LiteApiError | null;
  categories: NutritionCategory[];
}

export interface GetItemsResponse {
  error: LiteApiError | null;
  items: NutritionItem[];
}


@Injectable({
  providedIn: 'root'
})
export class NutritionApiService {

  constructor(
    private readonly coreApiService: CoreApiService
  ) { }

  getCategories(): Observable<GetCategoriesResponse> {
    const url = 'api/nutrition/categories';

    return this.coreApiService
      .get(url)
      .pipe(
        map((res: LiteApiResponse) => {
          const { error } = res;
          const categories = res.payload ? res.payload.categories : null;
          return { categories, error }
        })
      );
  }

  getItems(query: NutritionItemsQueryState = {}): Observable<GetItemsResponse> {
    let url = 'api/nutrition/items';

    const params = this.createParamsFromQuery(query);

    if(params) {
      url = `${url}?${params}`;
    }

    return this.coreApiService
      .get(url)
      .pipe(
        map((res: LiteApiResponse) => {
          const { error } = res;
          const items = res.payload ? res.payload.items : null;
          return { items, error }
        })
      );
  }

  private createParamsFromQuery(query: NutritionItemsQueryState): string | null {
    if(!Object.entries(query).length) return null;
    let params = '';
    
    for (const prop in query) {
      if (query[prop as keyof NutritionItemsQueryState]) {
        params = `${params}&${prop}=${query[prop as keyof NutritionItemsQueryState]}`
      }
    }

    return params || null;
  }
}
