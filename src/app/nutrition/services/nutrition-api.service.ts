import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CoreApiService, LiteApiResponse, LiteApiError } from '@/core/services/core-api.service';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';


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

  getItems(): Observable<GetItemsResponse> {
    const url = 'api/nutrition/items';

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
}
