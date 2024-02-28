/* eslint-disable require-yield */
import { AxiosResponse } from 'axios';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { ActionTypes, IEnterprise } from './types';

import {
  getEnterpriseRequest,
  getEnterpriseSuccess,
  getEnterpriseFailure,
} from './actions';

type GetEnterpriseRequest = ReturnType<typeof getEnterpriseRequest>;

export function* getEnterprises({ payload }: GetEnterpriseRequest) {
  const { headers } = payload;

  try {
    const response: AxiosResponse<IEnterprise | any> = yield call(
      api.get,
      '/enterprises',
      {
        headers,
      }
    );

    yield put(getEnterpriseSuccess(response.data));
  } catch (e) {
    yield put(getEnterpriseFailure());
  }
}

all([takeLatest(ActionTypes.getEnterpriseRequest, getEnterprises)]);
