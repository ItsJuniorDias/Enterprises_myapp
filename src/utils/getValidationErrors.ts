import { ValidationError } from 'yup';

export interface Errors {
  [key: string]: string;
}

export const getValidationErrors = (err: ValidationError): Errors => {
  const validationErrors: Errors = {};

  err.errors.forEach((error) => {
    validationErrors[error] = error;
  });

  return validationErrors;
};
