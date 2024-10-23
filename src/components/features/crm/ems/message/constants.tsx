export enum MESSAGE_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const MESSAGE_STATUS_OPTIONS = [{
  label: 'Active',
  value: MESSAGE_STATUS.ACTIVE,
}, {
  label: 'Inactive',
  value: MESSAGE_STATUS.INACTIVE,
}];

export const MESSAGE_STATUS_DATA_MAPPING = {
  [MESSAGE_STATUS.ACTIVE]: {
    label: 'Active',
    color: 'green',
  },
  [MESSAGE_STATUS.INACTIVE]: {
    label: 'Inactive',
    color: 'magenta',
  },
};

export enum EXTERNAL_EMAIL_TEMPLATE_TYPE {
  MAILCHIMP_TRANSACTION = 'mailchimp-transaction',
  MAILCHIMP_MARKETING = 'mailchimp-marketing',
}

export const EXTERNAL_EMAIL_TEMPLATE_TYPE_DATA_MAPPING = {
  [EXTERNAL_EMAIL_TEMPLATE_TYPE.MAILCHIMP_TRANSACTION]: {
    label: 'Mailchimp Transaction',
    color: 'green',
  },
  [EXTERNAL_EMAIL_TEMPLATE_TYPE.MAILCHIMP_MARKETING]: {
    label: 'Mailchimp Marketing',
    color: 'magenta',
  },
};

export enum MESSAGE_SENDER {
  FINA_INFO = 'info@fina.com.vn',
  FINA_NO_REPLY = 'no-reply@fina.com.vn'
}

export const MESSAGE_SENDER_OPTIONS = [
  {
    label: 'INFO <info@fina.com.vn>',
    value: MESSAGE_SENDER.FINA_INFO,
  },
  {
    label: 'NO-REPLY <no-reply@fina.com.vn>',
    value: MESSAGE_SENDER.FINA_NO_REPLY,
  },
];

export enum MESSAGE_TYPE {
  EXTERNAL_SERVICE_EMAIL = 'external_service_email',
  INTERNAL_SERVICE_EMAIL = 'internal_service_email',
  SMS = 'sms',
  NOTIFICATION = 'notification',
}

export const MESSAGE_TYPES_OPTIONS = [
  {
    label: 'External service email',
    value: MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL,
  },
  {
    label: 'Internal service email',
    value: MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL,
  },
  {
    label: 'SMS',
    value: MESSAGE_TYPE.SMS,
  },
  {
    label: 'Notification',
    value:MESSAGE_TYPE.NOTIFICATION,
  },
];

export const MESSAGE_TYPES_LABEL_MAPPING = {
  [MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL]: 'External service email',
  [MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL]: 'Internal service email',
  [MESSAGE_TYPE.SMS]: 'SMS',
  [MESSAGE_TYPE.NOTIFICATION]: 'Notification',
};

export const MESSAGE_TYPES_COLOR_MAPPING = {
  [MESSAGE_TYPE.EXTERNAL_SERVICE_EMAIL]: 'green',
  [MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL]: 'cyan',
  [MESSAGE_TYPE.SMS]: 'blue',
  [MESSAGE_TYPE.NOTIFICATION]: 'purple',
};
