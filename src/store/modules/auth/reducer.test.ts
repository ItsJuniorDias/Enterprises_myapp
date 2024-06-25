import React from 'react';
import auth, { INITIAL_STATE } from './reducer';
import { ActionTypes, AuthStoreAction } from './types';

describe('Behavior reducer auth', () => {
  const data = {
    email: 'juniordias@live.com',
    password: '124456',
    access_token: '',
    client: '',
    uid: '',
  };

  const render = (props: AuthStoreAction) => auth(INITIAL_STATE, props);

  it('should call reducer auth case loginAuthSuccess', () => {
    const result = render({
      type: ActionTypes.loginAuthSuccess,
      payload: {
        data,
      },
    });

    expect(result.auth[0]).toMatchObject({
      email: 'juniordias@live.com',
      password: '124456',
      access_token: '',
      client: '',
      uid: '',
    });
  });

  it('should call reducer auth case loginAuthFailure', () => {
    const result = render({
      type: ActionTypes.loginAuthFailure,
      payload: {},
    });

    expect(result.auth).toEqual([]);
  });

  it('should ca llreducer auth case logoutUser', () => {
    const result = render({
      type: ActionTypes.logoutUser,
      payload: {},
    });

    expect(result.auth).toEqual([]);
  });
});
