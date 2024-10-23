import { Input } from 'antd';

import { HSelect } from '@components/shared/common-form-elements/select';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import { useDocumentDetail } from '@schema-form/features/hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { getGroupTypeOptions } from '@types/group';
import { isEmpty } from 'lodash';

export const GroupDetailSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 16 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Name'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Name') },
      ],
      componentProps: {
        placeholder: t('Enter the name', { vn: 'Nhập vào tên' }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Type of group', { vn: 'Loại nhóm' }),
      name: 'type',
      colProps: { span: 6 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      rules: [
        {
          required: true,
          message: t('Group type is required', { vn: 'Loại nhóm là bắt buộc' }),
        },
      ],
      componentProps: {
        disabled: !isEmpty(documentDetail),
        placeholder: t('Select a user type', { vn: 'Nhập vào loại nhóm' }),
        options: getGroupTypeOptions(t),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      label: t('Description'),
      componentProps: {
        rows: 6,
        placeholder: t('Enter the description', { vn: 'Nhập vào mô tả' }),
      },
    }),
  ];
};
