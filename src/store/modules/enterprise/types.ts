export enum ActionTypes {
  getEnterpriseRequest = 'GET_ENTERPRISE_REQUEST',
  getEnterpriseSuccess = 'GET_ENTERPRISE_SUCCESS',
  getEnterpriseFailure = 'GET_ENTERPRISE_FAILURE',
  getEnterpriseHeadersSuccess = 'GET_ENTERPRISE_HEADERS_SUCCESS',
}

interface TypeEnterprise {
  id: number;
  enterprise_type_name: string;
}

export interface IHeaders {
  uid: any;
  client: any;
  'access-token': any;
}

export interface IEnterprise {
  id: number;
  email_enterprise: null;
  facebook: null;
  twitter: null;
  linkedin: null;
  phone: null;
  own_enterprise: boolean;
  enterprise_name: string;
  photo: string;
  description: string;
  city: string;
  country: string;
  value: number;
  share_price: number;
  enterprise_type: TypeEnterprise;
}

export interface IEnterpriseState {
  enterprise: IEnterprise;
}
