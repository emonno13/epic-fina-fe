import ReactAudioPlayer from 'react-audio-player';

import { TableUtils } from '@lib/table-utils';
import { useHTranslation } from '../../../../lib/i18n';

export const GreetingFileTableSchema = () => {
  const { t } = useHTranslation('admin-common');

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'code',
      sortable: true,
      key: 'code',
    }),
    TableUtils.createTableColumnConfig({
      title: t('File name', { vn: 'Tên file' }),
      dataIndex: 'file',
      sortable: true,
      key: 'file',
      render: (file) => file?.name || '',
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'description',
      sortable: true,
      key: 'description',
    }),
    TableUtils.createTableColumnConfig({
      title: t('File content', { vn: 'Nội dung file' }),
      dataIndex: 'file',
      key: 'file',
      render: (file) => <ReactAudioPlayer src={file?.url} controls />,
    }),
    TableUtils.createEditAndDeleteControlColumn(),
  ];
};
