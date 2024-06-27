import { ValidationError } from 'yup';
import { getValidationErrors } from './getValidationErrors';

describe('getValidationErrors function', () => {
  it('should format validation errors correctly', () => {
    const yupError = new ValidationError('Validation failed', {
      errors: [
        { path: 'email', message: 'E-mail is required' },
        { path: 'password', message: 'Password must be at least 6 characters' },
      ],
    });

    const result = getValidationErrors(yupError);

    expect(result).toEqual({ 'Validation failed': 'Validation failed' });
  });
});
