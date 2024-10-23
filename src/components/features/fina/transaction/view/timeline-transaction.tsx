import { Timeline, Tag } from 'antd';
import React from 'react';
import { ConverterUtils } from '../../../../../lib/converter';
import { ItemViewer } from '../../../../shared/common/configuration/item-viewer';
import { useHTranslation } from '../../../../../lib/i18n';
import { FormatterUtils } from '../../../../../lib/formatter';

export const TimeLineTransaction = ({ data }) => {
  const { t } = useHTranslation('admin-common');
  if (!data && data?.length < 0) {
    return <></>;
  }
  return (
    <>
      <Timeline mode="left" className={'m-t-20'}>
        {data && data.map((el, index) => {
          return (
            <Timeline.Item label={ConverterUtils.fullDatetimeConverter(`${el.createdAt}`)} key={index} position="left">
              <ItemViewer {...{
                label: t('Customer'),
                value: el.customerInfo?.fullName,
                labelClassName: 'm-b-0i',
              }}/>
              <ItemViewer {...{
                label: t('Email'),
                value: el.customerInfo?.email,
                labelClassName: 'm-b-0i',
              }}/>
              <ItemViewer {...{
                label: t('Total Amount', {
                  en: 'Total Amount',
                  vn: 'Tổng tiền',
                }),
                value: el.amount ? FormatterUtils.formatAmount(el?.amount || 0, 'vnđ') : '',
                labelClassName: 'm-b-0i',
              }}/>
              <ItemViewer {...{
                label: t('Thời gian thanh toán'),
                value: el?.paymentDate,
                labelClassName: 'm-b-0i',
              }}/>
              <ItemViewer {...{ label: t('Status'), value:<Tag color="cyan">{t(el?.status)}</Tag>, labelClassName: 'm-b-0i' }}/>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </>
  );
};