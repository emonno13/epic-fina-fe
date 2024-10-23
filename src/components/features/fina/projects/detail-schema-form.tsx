import { HSlug } from '@components/shared/common-form-elements/h-slug';
import { HUploadImages } from '@components/shared/common-form-elements/h-upload';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { useHTranslation } from '@lib/i18n';
import { ValidationMessages } from '@lib/validation-message';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, InputNumber, Radio, Switch } from 'antd';
import { useEffect } from 'react';
import { ConverterUtils } from '../../../../lib/converter';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '../../../../schema-form/features/hooks/document-detail-hooks';
import { SEARCH_MODES } from '../../../../schema-form/features/search-form/schema';
import { HTinyEditor } from '../../../shared/common-form-elements/h-tiny-editor';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../shared/common-form-elements/select';
import { UserDetailSchema } from '../../crm/tasks/edit-form/includes-schema-form/user-detail-schema-from';
import { KIND_OF_PROJECTS, PROJECT_TYPES } from './utils';

export function validateNumberWithThousandSeparator(value, t) {
  const number = value.toString().replace(/(,*)/g, '');
  const regNumber = /^-?\d+$/;
  if (!regNumber.test(number)) {
    return Promise.reject(
      t('This filed must be a number', { vn: 'Trường này phải là một số' }),
    );
  }
  return Promise.resolve();
}

export const DocumentProjectDetailSchemaForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form, transport } = props;
  const { setDocumentDetail } = transport;
  const documentDetail = useDocumentDetail();
  const isNewDocument = props.transport?.isNewDocument || useIsNewDocument();

  useEffect(() => {
    if (setDocumentDetail && documentDetail) {
      setDocumentDetail(documentDetail);
    }
  }, [documentDetail]);

  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };

  return [
    createOrganizationSuggestionElement({
      name: 'investorId',
      label: t('Investor'),
      colProps: { span: 16 },
      componentProps: {
        orientation: 'left',
        placeholder: t('Please select a Investor', {
          vn: 'Nhập vào chủ đầu tư',
        }),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: 'active',
      colProps: { span: 24 },
      label: t('Operation Status', { vn: 'Trạng thái hoạt động' }),
      valuePropName: 'checked',
      initialValue: true,
    }),
    createSchemaItem({
      Component: Input,
      name: 'code',
      colProps: { span: 8 },
      rendering: !isNewDocument,
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Code'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Code') },
      ],
      componentProps: {
        disabled: true,
        placeholder: t('Enter the Project code', { vn: 'Nhập mã dự án' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { span: 16 },
      label: t('Project name'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Project name'),
        },
      ],
      componentProps: {
        placeholder: t('Enter the Project name', { vn: 'Nhập tên dự án' }),
        onChange: onNameChange,
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t('Project type'),
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      name: 'type',
      rules: [
        {
          message: t('Type is required', { vn: 'Loại dứ án là bắt buộc' }),
        },
      ],
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: t(PROJECT_TYPES.LOAN, { vn: 'Khoản vay' }),
            value: PROJECT_TYPES.LOAN,
          },
          {
            label: t(PROJECT_TYPES.INVESTMENT, { vn: 'Đầu tư' }),
            value: PROJECT_TYPES.INVESTMENT,
          },
          {
            label: t(PROJECT_TYPES.ALL, { vn: 'Tất cả' }),
            value: PROJECT_TYPES.ALL,
          },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'projectSize',
      colProps: { span: 16 },
      label: t('Project size'),
      componentProps: {
        placeholder: t('Enter the Project size', {
          vn: 'Nhập vào quy mô dự án',
        }),
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t('Kind of project'),
      colProps: { span: 8 },
      name: 'kindOf',
      rowProps: { gutter: { xs: 8, md: 16 } },
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: t(KIND_OF_PROJECTS.APARTMENT),
            value: KIND_OF_PROJECTS.APARTMENT,
          },
          {
            label: t(KIND_OF_PROJECTS.ADJOINING_HOUSING),
            value: KIND_OF_PROJECTS.ADJOINING_HOUSING,
          },
        ],
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'totalArea',
      colProps: { span: 6 },
      label: t('Total Area'),
      rules: [
        {
          required: true,
          message: t('Total area is required', { vn: 'Diện tích là bắt buộc' }),
        },
        {
          type: 'number',
          min: 0,
          message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
        },
      ],
      componentProps: {
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
        style: { width: '100%' },
        placeholder: '123.45',
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'expectedPrice',
      colProps: { span: 6 },
      label: t('Expected Price'),
      rules: [
        {
          required: true,
          message: t('Expected price is required', {
            vn: 'Số tiền dự kiến là bắt buộc',
          }),
        },
        {
          type: 'number',
          min: 0,
          message: t('Min is 0', { vn: 'Giá trị nhỏ nhất là 0' }),
        },
      ],
      componentProps: {
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
        style: { width: '100%' },
        placeholder: '123.45',
      },
    }),
    createSchemaItem({
      Component: HUploadImages,
      name: 'images',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Image', { en: 'Image', vn: 'Hình ảnh' }),
      componentProps: {
        onChange: (images) => {
          form?.setFieldsValue({
            images: images.map((image) => image?.url || ''),
          });
        },
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('Slug') },
      ],
      componentProps: {
        placeholder: t('Enter slug'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Contact'),
      name: 'userId',
      componentProps: {
        placeholder: t('Contact'),
        showSearch: true,
        allowClear: true,
        endpoint: 'users/suggestion',
        hiddenValues: { searchingRule: SEARCH_MODES.MULTIPLE },
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
          return document;
        },
        newItemOption: {
          formProps: {
            schema: UserDetailSchema,
            nodeName: 'users',
          },
        },
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'projectStatus',
      colProps: { span: 24 },
      label: t('Project status'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Project status'),
        },
      ],
      componentProps: {
        placeholder: t('Enter the Project status', {
          vn: 'Nhập trạng thái dự án',
        }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'link',
      colProps: { span: 24 },
      label: t('Project link'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Project link'),
        },
      ],
      componentProps: {
        placeholder: t('Enter the Project link', { vn: 'Nhập vào link dự án' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'productNumber',
      colProps: { span: 24 },
      label: t('Product Number'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Product Number'),
        },
      ],
      componentProps: {
        placeholder: t('Product Number'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'partnerProjectId',
      colProps: { span: 8 },
      rowProps: { gutter: { xs: 8, md: 16 } },
      label: t('Affiliate project code', { vn: 'Mã dự án liên kết' }),
      componentProps: {
        placeholder: t('Enter the affiliate project code', {
          vn: 'Nhập mã dự án liên kết',
        }),
      },
    }),
    createSchemaItem({
      Component: HTinyEditor,
      name: 'content',
      colProps: { span: 24 },
      label: t('Content'),
      componentProps: {
        rows: 6,
        placeholder: 'Enter the description',
      },
    }),
  ];
};
