export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}