import { IEnterpriseState } from '../store/modules/enterprise/types';
import { combineReducers, createStore, Reducer } from 'redux';
import { produce } from 'immer';

export const INITIAL_STATE: IEnterpriseState = {
  enterprise: {
    id: 0,
    email_enterprise: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    phone: null,
    own_enterprise: false,
    enterprise_name: 'NuBank',
    photo: '',
    description:
      'Nubank é uma empresa startup brasileira pioneira no segmento de serviços financeiros',
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

export const enterprise: Reducer<IEnterpriseState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      default: {
        return draft;
      }
    }
  });
};

export function createTestStore() {
  const store = createStore(
    combineReducers({
      enterprise,
    })
  );
  return store;
}
