import { Empty, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import { useHTranslation } from '../../../../../../../lib/i18n';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { ConverterUtils } from '../../../../../../../lib/converter';

import './history-timeline.component.scss';

const HistoryTimeline = ({ histories = [] }) => {
  const { t } = useHTranslation('admin-common');

  return (
    <Timeline mode={'alternate'} className={'history-timeline'}>
      {histories.map((history: any, index: number) => (
        <Timeline.Item key={index} label={ConverterUtils.dateFormatter(history.updatedAt, 'DD/MM/YYYY, HH:mm:ss')} dot={<ClockCircleOutlined/>}>
          <ul className={'history-timeline__content'}>
            <li className={'history-timeline__content-item'}>
              {t('Thời gian ưu đãi')}: <strong>{`${history?.info?.preferentialTime || 0} tháng`}</strong>
            </li>
            <li className={'history-timeline__content-item'}>
              {t('Lãi suất ưu đãi')}: <strong>{`${history?.info?.preferentialRate || 0}%`}</strong>
            </li>
            <li className={'history-timeline__content-item'}>
              {t('Lãi suất sau ưu đãi')}: <strong>{`${history?.info?.afterPreferentialRate || 0}%`}</strong>
            </li>
            <li className={'history-timeline__content-item'}>
              {t('Lãi suất tham chiếu')}: <strong>{`${history?.info?.preferentialReference || 0}%`}</strong>
            </li>
            <li className={'history-timeline__content-item'}>
              {t('Biên độ')}: <strong>{`${history?.info?.amplitude || 0}%`}</strong>
            </li>
            <li className={'history-timeline__content-item'}>
              {t('Tạo bởi')}: <strong>{ConverterUtils.getFullNameUser(history.createdBy)}</strong>
            </li>
            <li className={'history-timeline__content-item'}>
              {t('Cập nhật bởi')}: <strong>{ConverterUtils.getFullNameUser(history?.updatedBy)}</strong>
            </li>
          </ul>
        </Timeline.Item>))}
    </Timeline>
  );
};

export const HistoryTimelineViewer = ({ documentDetailHistoryProperty = 'histories' }) => {
  const documentDetail = useDocumentDetail();

  if (!documentDetail || !documentDetail[documentDetailHistoryProperty]) {
    return <Empty />;
  }

  const histories: any = [...documentDetail[documentDetailHistoryProperty]];

  return <HistoryTimeline histories={histories}/>;
};
