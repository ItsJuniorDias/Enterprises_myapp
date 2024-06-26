import React from 'react';
import show, { INITIAL_STATE } from './reducer';
import { ActionTypes, IShow, ShowAction } from './types';

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

  const render = (props: ShowAction) => show(INITIAL_STATE, props);

  it('should call reducer show case successShow', () => {
    const result = render({
      type: ActionTypes.successShow,
      payload: {
        data,
      },
    });

    expect(result).toMatchObject(data);
  });

  it('should call reducer show case requestHeaders', () => {
    const action = {
      type: 'REQUEST_HEADERS',
      payload: {
        headers,
      },
    };

    const result = render({
      type: ActionTypes.requestHeaders,
      payload: {
        headers,
      },
    });

    expect(result).toMatchObject(headers);
  });

  it('should call reducer show case resetState', () => {
    const result = render({
      type: ActionTypes.resetState,
      payload: {
        enterprise: data,
      },
    });

    expect(result.show).toMatchObject(data);
  });

  it('should call reducer show case failureShow', () => {
    const result = render({
      type: ActionTypes.failureShow,
      payload: {},
    });

    expect(result).toMatchObject({
      show: {},
      headers: {},
    });
  });
});
