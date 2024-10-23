import { Empty, Tag, Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import { useHTranslation } from '../../../../../../../lib/i18n';
import { useDocumentDetail } from '../../../../../../../schema-form/features/hooks';
import { ConverterUtils } from '../../../../../../../lib/converter';
import { COMMISSION_SETTING_STATUS_INFO_MAPPING } from '../../loan-product/constant';

import './commission-history-timeline.component.scss';

const InsurancesCommissionHistoryTimeline = ({ histories = [] }) => {
  const { t } = useHTranslation('admin-common');
  const commissionTimelines = histories.map((history: any) => {
    const personal = history?.insurancesSettingSpend?.personal;
    const personalLevelsSpend: any[] = [];
    const personalLevel = personal?.level || 1;

    for (let level = 1; level <= personalLevel; level++) {
      if (level === 1) {
        personalLevelsSpend.push({
          label: t('CTV bán bảo hiểm'),
          value: `${personal['collaborator' + level]}%`,
        });
      } else {
        personalLevelsSpend.push({
          label: `Quản lý cấp ${level}`,
          value: `${personal['collaborator' + level]}%`,
        });
      }
    }

    return {
      time: ConverterUtils.dateFormatter(history.updatedAt, 'DD/MM/YYYY, HH:mm:ss'),
      items: [{
        label: t('Phần trăm FINA nhận'),
        value: `${history?.insurancesSettingReceive?.percentCommission || 0}%`,
      }, {
        label: t('Trạng thái'),
        value: <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[history.status].color}>{COMMISSION_SETTING_STATUS_INFO_MAPPING[history.status].label}</Tag>,
      }, {
        label: t('Chi trả theo Agency'),
        hasChildren: true,
        value: [{
          label: t('Phần trăm chi trả'),
          value: `${history?.insurancesSettingSpend?.agency?.percentCommission || 0}%`,
        }],
      }, {
        label: t('Chi trả theo cá nhân'),
        hasChildren: true,
        value: [{
          label: t('Phần trăm chi trả'),
          value: '',
        }, {
          label: t('Số level CTV nhận tiền'),
          value: `${personal?.level || 1}%`,
        },
        ...personalLevelsSpend,
        ],
      }, {
        label: t('Tạo bởi'),
        value: ConverterUtils.getFullNameUser(history?.createdBy),
      }, {
        label: t('Cập nhật bởi'),
        value: ConverterUtils.getFullNameUser(history?.updatedBy),
      }],
    };
  });

  return (
    <Timeline mode={'alternate'} className={'commission-history'}>
      {commissionTimelines.map((timeline: any, index: number) => (
        <Timeline.Item key={index} label={timeline.time} dot={<ClockCircleOutlined/>}>
          <ul className={'commission-history-timeline'}>
            {timeline.items.map((item: any, indexItem: number) => (
              <li className={'commission-history-timeline__item'} key={indexItem}>
                {item?.hasChildren ? <strong>{item.label}: </strong> : <span>{item?.label}: <strong>{item?.value || ''}</strong></span>}
                {item?.hasChildren && (
                  <ul className={'commission-history-timeline__item-sub'}>
                    {item.value.map((subItem: any, subIndex: number) => <li key={subIndex}>{subItem.label}: <strong>{subItem.value}</strong></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Timeline.Item>))}
    </Timeline>
  );
};

export const InsurancesCommissionHistoryTimelineViewer = () => {
  const { t } = useHTranslation('admin-common');
  const commissionSetting = useDocumentDetail();

  if (!commissionSetting || !commissionSetting.historyChanges) {
    return <Empty />;
  }

  const histories: any = [...commissionSetting?.historyChanges];
  histories.push(commissionSetting);

  return <InsurancesCommissionHistoryTimeline histories={histories}/>;
};
