import React from 'react';
import enterprise, { INITIAL_STATE } from './reducer';

describe('Behavior reducer auth', () => {
  const data = {
    enterprises: {
      id: 0,
      email_enterprise: null,
      facebook: null,
      twitter: null,
      linkedin: null,
      phone: null,
      own_enterprise: false,
      enterprise_name: '',
      photo: '',
      description: '',
      city: '',
      country: '',
      value: 0,
      share_price: 0,
      enterprise_type: undefined,
    },
  };

  const action = {
    type: 'GET_ENTERPRISE_SUCCESS',
    payload: {
      data,
    },
  };

  const render = (props = action) => enterprise(INITIAL_STATE, props);

  it('should call reducer enterprise case getEnterpriseSuccess', () => {
    const result = render();

    expect(result).toMatchObject(data.enterprises);
  });

  it('should call reducer enterprise case getEnterpriseFailure', () => {
    const action = {
      type: 'GET_ENTERPRISE_FAILURE',
      payload: {},
    };

    const result = render(action);

    expect(result.enterprise).toMatchObject({});
  });
});
