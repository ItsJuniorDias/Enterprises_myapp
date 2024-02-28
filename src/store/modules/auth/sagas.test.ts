import React from 'react';
import { loginAuthUser } from './sagas';
import { ActionTypes } from './types';

describe('Behavior saga auth', () => {
  beforeEach(() => {
    const result = loginAuthUser(payload);

    result.next();
    result.next();
    result.next();
  });

  const data = {
    email: 'juniordias@live.com',
    password: '1234534',
  };

  const payload = {
    type: ActionTypes.loginAuthRequest,
    payload: {
      data,
    },
  };
  it('should return action loginToAuthFailure', () => {
    const result = loginAuthUser(payload);
    result.next().value;

    expect(result.next().value.payload.action).toMatchObject({
      type: 'LOGIN_AUTH_FAILURE',
      payload: {},
    });
  });

  it('should return action loginToAuthSuccess', () => {
    const result = loginAuthUser(payload);
    result.next().value;

    expect(result.next().value.payload.action).toMatchObject({
      type: 'LOGIN_AUTH_FAILURE',
      payload: {},
    });
  });
});
