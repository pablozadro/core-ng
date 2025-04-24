import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { CoreApiService, LiteApiResponse } from '@/core/services/core-api.service';
import { NutritionCategory, NutritionItem } from '@/nutrition/types';
import { GetItemsQuery } from '@/nutrition/types';


@Injectable({
  providedIn: 'root'
})
export class NutritionApiService {

  constructor(
    private readonly coreApiService: CoreApiService
  ) { }

  getCategories(): Observable<NutritionCategory[]> {
    const url = 'api/nutrition/categories';
    return this.coreApiService
      .get(url)
      .pipe(
        map((res: LiteApiResponse) => {
          return res.payload ? res.payload.categories: [];
        })
      );
  }

  getItems(query: GetItemsQuery): Observable<NutritionItem[]> {
    let url = 'api/nutrition/items';

    const parsedQuery = this.parseQuery(query);

    if(parsedQuery) {
      const q = Object.entries(parsedQuery).map(e => `${e[0]}=${e[1]}`).join('&');
      url = `${url}?${q}`;
    }

    return this.coreApiService
      .get(url)
      .pipe(
        map((res: LiteApiResponse) => {
          return res.payload ? res.payload.items: [];
        })
      );
  }

  getData(query: GetItemsQuery): Observable<{ categories: NutritionCategory[]; items: NutritionItem[]}> {
    return forkJoin({
      categories: this.getCategories(),
      items: this.getItems(query),
    })
  }

  private parseQuery(query:  GetItemsQuery):  GetItemsQuery | null {
    if (!Object.entries(query).length) return null;
    const q: any = { ...query };
    for (const key in q) {
      if (q[key as string] === undefined || q[key] === '') {
        delete q[key];
      }
    }
    return { ...q };
  }
}
