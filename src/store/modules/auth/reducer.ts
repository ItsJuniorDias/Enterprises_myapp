import { Reducer } from 'react';
import { produce } from 'immer';
import { ActionTypes, AuthStoreAction, IAuthState } from './types';

export const INITIAL_STATE: IAuthState = {
  auth: [],
};

const auth: Reducer<IAuthState, AuthStoreAction> = (
  state = INITIAL_STATE,
  action: AuthStoreAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.loginAuthSuccess: {
        const { data } = action.payload;

        draft.auth.push(data);

        break;
      }
      case ActionTypes.loginAuthFailure: {
        break;
      }

      case ActionTypes.logoutUser: {
        draft.auth.shift();
        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default auth;
