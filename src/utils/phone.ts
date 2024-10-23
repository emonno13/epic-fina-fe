import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

export const PNF = PhoneNumberFormat;

export const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export const isPhoneValidByVietNam = (phone: string) => {
  try {
    const regex = /[a-zA-Z]|[^\w\s+]/;
    const number = phoneUtil.parseAndKeepRawInput(phone, 'VN');
    return phoneUtil.isValidNumber(number) && !regex.test(phone);
  } catch (error) {
    return false;
  }
};
