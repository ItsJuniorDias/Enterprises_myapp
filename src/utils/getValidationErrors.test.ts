import React from 'react';
import { getValidationErrors } from './getValidationErrors';

describe('Behavior getValidationErrors', () => {
  it('render getValidationErrors', () => {
    const error = {
      inner: [
        {
          path: 'serviceError',
          message: 'Not found',
        },
      ],
    };

    expect(getValidationErrors(error).serviceError).toBe('Not found');
  });
});
