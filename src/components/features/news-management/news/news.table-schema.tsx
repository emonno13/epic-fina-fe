import { ConverterUtils } from '@lib/converter';
import { TableUtils } from '@lib/table-utils';
import { Tag } from 'antd';
import { useHTranslation } from '../../../../lib/i18n';
import { NEWS_STATUS } from './constant';

export const NewsTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  const renderTitleColorStatus = (type) => {
    switch (type) {
      case NEWS_STATUS.ACHIEVEMENT:
        return { color: 'green', title: 'Thành tựu' };
      default:
        return { color: 'blue', title: 'Tin tức' };
    }
  };

  return [
    TableUtils.createTableColumnConfig({
      title: t('Title'),
      dataIndex: 'title',
      sortable: true,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Category Name'),
      width: 150,
      dataIndex: ['category', 'name'],
    }),
    TableUtils.createTableColumnConfig({
      title: t('Author', { vn: 'Tác giả' }),
      width: 150,
      dataIndex: 'author',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      render: (des) => {
        return <div dangerouslySetInnerHTML={{ __html: des }}></div>;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Trạng thái', { en: 'Status' }),
      dataIndex: 'isActive',
      render: (isActive) => {
        return (
          <Tag color={isActive ? 'blue' : 'pink'}>
            {isActive ? 'Hoạt động' : 'Không hoạt động'}
          </Tag>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Tin tức nổi bật', { en: 'Featured news' }),
      dataIndex: 'isOutstanding',
      render: (isOutstanding) => {
        return (
          <Tag color={isOutstanding ? 'blue' : 'pink'}>
            {isOutstanding ? 'Có' : 'Không'}
          </Tag>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Loại', { en: 'type' }),
      dataIndex: 'type',
      render: (type) => {
        return (
          <Tag color={renderTitleColorStatus(type).color}>
            {renderTitleColorStatus(type).title}
          </Tag>
        );
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Created at'),
      dataIndex: 'createdAt',
      render: ConverterUtils.fullDatetimeConverter,
    }),
    TableUtils.createEditAndDeleteControlColumn(t('Action')),
  ];
};
