import { all } from 'redux-saga/effects';

import { loginAuthUser } from './auth/sagas';
import { getEnterprises } from './enterprise/sagas';
import { getShow } from './show/sagas';

export default function* rootSaga() {
  return yield all([loginAuthUser, getEnterprises, getShow]);
}
