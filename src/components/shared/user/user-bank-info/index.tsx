import { useHTranslation } from '@lib/i18n';

import './user-bank-info.module.scss';

export const UserBankInfoItem = ({ label, value }) => (
  <li>
    <b>{label}: </b> {value}
  </li>
);

export const UserBankInfo = ({ bank, bankAccount, branchName }) => {
  const { t } = useHTranslation('common');
  const generateBankInfoArr = [
    {
      label: t('Tên ngân hàng'),
      value: bank?.name,
    },
    {
      label: t('Tên chi nhánh'),
      value: branchName,
    },
    {
      label: t('Tài khoản'),
      value: bankAccount,
    },
  ];

  return (
    <div className="user-bank-info">
      <b>{bank?.name}</b>
      <ul>
        {generateBankInfoArr.map((item, index) => (
          <UserBankInfoItem
            key={`user-bank-info-${item?.value}-${item?.label}-${index}`}
            {...item}
          />
        ))}
      </ul>
    </div>
  );
};
