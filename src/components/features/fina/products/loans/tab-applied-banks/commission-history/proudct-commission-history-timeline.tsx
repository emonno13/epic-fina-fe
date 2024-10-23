import { Empty, Tag, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import { useHTranslation } from '../../../../../../../lib/i18n';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { FormatterUtils } from '../../../../../../../lib/formatter';
import {
  COMMISSION_METHOD_INFO_MAPPING,
  COMMISSION_SETTING_STATUS_INFO_MAPPING,
  METHODS,
} from '../../../../commission/settings/loan-product/constant';

import './product-commission-history-timeline.component.scss';

export const ProductCommissionHistoryTimelineViewer = () => {
  const { t } = useHTranslation('admin-common');
  const productDetail = useDocumentDetail();
  const productDetailCommissionHistories = productDetail?.commissionHistories || [];

  if (productDetailCommissionHistories.length === 0) {
    return <Empty />;
  }

  const histories: any = [...productDetailCommissionHistories];

  return (
    <Timeline mode={'alternate'} className={'commission-history'}>
      {histories.map((history: any, index: number) => {
        const commissionSettingReceive = history?.commissionSettingReceive;
        const commissionSettingSpend = history?.commissionSettingSpend;
        const greaterThanRateInfo = commissionSettingSpend?.formula?.greaterThanRateInfo;
        const lessThanRateInfo = commissionSettingSpend?.formula?.lessThanRateInfo;
        const greaterThanRateInfoReceivers = greaterThanRateInfo?.receivers?.filter(item => !!item) || [];
        const lessThanRateInfoReceivers = lessThanRateInfo?.receivers?.filter(item => !!item) || [];

        return (
          <Timeline.Item key={index} label={ConverterUtils.dateFormatter(history.updatedAt, 'DD/MM/YYYY, HH:mm:ss')} dot={<ClockCircleOutlined/>}>
            <ul className={'commission-history-timeline'}>
              <li className={'commission-history-timeline__item'}>
                <strong>HOA HỒNG FINA NHẬN</strong>

                <ul>
                  <li className={'commission-history-timeline__item'}>
                    {t('Phương thức')}: <strong>{COMMISSION_METHOD_INFO_MAPPING[commissionSettingReceive?.formula?.method]?.label || ''}</strong>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    {t('Trạng thái')}: <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[commissionSettingReceive?.status]?.color}>{COMMISSION_SETTING_STATUS_INFO_MAPPING[commissionSettingReceive?.status]?.label}</Tag>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    {t('Áp dụng luỹ kế')}: <strong>{commissionSettingReceive?.formula?.hasAccumulated === 'no' ? t('Không') : t('Có')}</strong>
                  </li>
                  {commissionSettingReceive?.formula?.method === METHODS.PERCENT && (
                    <li className={'commission-history-timeline__item'}>
                      {t('Hoa hồng tối đa')}: <strong>{FormatterUtils.formatAmount(commissionSettingReceive?.formula?.maxCommission || 0, 'VND')}</strong>
                    </li>
                  )}
                  {commissionSettingReceive?.formula?.method === METHODS.PERCENT && (
                    <li className={'commission-history-timeline__item'}>
                      {t('Phần trăm tính')}: <strong>{`${commissionSettingReceive?.formula?.percentCommission || 0}%`}</strong>
                    </li>
                  )}
                  {commissionSettingReceive?.formula?.method === METHODS.FIXED && (
                    <li className={'commission-history-timeline__item'}>
                      {t('Hoa hồng nhận được')}: <strong>{FormatterUtils.formatAmount(commissionSettingReceive?.formula?.fixCommission || 0, 'VND')}</strong>
                    </li>
                  )}
                  <li className={'commission-history-timeline__item'}>
                    {t('Tạo bởi')}: <strong>{ConverterUtils.getFullNameUser(history?.createdBy)}</strong>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    {t('Cập nhật bởi')}: <strong>{ConverterUtils.getFullNameUser(history?.updatedBy)}</strong>
                  </li>
                </ul>
              </li>

              <li className={'commission-history-timeline__item'}>
                <strong>HOA HỒNG FINA TRẢ</strong>
                <ul>
                  <li className={'commission-history-timeline__item'}>
                    {t('Định mức')}: <strong>{`${commissionSettingSpend?.formula?.commissionRate || 0}%`}</strong>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    {t('Trạng thái')}: <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[commissionSettingSpend?.status]?.color}>{COMMISSION_SETTING_STATUS_INFO_MAPPING[commissionSettingSpend?.status]?.label}</Tag>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    <strong>{t('PHÂN BỔ HẠN MỨC (>= ĐỊNH MỨC)')}</strong>

                    <ul>
                      <li>{t('Mức chi tối đa:')} <strong>{`${greaterThanRateInfo?.spendMax || 0}%`}</strong></li>
                      <li>{t('Nguồn:')} <strong>{`${greaterThanRateInfo?.source || 0}%`}</strong></li>
                      <li>{t('Nhân viên xử lý:')} <strong>{`${greaterThanRateInfo?.handlingStaff || 0}%`}</strong></li>
                      {greaterThanRateInfoReceivers.length > 0 && greaterThanRateInfoReceivers.map((item: any, index: number) => (
                        <li key={index}>{`${item?.positionModel?.name}`}: <strong>{`${item?.commissionPercent || 0}%`}</strong></li>
                      ))}
                    </ul>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    <strong>{t('PHÂN BỔ HẠN MỨC (< ĐỊNH MỨC)')}</strong>

                    <ul>
                      <li>{t('Mức chi tối đa:')} <strong>{`${lessThanRateInfo?.spendMax || 0}%`}</strong></li>
                      <li>{t('Nguồn:')} <strong>{`${lessThanRateInfo?.source || 0}%`}</strong></li>
                      <li>{t('Nhân viên xử lý:')} <strong>{`${lessThanRateInfo?.handlingStaff || 0}%`}</strong></li>
                      {lessThanRateInfoReceivers.length > 0 && lessThanRateInfoReceivers.map((item: any, index: number) => (
                        <li key={index}>{`${item?.positionModel?.name}`}: <strong>{`${item?.commissionPercent || 0}%`}</strong></li>
                      ))}
                    </ul>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    {t('Tạo bởi')}: <strong>{ConverterUtils.getFullNameUser(history?.createdBy)}</strong>
                  </li>
                  <li className={'commission-history-timeline__item'}>
                    {t('Cập nhật bởi')}: <strong>{ConverterUtils.getFullNameUser(history?.updatedBy)}</strong>
                  </li>
                </ul>
              </li>
            </ul>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
