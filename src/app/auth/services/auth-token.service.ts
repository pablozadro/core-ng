import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


export interface AuthTokenPayload {
  username: string;
  email: string;
  active: boolean;
  role: string;
  iat: number;
  exp: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  constructor() { }

  encode(obj: any): string {
    return window.btoa(JSON.stringify(obj));
  }

  decode(str: string): any {
    return JSON.parse(window.atob(str));
  }

  generateMockedToken(payload: any): string {
    const eHeader = this.encode({ alg: 'HS256', typ: 'JWT' });
    const ePayload = this.encode(payload);
    const eSign = this.encode({});

    return `${eHeader}.${ePayload}.${eSign}`;
  }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(error) {
      return null;
    }
  }
}
