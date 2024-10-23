import { Empty, Tag, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import { useHTranslation } from '../../../../../../../lib/i18n';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { COMMISSION_METHOD_INFO_MAPPING, COMMISSION_SETTING_STATUS_INFO_MAPPING, METHODS } from '../constant';
import { FormatterUtils } from '../../../../../../../lib/formatter';

import './commission-history-timeline.component.scss';

const CommissionReceiveHistoryTimelineViewer = ({ histories = [] }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <Timeline mode={'alternate'} className={'commission-history'}>
      {histories.map((history: any, index: number) => (
        <Timeline.Item key={index} label={ConverterUtils.dateFormatter(history.updatedAt, 'DD/MM/YYYY, HH:mm:ss')} dot={<ClockCircleOutlined/>}>
          <ul className={'commission-history-timeline'}>
            <li className={'commission-history-timeline__item'}>
              {t('Phương thức')}: <strong>{COMMISSION_METHOD_INFO_MAPPING[history.formula.method].label}</strong>
            </li>
            <li className={'commission-history-timeline__item'}>
              {t('Trạng thái')}: <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[history.status].color}>{COMMISSION_SETTING_STATUS_INFO_MAPPING[history.status].label}</Tag>
            </li>
            <li className={'commission-history-timeline__item'}>
              {t('Áp dụng luỹ kế')}: <strong>{history?.formula?.hasAccumulated === 'no' ? t('Không') : t('Có')}</strong>
            </li>

            {history.formula.method === METHODS.PERCENT && (
              <li className={'commission-history-timeline__item'}>
                {t('Hoa hồng tối đa')}: <strong>{FormatterUtils.formatAmount(history?.formula?.maxCommission || 0, 'VND')}</strong>
              </li>
            )}

            {history.formula.method === METHODS.PERCENT && (
              <li className={'commission-history-timeline__item'}>
                {t('Phần trăm tính')}: <strong>{`${history?.formula?.percentCommission || 0}%`}</strong>
              </li>
            )}

            {history.formula.method === METHODS.FIXED && (
              <li className={'commission-history-timeline__item'}>
                {t('Hoa hồng nhận được')}: <strong>{FormatterUtils.formatAmount(history?.formula?.fixCommission || 0, 'VND')}</strong>
              </li>
            )}

            <li className={'commission-history-timeline__item'}>
              {t('Tạo bởi')}: <strong>{ConverterUtils.getFullNameUser(history?.createdBy)}</strong>
            </li>
            <li className={'commission-history-timeline__item'}>
              {t('Cập nhật bởi')}: <strong>{ConverterUtils.getFullNameUser(history?.updatedBy)}</strong>
            </li>
          </ul>
        </Timeline.Item>))}
    </Timeline>
  );
};

const CommissionSpendHistoryTimelineViewer = ({ histories = [] }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <Timeline mode={'alternate'} className={'commission-history'}>
      {histories.map((history: any, index: number) => {
        const greaterThanRateInfo = history?.formula?.greaterThanRateInfo;
        const lessThanRateInfo = history?.formula?.lessThanRateInfo;
        const greaterThanRateInfoReceivers = greaterThanRateInfo?.receivers?.filter(item => !!item) || [];
        const lessThanRateInfoReceivers = lessThanRateInfo?.receivers?.filter(item => !!item) || [];

        return (
          <Timeline.Item key={index} label={ConverterUtils.dateFormatter(history.updatedAt, 'DD/MM/YYYY, HH:mm:ss')} dot={<ClockCircleOutlined/>}>
            <ul className={'commission-history-timeline'}>
              <li className={'commission-history-timeline__item'}>
                {t('Định mức')}: <strong>{`${history?.formula?.commissionRate || 0}%`}</strong>
              </li>

              <li className={'commission-history-timeline__item'}>
                {t('Trạng thái')}: <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[history.status].color}>{COMMISSION_SETTING_STATUS_INFO_MAPPING[history.status].label}</Tag>
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
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};

export const CommissionHistoryTimelineViewer = ({ type = 'receive' }) => {
  const { t } = useHTranslation('admin-common');
  const commissionSetting = useDocumentDetail();

  if (!commissionSetting || !commissionSetting.historyChanges) {
    return <Empty />;
  }

  const histories: any = [...commissionSetting?.historyChanges];
  histories.push(commissionSetting);

  return (
    type === 'receive' ? <CommissionReceiveHistoryTimelineViewer histories={histories}/> : <CommissionSpendHistoryTimelineViewer histories={histories} />
  );
};
