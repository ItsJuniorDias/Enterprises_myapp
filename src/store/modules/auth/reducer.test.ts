import React from 'react';
import auth, { INITIAL_STATE } from './reducer';

describe('Behavior reducer auth', () => {
  const data = {
    email: 'juniordias@live.com',
    password: '124456',
  };

  const action = {
    type: 'LOGIN_AUTH_SUCCESS',
    payload: {
      data,
    },
  };

  const render = (props = action) => auth(INITIAL_STATE, props);

  it('should call reducer auth case loginAuthSuccess', () => {
    const result = render();

    expect(result.auth[0]).toMatchObject({
      data,
    });
  });

  it('should call reducer auth case loginAuthFailure', () => {
    const result = render({
      type: 'LOGIN_AUTH_FAILURE',
      payload: {},
    });

    expect(result.auth).toEqual([]);
  });

  it('should ca llreducer auth case logoutUser', () => {
    const result = render({
      type: 'LOGOUT_USER',
      payload: {},
    });

    expect(result.auth).toEqual([]);
  });
});
