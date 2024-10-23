export const MOBILE_MANAGEMENT_LIST = (t) => [
  {
    iconPath: '/assets/images/icons/ic_m-management-loan.svg',
    title: t('Loan management title', {
      en: 'Loan management title',
      vn: 'Hồ sơ vay ngân hàng',
    }),
    description: t('Loan management description', {
      en: 'Loan management description',
      vn: 'Hồ sơ vay ngân hàng của bạn',
    }),
    redirectPath: '/admin/m-deal-loan-management',
  },
  {
    iconPath: '/assets/images/icons/ic_m-management-insurance.svg',
    title: t('Insurance management title', {
      en: 'Insurance management title',
      vn: 'Bảo hiểm của bạn',
    }),
    description: t('Insurance management description', {
      en: 'Insurance management description',
      vn: 'Bảo hiểm của bạn',
    }),
    redirectPath: '/admin/m-insurance-management',
  },
];
