import { useTranslation } from 'next-i18next';
import { Tag } from 'antd';
import React from 'react';
import { TableUtils } from '../../../../../../../../lib/table-utils';
import {
  PROGRESS_STATUSES_COLOR_MAPPING,
  PROGRESS_STATUSES_LABEL_MAPPING,
} from '../../../../../progress-template/utils';
import { HButtonControlActionProgress } from '../../../h-button-control-action-progress';

export const DetailProgressDealSchema = (dataSource) => {
  const { t } = useTranslation('admin-common');
  return ([
    TableUtils.createTableColumnConfig({
      title: t('Progress'),
      dataIndex: 'progressItem',
      sortable: true,
      key: 'progressItem',
      render: (progressItem) => {
        return progressItem?.name;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Progress status', {
        en: 'Progress status',
        vn: 'Trạng thái tiến trình',
      }),
      dataIndex: 'progressItem',
      sortable: true,
      key: 'progressItem',
      responsive: ['md'],
      render: (document) => <Tag
        color={PROGRESS_STATUSES_COLOR_MAPPING[document?.status]}
      >
        {PROGRESS_STATUSES_LABEL_MAPPING[document?.status]}
      </Tag>,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Weight'),
      responsive: ['md'],
      render: (_, document: any) => {
        return `${document?.currentWeight} / ${document?.weight}`;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Description'),
      dataIndex: 'progressItem',
      sortable: true,
      key: 'progressItem',
      responsive: ['md'],
      render: (progressItem) => {
        return progressItem?.description;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: t('Progress'),
      dataIndex: 'progressItem',
      sortable: true,
      key: 'progressItem',
      render: (_, document: any) => {
        return <HButtonControlActionProgress {...{ dataSource: dataSource, items: document }}/>;
      },
    }),
  ]);
};
