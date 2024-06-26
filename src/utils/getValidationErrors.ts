import { ValidationError } from 'yup';

export interface Errors {
  [key: string]: string;
}

export const getValidationErrors = (err: ValidationError): Errors => {
  const validationErrors: Errors = {};

  err.inner.forEach((error: ValidationError) => {
    validationErrors[error?.path || ''] = error.message;
  });

  return validationErrors;
};
