
export const FormatterUtils = {
  formatAmount: (amount: number, currency?: string) => {
    return `${new Intl.NumberFormat().format(amount)} ${currency || ''} `;
  },
  getCorrectPhoneNumber(phoneNumber: string, counTryCode = '84', convertToCode = '0'): string {
    if (phoneNumber?.indexOf(counTryCode) === 0) {
      return `${convertToCode}${phoneNumber.substring(counTryCode.length)}`;
    }
    return phoneNumber;
  },
};