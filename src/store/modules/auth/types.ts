export enum ActionTypes {
  loginAuthRequest = 'LOGIN_AUTH_REQUEST',
  loginAuthSuccess = 'LOGIN_AUTH_SUCCESS',
  loginAuthFailure = 'LOGIN_AUTH_FAILURE',
  logoutUser = 'LOGOUT_USER',
}

export interface IInvestor {
  id: number;
  investor_name: string;
  email: string;
  city: string;
  country: string;
  balance: number;
  photo: any;
  portfolio: object;
  portfolio_value: number;
  first_access: boolean;
  super_angel: boolean;
}

export interface IAuthResponse {
  data: IInvestor;
}

export interface IAuthUser {
  email: string;
  password: string;
}

export interface IAuth {
  access_token: string;
  client: string;
  uid: string;
}

export interface IAuthState {
  auth: IAuth[];
}
