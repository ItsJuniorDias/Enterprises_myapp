import { ActionTypes, IAuthUser } from './types';

export function loginToAuthRequest(data: IAuthUser) {
  return {
    type: ActionTypes.loginAuthRequest,
    payload: {
      data,
    },
  };
}

export function loginToAuthSuccess(data: IAuthUser) {
  return {
    type: ActionTypes.loginAuthSuccess,
    payload: {
      data,
    },
  };
}

export function loginToAuthFailure() {
  return {
    type: ActionTypes.loginAuthFailure,
    payload: {},
  };
}

export function logoutUser() {
  return {
    type: ActionTypes.logoutUser,
  };
}
