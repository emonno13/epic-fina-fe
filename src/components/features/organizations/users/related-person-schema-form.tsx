import { Input, Radio } from 'antd';

import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { useHTranslation } from '@lib/i18n';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../shared/common-form-elements/select';
import { USER_RELATIONSHIP_OPTIONS } from '../../../shared/user/constants';
import {
  emailsDynamicSchemaForm,
  telsDynamicSchemaForm,
} from './detail-schema-form';
import { GroupAddressFormSchema } from './group-address-form-schema';

export const RelatedPersonSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const relatedPersonDetail = useDocumentDetail();
  const { transport } = props;
  const { mainUser } = transport;

  const person = relatedPersonDetail?.relatedPerson?.filter(
    (item: any) => item.userId === mainUser.id,
  )[0];

  return [
    createOrganizationSuggestionElement(
      {
        name: 'orgId',
        label: t('Organization'),
        colProps: { span: 8 },
      },
      {
        type: props.hiddenFields?.orgType,
        toppedOrgId: props.hiddenFields?.orgId,
      },
    ),
    createSchemaItem({
      Component: HSelect,
      label: t('RELATIONSHIP'),
      colProps: { span: 8 },
      name: 'relationship',
      rules: [
        {
          required: true,
          message: t('Relationship is required'),
        },
      ],
      initialValue: person?.relationship || '',
      componentProps: {
        placeholder: t('RELATIONSHIP'),
        options: USER_RELATIONSHIP_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'fullName',
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Full name', { vn: 'Họ tên' }),
      rules: [{ required: true, message: 'Full name is required' }],
      componentProps: {
        placeholder: t('Enter the full name', { vn: 'Nhập họ tên' }),
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      name: 'birthday',
      colProps: { span: 8 },
      label: t('Year of birth', { vn: 'Ngày tháng năm sinh' }),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Year of birth', { vn: 'Ngày tháng năm sinh' }),
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'idNumber',
      rowProps: { gutter: { xs: 8, md: 16 } },
      colProps: { span: 8 },
      label: t('ID number', { vn: 'CMT/CCCD' }),
      componentProps: {
        style: { width: '100%' },
        placeholder: t('Enter ID number', { vn: 'Nhập CMT/CCCD' }),
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      name: 'gender',
      colProps: { span: 8 },
      label: t('Gender'),
      componentProps: {
        options: [
          { label: t('Male'), value: 'male' },
          { label: t('Female'), value: 'female' },
          { label: t('Other'), value: 'other' },
        ],
      },
    }),
    ...telsDynamicSchemaForm(props),
    ...emailsDynamicSchemaForm(props),
    ...GroupAddressFormSchema(),
  ];
};
