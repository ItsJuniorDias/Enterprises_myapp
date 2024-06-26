import { Reducer } from 'react';
import { produce } from 'immer';
import { ActionTypes, EnterprisesAction, IEnterpriseState } from './types';

export const INITIAL_STATE: IEnterpriseState = {
  enterprise: {
    id: 0,
    email_enterprise: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    phone: null,
    own_enterprise: false,
    enterprise_name: '',
    photo: '',
    description: '',
    city: '',
    country: '',
    value: 0,
    share_price: 0,
    enterprise_type: {
      enterprise_type_name: '',
      id: 0,
    },
  },
};

const enterprise: Reducer<IEnterpriseState, EnterprisesAction> = (
  state = INITIAL_STATE,
  action: EnterprisesAction
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.getEnterpriseSuccess: {
        const { enterprises } = action.payload.data;

        return {
          ...draft,
          ...enterprises,
        };
      }
      case ActionTypes.getEnterpriseFailure: {
        break;
      }

      default: {
        return draft;
      }
    }
  });
};

export default enterprise;
