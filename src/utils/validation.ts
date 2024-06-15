/**
 * Validates first and last names
 * @param {string} name
 * @param {string} fieldName
 * @returns {string} error
 */
export function validateName(name: string, fieldName: string) {
  // Pattern to ensure the string does not contain any numbers or punctuation
  const noNumberOrPunctuationPattern = /^[a-zA-Z\s]*$/;

  if (!noNumberOrPunctuationPattern.test(name)) {
    return `${fieldName} should not contain numbers or punctuation`;
  }

  if (name.length < 1) {
    return `${fieldName} must be 1 character or longer`;
  }
  return '';
}

/**
 * Returns validation errors for Profile model fields
 * @param {string} firstName
 * @param {string} lastName
 * @returns {object}
 */
export function validateProfile(firstName: string, lastName: string) {
  const errors: { firstName?: string; lastName?: string } = {};

  const firstNameError = validateName(firstName, 'First Name');
  if (firstNameError) errors.firstName = firstNameError;
  const lastNameError = validateName(lastName, 'Last Name');
  if (lastNameError) errors.lastName = lastNameError;

  // Validation errors for First and Last Name
  return errors;
}
