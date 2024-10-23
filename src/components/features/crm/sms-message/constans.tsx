export const TYPE_SMS_MESSAGE = {
  SMS: 'sms',
  EMAIL: 'email',
};

export const TYPE_SMS_MESSAGE_MAPPING = {
  [TYPE_SMS_MESSAGE.SMS]: { label: 'SMS', value: TYPE_SMS_MESSAGE.SMS, color: 'green' },
  [TYPE_SMS_MESSAGE.EMAIL]: { label: 'Email', value: TYPE_SMS_MESSAGE.EMAIL, color: 'yellow' },
};
