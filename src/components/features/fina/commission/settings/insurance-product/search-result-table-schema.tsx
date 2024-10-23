import { Tag } from 'antd';

import { useHTranslation } from '../../../../../../lib/i18n';
import { TableUtils } from '../../../../../../lib/table-utils';
import { ConverterUtils } from '../../../../../../lib/converter';
import { COMMISSION_SETTING_STATUS_INFO_MAPPING } from '../loan-product/constant';
import { GroupInformationItem } from '../../management/common-block';

export const InsuranceProductCommissionSettingTableSchema = () => {
  const { t } = useHTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('Product category'),
      dataIndex: 'category',
      sortable: true,
      key: 'category',
      render: (category, commissionSetting) => commissionSetting?.categoryId === 'default' ? t('Default') : category?.name,
    }),

    TableUtils.createTableColumnConfig({
      title: t('Công thức HH FINA nhận'),
      dataIndex: 'insurancesSettingReceive',
      sortable: true,
      key: 'insurancesSettingReceive',
      render: (insurancesSettingReceive) => `${insurancesSettingReceive?.percentCommission || 0}%`,
    }),

    TableUtils.createTableColumnConfig({
      title: t('Công thức HH FINA trả'),
      dataIndex: 'insurancesSettingSpend',
      sortable: true,
      key: 'insurancesSettingSpend',
      render: (insurancesSettingSpend) => {
        const personalLevels: any = [];

        for (let level = 1; level <= (insurancesSettingSpend?.personal?.level || 1); level++) {
          if (level === 1) {
            personalLevels.push({
              label: t('Người bán bảo hiểm'),
              value: `${insurancesSettingSpend?.personal['collaborator' + level]}%`,
            });
          } else {
            personalLevels.push({
              label: `Quản lý cấp ${level + 1}`,
              value: `${insurancesSettingSpend?.personal['collaborator' + level]}%`,
            });
          }
        }

        return (
          <>
            <h3>{t('CHI TRẢ THEO CÁ NHÂN')}:</h3>
            <GroupInformationItem {...{
              label: t('Mức chi tối đa'),
              value: `${insurancesSettingSpend?.personal?.percentCommission || 0}%`,
            }}/>
            {personalLevels.map((item: any, index: number) => (
              <GroupInformationItem key={index} {...{
                label: item.label,
                value: item.value,
              }}/>
            ))}

            <h3>{t('CHI TRẢ THEO ĐẠI LÝ')}:</h3>
            <GroupInformationItem {...{
              label: t('Mức chi mặc định'),
              value: `${insurancesSettingSpend?.agency?.percentCommission || 0}%`,
            }}/>
          </>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Ngày áp dụng'),
      dataIndex: 'applyDate',
      key: 'applyDate',
      sortable: true,
      converter: ConverterUtils.dateConverter,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Status'),
      dataIndex: 'status',
      sortable: true,
      key: 'status',
      render: (status) => <Tag color={COMMISSION_SETTING_STATUS_INFO_MAPPING[status]?.color}>{COMMISSION_SETTING_STATUS_INFO_MAPPING[status]?.label || ''}</Tag>,
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ]);
};
