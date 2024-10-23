import { Input } from 'antd';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../schema-form/h-types';
import { useHTranslation } from '../../../../lib/i18n';
import { HSelect } from '../../../shared/common-form-elements/select';
import { ConverterUtils } from '../../../../lib/converter';

export const UsersGroupDetailSchema = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 8 },
      label: t('Name'),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Vui lòng nhập tên tên' }),
          whitespace: true,
        },
      ],
      componentProps: {
        placeholder: t('Enter the name'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: 'User',
      name: 'userIds',
      colProps: { xs: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        placeholder: t('Enter name/phone number/email/code to search', {
          vn: 'Nhập tên/sdt/email/code để tìm kiếm',
        }),
        mode: 'multiple',
        showSearch: true,
        searchWhenHiddenValueChange: true,
        endpoint: 'users/suggestion',
        optionsConverter: document => {
          const email = document?.emails?.[0]?.email;
          const phone = document?.tels?.[0]?.tel;
          document.label = `${ConverterUtils.getFullNameUser(document)}${` (${
            email ? `${email}; ` : ''
          }${phone || ''})`}`;
          return document;
        },
        withRelations: [
          {
            relation: 'org',
            scope: {
              fields: ['name'],
            },
          },
        ],
      },
    }),
  ];
};
