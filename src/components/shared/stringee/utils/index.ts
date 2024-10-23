export const getCorrectPhoneNumber = (phoneNumber) => {
  if (typeof phoneNumber == 'number') {
    phoneNumber = phoneNumber.toString();
  }
  if (phoneNumber?.indexOf('84') === 0) {
    return phoneNumber;
  }
  if (phoneNumber?.indexOf('0') === 0) {
    return `84${phoneNumber.substring(1)}`;
  }
  return `84${phoneNumber}`;

};