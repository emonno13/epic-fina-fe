export const PASSWORD_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\./?\\|`~])(?!.*\s).{8,}$/;

export const PASSWORD_REGEX_V2 =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,20}$/;

export const PASSWORD_REGEX_V3 =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\./?\\|`~])(?!.*\s).{8,20}$/;

// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX_V2 = /^[\w-\.]+(\+\w*)?@([\w-]+\.)+[\w-]{2,4}$/;

export const EMAIL_REGEX_V3 =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const EMOJI_REGEX =
  /[\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDFFF]/;
