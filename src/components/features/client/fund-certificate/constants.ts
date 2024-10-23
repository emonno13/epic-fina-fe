import { RelationUtils } from '@schema-form/utils/form-utils';

export const filterFundList = {
  include: [
    RelationUtils.entity('org', [
      'id',
      'name',
      'description',
      'image',
      'avatar',
      'backgroundColor',
    ]),
    'productDetails',
    {
      relation: 'productDetails',
      scope: {
        include: [{ relation: 'fees' }],
        fields: {
          id: true,
          name: true,
          productId: true,
          orgId: true,
          buyMinValue: true,
          code: true,
          productSchemeIsAutoBuy: true,
          info: true,
        },
      },
    },
  ],
  fields: [
    'id',
    'name',
    'code',
    'info',
    'org',
    'orgId',
    'productDetails',
    'slug',
  ],
};

export const sellFundProductStep = {
  CREATE: 'create',
  CONFIRM_INFORMATION: 'confirmInformation',
  OTP: 'otp',
  FINISH: 'finish',
  SELECT_PRODUCT: 'selectProduct',
};

export const MioCode = {
  CANNOT_FOUND_DATA: 40401,
  OTP_IS_VALID: 40026,
  ACCOUNT_HAS_NOT_BEEN_ACTIVATED: 40022,
  ACCOUNT_IS_PENDING_KYC: 40113,
  CURRENT_EMAIL_IS_NOT_MATCH: 40209,
  INVALID_USER_TYPE: 40014,
  FUND_IS_NOT_EXIST_IN_SYSTEM: 40024,
  TRANSACTION_CANNOT_FOUND: 40036,
  CANNOT_FILE_TOKEN_OF_OTP: 40040,
  OTP_IS_EXPIRED: 40202,
  SESSION_IS_EXPIRED: 40041,
  INVALID_PHONE_NUMBER: 40042,
  RIGHT_NOW_SYSTEM_COULD_NOT_SEND_OTP: 40086,
  THE_ONE_TIME_AUTHENTICATION_CODE_OTP_THAT_HAS_NOT_BEEN_SENT_TO_YOU: 40044,
  EMAIL_FORMAT_IS_INVALID: 40052,
  THE_EMAIL_IS_EXIT: 40025,
  THE_PHONE_NUMBER_IS_EXIST: 40026,
  INVESTMENT_ACCOUNT_IS_NOT_EXISTED_OR_PENDING_KYC: 40065,
  CLIENT_ID_IS_NOT_EXIST: 40071,
  INCORRECT_HASH: 40075,
  VINA_CAPITAL_STILL_NOT_RECEIVE_YOUR_HARD_COPY_DOCUMENT: 40058,
  REGISTERED_ACCOUNT_SUCCESSFULLY: 20102,
  OK: 20001,
  OTP_TIMEOUT: -9,
  THE_IDNO_IS_EXIT: 40035,
};
