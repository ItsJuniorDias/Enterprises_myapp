/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
export enum ActionTypes {
  requestShow = 'REQUEST_SHOW',
  requestHeaders = 'REQUEST_HEADERS',
  successShow = 'SUCCESS_SHOW',
  failureShow = 'FAILURE_SHOW',
  resetState = 'RESET_STATE',
}

export type ShowAction =
  | {
      type: ActionTypes.successShow;
      payload: {
        data: IShow;
      };
    }
  | {
      type: ActionTypes.requestHeaders;
      payload: {
        headers: IHeaders;
      };
    }
  | {
      type: ActionTypes.resetState;
      payload: {
        enterprise: IShow;
      };
    }
  | {
      type: ActionTypes.failureShow;
      payload: {};
    };

interface IEnterpriseType {
  id: number;
  enterprise_type_name: string;
}

export interface IShow {
  id: number;
  enterprise_name: string;
  description: string;
  email_enterprise: null;
  facebook: null;
  twitter: null;
  linkedin: null;
  phone: null;
  own_enterprise: null;
  photo: string;
  value: number;
  shares: number;
  share_price: number;
  own_shares: number;
  city: string;
  country: string;
  enterprise_type: IEnterpriseType;
}

export interface IHeaders {
  uid: any;
  client: any;
  'access-token': any;
}

export interface IShowState {
  show: IShow;
  headers: IHeaders;
}
