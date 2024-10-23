import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Radio, Tag } from 'antd';

import { TableUtils } from '@lib/table-utils';
import { useTranslation } from 'next-i18next';
import { createSchemaItem } from '../../../../../../schema-form/h-types';
import { HSelect } from '../../../../../shared/common-form-elements/select';
import {
  DOCUMENT_DETAIL_REQUIRED_OPTIONS,
  DOCUMENT_DETAIL_STATUSES_COLOR_MAPPING,
  DOCUMENT_DETAIL_STATUSES_LABEL_MAPPING,
  DOCUMENT_DETAIL_STATUSES_OPTIONS,
  DOCUMENT_DETAIL_VERSIONS_OPTIONS,
  DOCUMENT_TEMPLATE_DETAILS_VERSIONS_COLOR_MAPPING,
  DOCUMENT_TEMPLATE_DETAILS_VERSIONS_LABEL_MAPPING,
} from '../../constants';

export const DocumentTemplateDetailTableSchema = (props) => {
  const { t } = useTranslation('admin-common');
  const { isEditableTable, endpoint } = props;

  const appendControl: any[] = [];

  if (isEditableTable) {
    appendControl.push(
      TableUtils.createDeleteControlColumn('Action', { endpoint }),
    );
  }

  return [
    TableUtils.createTableColumnConfig({
      title: t('Code'),
      dataIndex: 'document',
      key: 'code',
      width: '20%',
      render: (document) => document?.code,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Name'),
      dataIndex: 'document',
      key: 'name',
      render: (document) => document?.name,
    }),
    TableUtils.createTableColumnConfig({
      title: t('Types'),
      dataIndex: 'types',
      key: 'types',
      width: '30%',
      itemSchema: isEditableTable
        ? createSchemaItem({
            Component: HSelect,
            name: 'types',
            componentProps: {
              mode: 'multiple',
              optionValues: DOCUMENT_DETAIL_VERSIONS_OPTIONS,
            },
          })
        : undefined,
      render: (types = []) => {
        if (types.length === 0) {
          return <Tag color={'pink'}>Type is not selected</Tag>;
        }

        return types.map((type, index) => {
          return (
            <Tag
              key={index}
              color={DOCUMENT_TEMPLATE_DETAILS_VERSIONS_COLOR_MAPPING[type]}
            >
              {DOCUMENT_TEMPLATE_DETAILS_VERSIONS_LABEL_MAPPING[type]}
            </Tag>
          );
        });
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Required',
      dataIndex: 'isRequired',
      key: 'isRequired',
      itemSchema: isEditableTable
        ? createSchemaItem({
            Component: Radio.Group,
            name: 'isRequired',
            componentProps: {
              optionType: 'button',
              options: DOCUMENT_DETAIL_REQUIRED_OPTIONS,
            },
          })
        : undefined,
      render: (isRequired) => {
        return isRequired ? <CheckOutlined /> : <CloseOutlined />;
      },
    }),
    TableUtils.createTableColumnConfig({
      title: 'Apply',
      dataIndex: 'status',
      key: 'status',
      itemSchema: isEditableTable
        ? createSchemaItem({
            Component: Radio.Group,
            name: 'status',
            componentProps: {
              optionType: 'button',
              options: DOCUMENT_DETAIL_STATUSES_OPTIONS,
            },
          })
        : undefined,
      render: (status) => {
        return (
          <Tag color={DOCUMENT_DETAIL_STATUSES_COLOR_MAPPING[status]}>
            {DOCUMENT_DETAIL_STATUSES_LABEL_MAPPING[status]}
          </Tag>
        );
      },
    }),
    ...appendControl,
  ];
};
