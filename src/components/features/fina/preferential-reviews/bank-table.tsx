import { useHTranslation } from '@lib/i18n';
import { TableUtils } from '@lib/table-utils';
import { Input } from 'antd';

export const TableSchema = ({ isView = false, onchangeValueTable }) => {
  const { t } = useHTranslation('admin-common');
  const columns = [
    TableUtils.createTableColumnConfig({
      title: t('bank', { en: 'Bank', vn: 'Ngân hàng' }),
      dataIndex: 'org',
      render: (value, item) => (
        <p style={{ fontWeight: 'bold' }}>{item?.org?.code || ''}</p>
      ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Ưu đãi 12 tháng (%)', { vn: 'Ưu đãi 12 tháng (%)' }),
      dataIndex: 'preferentialRate',
      render: isView
        ? (value, record, index) => <span>{value ? value : '_'}</span>
        : (value, record, index) => (
            <Input
              value={value}
              onChange={(valueInput) =>
                onchangeValueTable('preferentialRate', valueInput, index)
              }
            />
          ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Biên độ (%)', { en: 'Biên độ(%)', vn: 'Biên độ (%)' }),
      dataIndex: 'amplitude',
      render: isView
        ? (value, record, index) => <span>{value ? value : '_'}</span>
        : (value, record, index) => (
            <Input
              value={value}
              onChange={(valueInput) =>
                onchangeValueTable('amplitude', valueInput, index)
              }
            />
          ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Lãi suất thực trả khi tất toán trước hạn (%)', {
        vn: 'Lãi suất thực trả khi tất toán trước hạn (%)',
        en: 'Lãi suất thực trả khi tất toán trước hạn (%)',
      }),
      // dataIndex: 'createdAt',
      // @ts-ignore
      children: [
        TableUtils.createTableColumnConfig({
          title: t('1 năm', { en: '1 năm', vn: '1 năm' }),
          dataIndex: 'oneYear',
          render: isView
            ? (value, record, index) => <span>{value ? value : '_'}</span>
            : (value, record, index) => (
                <Input
                  value={value}
                  onChange={(valueInput) =>
                    onchangeValueTable('oneYear', valueInput, index)
                  }
                />
              ),
        }),
        TableUtils.createTableColumnConfig({
          title: t('2 năm', { en: '2 năm', vn: '2 năm' }),
          dataIndex: 'twoYear',
          render: isView
            ? (value, record, index) => <span>{value ? value : '_'}</span>
            : (value, record, index) => (
                <Input
                  value={value}
                  onChange={(valueInput) =>
                    onchangeValueTable('twoYear', valueInput, index)
                  }
                />
              ),
        }),
        TableUtils.createTableColumnConfig({
          title: t('3 năm', { en: '3 năm', vn: '3 năm' }),
          dataIndex: 'threeYear',
          render: isView
            ? (value, record, index) => <span>{value ? value : '_'}</span>
            : (value, record, index) => (
                <Input
                  value={value}
                  onChange={(valueInput) =>
                    onchangeValueTable('threeYear', valueInput, index)
                  }
                />
              ),
        }),
      ],
    }),
    TableUtils.createTableColumnConfig({
      title: t('Lãi suất sau ưu đãi (%)', {
        en: 'Lãi suất sau ưu đãi (%)',
        vn: 'Lãi suất sau ưu đãi (%)',
      }),
      dataIndex: 'afterPreferentialRate',
      render: isView
        ? (value, record, index) => <span>{value ? value : '_'}</span>
        : (value, record, index) => (
            <Input
              value={value}
              onChange={(valueInput) =>
                onchangeValueTable('afterPreferentialRate', valueInput, index)
              }
            />
          ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Tỉ lệ cho vay (%)', {
        en: 'Tỉ lệ cho vay (%)',
        vn: 'Tỉ lệ cho vay (%)',
      }),
      dataIndex: 'maxRate',
      render: isView
        ? (value, record, index) => <span>{value ? value : '_'}</span>
        : (value, record, index) => (
            <Input
              value={value}
              onChange={(valueInput) =>
                onchangeValueTable('maxRate', valueInput, index)
              }
            />
          ),
    }),
    TableUtils.createTableColumnConfig({
      title: t('Thời hạn cho vay (năm)', {
        en: 'Thời hạn cho vay (năm)',
        vn: 'Thời hạn cho vay (năm)',
      }),
      dataIndex: 'maxTime',
      render: isView
        ? (value, record, index) => <span>{value ? value : '_'}</span>
        : (value, record, index) => (
            <Input
              value={value}
              onChange={(valueInput) =>
                onchangeValueTable('maxTime', valueInput, index)
              }
            />
          ),
    }),
    // TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];

  return columns;
};
