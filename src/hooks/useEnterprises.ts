import { useEffect, useReducer } from 'react';
import firestore from '@react-native-firebase/firestore';

export enum EnterpriseActionEnum {
  FETCH = 'FETCH',
  LOADING = 'LOADING',
  FILTERED = 'FILTERED',
  DEFAULT = 'DEFAULT',
}

export type EnterpriseAction = {
  type: 'FETCH' | 'LOADING' | 'FILTERED' | 'DEFAULT';
  payload?: {};
};

export type ItemEnterprise = {
  id: string;
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  url_link: string;
  title_enterprise: string;
};

export type EnterpriseProps = {
  _data: {
    id: string;
    type: string;
    title: string;
    description: string;
    thumbnail: string;
    url_link: string;
    title_enterprise: string;
  };
};

export type EnterpriseState = {
  _data: EnterpriseProps[];
  dataFiltered: EnterpriseProps[];
  isFiltered: boolean;
  loading?: boolean;
};

const reducer = (
  state: EnterpriseState,
  action: EnterpriseAction
): EnterpriseState => {
  const { type, payload } = action;

  switch (type) {
    case EnterpriseActionEnum.FETCH:
      return {
        ...state,
        ...payload,
      };
    case EnterpriseActionEnum.LOADING:
      return {
        ...state,
        ...payload,
      };
    case EnterpriseActionEnum.FILTERED:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export const useEnterprises = () => {
  const [state, dispatch] = useReducer(reducer, {
    _data: [],
    dataFiltered: [],
    isFiltered: false,
    loading: true,
  });

  const fetch = async () => {
    try {
      const { docs } = await firestore().collection('enterprises').get();

      dispatch({
        type: 'FETCH',
        payload: {
          _data: docs,
        },
      });

      dispatch({
        type: 'LOADING',
        payload: {
          loading: false,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    state,
    dispatch,
  };
};
