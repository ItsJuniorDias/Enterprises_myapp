import { Reducer } from 'react';
import produce from 'immer';
import { ActionTypes, IEnterpriseState } from './types';

export const INITIAL_STATE: IEnterpriseState = {
  enterprise: {},
};

const enterprise: Reducer<IEnterpriseState> = (
  state = INITIAL_STATE,
  action
) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.getEnterpriseSuccess: {
        const { enterprises } = action.payload.data;

        return {
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
