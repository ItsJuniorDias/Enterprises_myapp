import { produce } from 'immer';
import { Reducer } from 'react';
import { IShowState, ActionTypes, ShowAction } from './types';

export const INITIAL_STATE: IShowState = {
  show: {
    id: 0,
    enterprise_name: '',
    description: '',
    email_enterprise: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    phone: null,
    own_enterprise: null,
    photo: '',
    value: 0,
    shares: 0,
    share_price: 0,
    own_shares: 0,
    city: '',
    country: '',
    enterprise_type: {
      enterprise_type_name: '',
      id: 0,
    },
  },
  headers: {
    uid: '',
    client: '',
    'access-token': '',
  },
};

const show: Reducer<IShowState, ShowAction> = (
  state = INITIAL_STATE,
  action: ShowAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.successShow: {
        const { data } = action.payload;

        return {
          ...draft,
          ...data,
        };
      }
      case ActionTypes.requestHeaders: {
        const { headers } = action.payload;

        return {
          ...draft,
          ...headers,
        };
      }
      case ActionTypes.resetState: {
        const { enterprise } = action.payload;

        const show = enterprise;

        return {
          ...draft,
          show,
        };
      }
      case ActionTypes.failureShow: {
        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default show;
