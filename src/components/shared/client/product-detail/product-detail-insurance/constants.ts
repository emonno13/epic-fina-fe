export const MAX_AGE = 65;

export const checkAge = (date) => {
  const birthday = new Date(date);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const renderPrice = (customer, isCollaborator) => {
  const price = isCollaborator ? customer?.meta?.price : customer?.meta?.priceRoot;
  return checkAge(customer?.dateOfBirth) > MAX_AGE ? price * 1.5 : price || 0;
};

export const IS_INSURED = 'IS_INSURED';