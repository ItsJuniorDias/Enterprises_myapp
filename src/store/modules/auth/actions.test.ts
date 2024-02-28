import React from 'react';
import {
  loginToAuthFailure,
  loginToAuthRequest,
  loginToAuthSuccess,
  logoutUser,
} from './actions';

describe('Behavior actions', () => {
  const data = {
    email: 'juniordias@live.com',
    password: '124456',
  };
  it('should call actions loginToAuthRequest', () => {
    const result = loginToAuthRequest(data);

    expect(result).toMatchObject({
      type: 'LOGIN_AUTH_REQUEST',
    });
  });

  it('should call actions loginToAuthSuccess', () => {
    const result = loginToAuthSuccess(data);

    expect(result).toMatchObject({
      type: 'LOGIN_AUTH_SUCCESS',
    });
  });

  it('should call actions loginToAuthFailure', () => {
    const result = loginToAuthFailure();

    expect(result).toMatchObject({ type: 'LOGIN_AUTH_FAILURE' });
  });

  it('should call actions logoutUser', () => {
    const result = logoutUser();

    expect(result).toMatchObject({ type: 'LOGOUT_USER' });
  });
});
