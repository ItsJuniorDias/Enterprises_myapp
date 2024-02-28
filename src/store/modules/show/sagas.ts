/* eslint-disable require-yield */
import { AxiosResponse } from 'axios';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../services/api';
import { IShow, ActionTypes } from './types';
import { requestShow, successShow, failureShow } from './actions';

type GetShowRequest = ReturnType<typeof requestShow>;

export function* getShow({ payload }: GetShowRequest) {
  const { id, headers } = payload;

  try {
    const response: AxiosResponse<IShow | any> = yield call(
      api.get,
      `/enterprises/${id}`,
      {
        headers,
      }
    );

    yield put(successShow(response.data));
  } catch (e) {
    yield put(failureShow());
  }
}

all([takeLatest(ActionTypes.requestShow, getShow)]);
