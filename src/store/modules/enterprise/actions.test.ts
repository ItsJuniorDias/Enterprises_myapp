import React from 'react';
import {
  getEnterpriseFailure,
  getEnterpriseRequest,
  getEnterpriseSuccess,
} from './actions';
import { IEnterprise } from './types';

describe('Behavior actions', () => {
  const data: IEnterprise = {
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
  };

  const dataHeader = {
    uid: 'b0d4dcfc-4596-4516-aa85-3f6230b63836',
    client: 'Accept-CH',
    'access-token': 'access-token',
  };

  it('should call actions getEnterpriseRequest', () => {
    const result = getEnterpriseRequest(dataHeader);

    expect(result).toMatchObject({
      type: 'GET_ENTERPRISE_REQUEST',
    });
  });

  it('should call actions getEnterpriseSuccess', () => {
    const result = getEnterpriseSuccess(data);

    expect(result).toMatchObject({
      type: 'GET_ENTERPRISE_SUCCESS',
    });
  });

  it('should call actions getEnterpriseFailure', () => {
    const result = getEnterpriseFailure();

    expect(result).toMatchObject({
      type: 'GET_ENTERPRISE_FAILURE',
    });
  });
});
