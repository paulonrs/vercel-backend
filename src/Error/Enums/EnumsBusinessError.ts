enum enumBusinessError {
  requiredField = 'requiredField',
  invalidField = 'invalidField',
  unexpected = 'unexpected',
  emailNotFound = 'emailNotFound',
  invalidCredentials = 'invalidCredentials',
  emailInUse = 'emailInUse',
  emailNotEqual = 'emailNotEqual',
  passwordNotEqual = 'passwordNotEqual',
  unauthorized = 'unauthorized',
}

namespace enumBusinessError {
  export function toString(value: enumBusinessError): string {
    return value;
  }
}

export default enumBusinessError;
