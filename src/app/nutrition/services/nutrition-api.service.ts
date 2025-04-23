import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CoreApiService, LiteApiResponse } from '@/core/services/core-api.service';

export interface NutritionCategory {
  title: string;
  color: string;
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
}
