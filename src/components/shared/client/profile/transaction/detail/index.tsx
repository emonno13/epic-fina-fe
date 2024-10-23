import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Modal } from 'antd';
import React from 'react';
// import { TransactionBuyDetail } from '@components/features/profiles/transaction-management/components/transaction-buy-detail';
import { TransactionSellDetail } from '@components/features/profiles/transaction-management/components/transaction-sell-detail';
import { CloseIconLargeSvg } from '@icons';
import { TransactionBuyDetail } from './buy';
import { IconEys } from './icon-eye';

export interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

const fundActions = {
  buy: 'BUY',
  sell: 'SELL',
};

export const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    <p className="site-description-item-profile-p-content">{content}</p>
  </div>
);

export const DrawerTransactionDetail = ({ type, record }) => {
  const { t } = useHTranslation('admin');
  const isMobile = useIsMobile();
  const [visible, setVisible] = React.useState<boolean>(false);
  return (
    <div>
      {/* <a onClick={() => setVisible(true)}>{t('Detail', { vn: 'Chi tiết' })}</a> */}
      <div onClick={() => setVisible(true)}>
        <IconEys />
      </div>
      <Modal
        {...{
          visible,
          footer: null,
          width: 997,
          closeIcon: <CloseIconLargeSvg />,
          onCancel: () => setVisible(false),
          className: 'profile-modal-transaction-detail',
        }}
      >
        {type === fundActions.buy && <TransactionBuyDetail record={record} />}
        {type === fundActions.sell && <TransactionSellDetail record={record} />}
      </Modal>
    </div>
  );
};
