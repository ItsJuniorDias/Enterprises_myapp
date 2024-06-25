import React from 'react';
import show, { INITIAL_STATE } from './reducer';
import { IShow } from './types';

describe('Behavior reducer show', () => {
  const data: IShow = {
    id: 0,
    enterprise_name: '',
    description: '',
    email_enterprise: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    phone: null,
    own_enterprise: null,
    photo: '',
    value: 0,
    shares: 0,
    share_price: 0,
    own_shares: 0,
    city: '',
    country: '',
    enterprise_type: {
      enterprise_type_name: '',
      id: 0,
    },
  };

  const headers = {
    uid: 'b0d4dcfc-4596-4516-aa85-3f6230b63836',
    client: 'Accept-CH',
    'access-token': 'access-token',
  };

  const action = {
    type: 'SUCCESS_SHOW',
    payload: {
      data,
    },
  };

  const render = (props = action) => show(INITIAL_STATE, props);

  it('should call reducer show case successShow', () => {
    const result = render();

    expect(result).toMatchObject(data);
  });

  it('should call reducer show case requestHeaders', () => {
    const action = {
      type: 'REQUEST_HEADERS',
      payload: {
        headers,
      },
    };

    const result = render(action);

    expect(result).toMatchObject(headers);
  });

  it('should call reducer show case resetState', () => {
    const enterprise = {};

    const action = {
      type: 'RESET_STATE',
      payload: {
        enterprise,
      },
    };

    const result = render(action);

    expect(result).toMatchObject(enterprise);
  });

  it('should call reducer show case failureShow', () => {
    const action = {
      type: 'FAILURE_SHOW',
      payload: {},
    };

    const result = render(action);

    expect(result).toMatchObject({
      show: {},
      headers: {},
    });
  });
});
