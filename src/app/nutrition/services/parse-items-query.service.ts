import { Injectable } from '@angular/core';
import { GetItemsQuery } from '@/nutrition/types';

@Injectable({
  providedIn: 'root'
})
export class ParseItemsQueryService {

  getQueryFromParams(params: any): GetItemsQuery {
    return {
      category: params?.category || '',
      orderBy: params?.orderBy || '',
    };
  }
}
