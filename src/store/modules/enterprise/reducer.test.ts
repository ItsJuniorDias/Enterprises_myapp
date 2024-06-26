import React from 'react';
import enterprise, { INITIAL_STATE } from './reducer';
import { ActionTypes, EnterprisesAction } from './types';

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
      enterprise_type: {
        enterprise_type_name: '',
        id: 0,
      },
    },
  };

  const render = (props: EnterprisesAction) => enterprise(INITIAL_STATE, props);

  it('should call reducer enterprise case getEnterpriseSuccess', () => {
    const result = render({
      type: ActionTypes.getEnterpriseSuccess,
      payload: {
        data,
      },
    });

    expect(result).toMatchObject(data.enterprises);
  });

  it('should call reducer enterprise case getEnterpriseFailure', () => {
    const result = render({
      type: ActionTypes.getEnterpriseFailure,
      payload: {},
    });

    expect(result.enterprise).toMatchObject({});
  });
});
