import React from 'react';
import { getShow } from './sagas';
import { ActionTypes } from './types';

describe('Behavior saga getShow', () => {
  const headers = {
    uid: 'b0d4dcfc-4596-4516-aa85-3f6230b63836',
    client: 'Accept-CH',
    'access-token': 'access-token',
  };

  const payload = {
    type: ActionTypes.requestShow,
    payload: {
      id: 'b0d4dcfc-4596-4516-aa85-3f6230b63836',
      headers,
    },
  };

  beforeEach(() => {
    const result = getShow(payload);

    result.next();
    result.next();
    result.next();
  });

  it('should return action getShow', () => {
    const result = getShow(payload);

    result.next().value;

    expect(result.next().value).toMatchObject({
      '@@redux-saga/IO': true,
      combinator: false,
      type: 'PUT',
      payload: {
        channel: undefined,
        action: { type: 'FAILURE_SHOW', payload: {} },
      },
    });
  });
});
