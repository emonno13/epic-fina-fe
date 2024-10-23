import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useFeatureId } from '../../../../../schema-form/features/hooks';
import { ACTION_CODES } from '../../progress-template/utils';

export interface StatisticsProgressProps {
  isRecall?: boolean,
}

export const StatisticsProgress = (props: StatisticsProgressProps) => {
  const { t } = useTranslation('admin-common');
  const featureId: string = useFeatureId();
  const dataSource = useSelector((state: RootStateOrAny) => {
    return state?.featureStore[featureId]?.dataSource;
  }) || [];

  const timeRemain = 0;
  const quantityDone = calculateQuantityDone(dataSource?.[0]) | 0;
  const totalProgress = dataSource[0]?.items?.length | 0;
  const percentComplete = calculatePercentComplete(dataSource?.[0]) | 0;

  return (
    <div className={'wrapper-statistics-progress'}>
      <div className={'time-remain'}>
        <div>Còn {timeRemain} ngày để thực hiện</div>
        {props?.isRecall && (
          <div className={'recall-records'}>
            <Button type="primary" danger>{ t('Thu hồi hồ sơ') }</Button>
          </div>
        )}
      </div>
      <div className={'data-statistics-progress'}>
        <div className={'progress-made'}>
          <div className={'progress-wp-number'}>
            <span className={'quantity-done'}>{quantityDone}</span>
            <span className={'total-progress'}>/{totalProgress}</span>
          </div>
          <div>{t('Đã thực hiện')}</div>
        </div>
        <div className={'percent-complete'}>
          <div className={'quantity-percent-complete'}>{percentComplete}%</div>
          <div>{t('Hoàn thành')}</div>
        </div>
      </div>
    </div>
  );
};

export const calculateQuantityDone = (dataSource) => {
  const progressItemDone = dataSource?.items?.filter(el => el?.currentStatusProgress === ACTION_CODES.ACTION_DONE);
  return progressItemDone?.length | 0;
};

export const calculatePercentComplete = (dataSource) => {
  const totalWeightProgress = dataSource?.items?.reduce(function (result, obj) { return result + obj.weight; }, 0);
  const totalCurrentWeightProgress = dataSource?.items?.reduce(function (result, obj) { return result + obj.currentWeight; }, 0);
  return (Math.round((totalCurrentWeightProgress / totalWeightProgress) * 100)) | 0;
};
