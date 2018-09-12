export const validateInteger = (name: string) => (input: any) =>
  Number.isInteger(input) || `${name} must be an integer!`;

export const validateString = (name: string) => (input: any) =>
  typeof input === 'string' || `${name} must be a string!`;

export const validateMinLength = (minLength: number, name: string) => (
  input = '',
) =>
  input.length >= minLength ||
  `${name} must be at least ${minLength} characters`;
