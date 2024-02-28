import { ActionTypes, IEnterprise, IHeaders } from './types';

export function getEnterpriseRequest(headers: IHeaders) {
  return {
    type: ActionTypes.getEnterpriseRequest,
    payload: {
      headers,
    },
  };
}

export function getEnterpriseSuccess(data: IEnterprise) {
  return {
    type: ActionTypes.getEnterpriseSuccess,
    payload: {
      data,
    },
  };
}

export function getEnterpriseFailure() {
  return {
    type: ActionTypes.getEnterpriseFailure,
    payload: {},
  };
}
