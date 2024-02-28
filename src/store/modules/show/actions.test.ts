import React from 'react';
import {
  failureShow,
  requestHeadersShow,
  requestShow,
  resetState,
  successShow,
} from './actions';
import { IHeaders, IShow } from './types';

describe('Behavior actions', () => {
  const data: IShow = {
    id: 0,
    email_enterprise: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    phone: null,
    own_enterprise: null,
    enterprise_name: '',
    photo: '',
    description: '',
    city: '',
    country: '',
    value: 0,
    share_price: 0,
    enterprise_type: undefined,
  };

  const dataHeader: IHeaders = {
    uid: 'b0d4dcfc-4596-4516-aa85-3f6230b63836',
    client: 'Accept-CH',
    'access-token': 'access-token',
  };

  it('should call actions requestHeadersShow', () => {
    const result = requestHeadersShow(dataHeader);

    expect(result).toMatchObject({
      type: 'REQUEST_HEADERS',
    });
  });

  it('should call actions resetState', () => {
    const result = resetState();

    expect(result).toMatchObject({});
  });

  it('should call actions failureShow', () => {
    const result = failureShow();

    expect(result).toMatchObject({});
  });

  it('should call actions successShow', () => {
    const result = successShow(data);

    expect(result).toMatchObject({
      type: 'SUCCESS_SHOW',
    });
  });

  it('should call actions requestShow', () => {
    const result = requestShow(
      dataHeader,
      '1e32e5fd-c2b4-4163-a49c-4b903793973d'
    );

    expect(result).toMatchObject({
      type: 'REQUEST_SHOW',
    });
  });
});
