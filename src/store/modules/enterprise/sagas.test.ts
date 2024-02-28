import React from 'react';
import { getEnterprises } from './sagas';
import { ActionTypes } from './types';

describe('Behavior saga enterprise', () => {
  const headers = {
    uid: 'b0d4dcfc-4596-4516-aa85-3f6230b63836',
    client: 'Accept-CH',
    'access-token': 'access-token',
  };

  const payload = {
    type: ActionTypes.getEnterpriseRequest,
    payload: {
      headers,
    },
  };

  beforeEach(() => {
    const result = getEnterprises(payload);
    result.next();
    result.next();
    result.next();
  });

  it('should return action getEnterprises', () => {
    const result = getEnterprises(payload);

    result.next().value;

    expect(result.next().value.payload.action).toMatchObject({
      type: 'GET_ENTERPRISE_FAILURE',
      payload: {},
    });
  });
});
