import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { Drawer } from 'antd';
import React from 'react';
import { fundActions } from './constants';
import { TransactionBuyDetail } from './transaction-buy-detail';
import { TransactionSellDetail } from './transaction-sell-detail';

export interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

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
      <a onClick={() => setVisible(true)}>{t('Detail', { vn: 'Chi tiết' })}</a>
      <Drawer
        width={isMobile ? '100%' : 550}
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {type === fundActions.BUY && <TransactionBuyDetail record={record} />}
        {type === fundActions.SELL && <TransactionSellDetail record={record} />}
      </Drawer>
    </div>
  );
};
