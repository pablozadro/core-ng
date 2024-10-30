import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { CoreApiService, CoreApiResponse } from '@/core/services/core-api.service';


export interface NetInterface {
  address: string;
  netmask: string;
  family: string;
  mac: string;
  internal: boolean;
  cidr: string;
  scopeid: number;
}

export type NetInterfaces = {
  [key: string]: NetInterface[];
}


@Injectable({
  providedIn: 'root'
})
export class NetApiService {
  readonly NET_INTERFACES_URL = 'net/interfaces';
  constructor(
    private readonly coreApiService: CoreApiService
  ) { }

  getInterfaces(): Observable<NetInterfaces | null> {
    return this.coreApiService.get(this.NET_INTERFACES_URL)
      .pipe(
        map((res: CoreApiResponse) => {
          if(res.error) {
            return of(null)
          }
          return res.payload.nets
        })
      )
  }
}
