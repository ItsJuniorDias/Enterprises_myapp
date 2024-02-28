import { Reducer } from 'react';
import produce from 'immer';
import { ActionTypes, IAuthState } from './types';

export const INITIAL_STATE: IAuthState = {
  auth: [],
};

const auth: Reducer<IAuthState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.loginAuthSuccess: {
        const { data } = action.payload;

        draft.auth.push({
          data,
        });

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
