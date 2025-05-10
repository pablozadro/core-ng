import { Injectable } from '@angular/core';
import { NutritionItemsQueryState } from '@/nutrition/state/nutrition.reducer';

@Injectable({
  providedIn: 'root'
})
export class ParseItemsQueryService {

  parse(params: any): NutritionItemsQueryState | null {
    const q: any = {
      category: params?.category,
      orderBy: params?.orderBy,
      orderDir: params?.orderDir,
    };

    for (const key in q) {
      if (q[key] === undefined) delete q[key]
    }

    return Object.entries(q).length ? q : null;
  }
}
