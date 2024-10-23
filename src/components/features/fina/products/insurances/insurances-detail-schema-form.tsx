import { UploadOutlined } from '@ant-design/icons';
import { createHDynamicSchemaFormItems } from '@components/shared/common-form-elements/h-dynamic-form-items';
import { HSlug } from '@components/shared/common-form-elements/h-slug';
import HTinyEditor from '@components/shared/common-form-elements/h-tiny-editor';
import { setFormSlugValue } from '@components/shared/common-form-elements/utils';
import { useHTranslation } from '@lib/i18n';
import { CommentUtils } from '@lib/utils/comment';
import { HSubForm } from '@schema-form/h-form';
import {
  Button,
  Checkbox,
  Divider,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from 'antd';
import { ValidationMessages } from '../../../../../lib/validation-message';
import { useIsNewDocument } from '../../../../../schema-form/features/hooks/document-detail-hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../schema-form/h-types';
import { PRODUCT_TYPES } from '../../../../../types/organization';
import {
  HUpload,
  HUploadImage,
} from '../../../../shared/common-form-elements/h-upload';
import {
  createOrganizationSuggestionElement,
  HSelect,
} from '../../../../shared/common-form-elements/select';
import { createSchemaLabelItem } from '../../../../shared/common/h-label/h-label-title';
import { PRODUCT_SOURCE } from './constant';

import './insurances.module.scss';

export const InsurancesSchemaFormShort = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const isNewDocument = useIsNewDocument();
  const detail = 'info';
  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };

  const handleCopy = () => {
    CommentUtils.copyToClipboard(
      form?.getFieldsValue()?.info?.productUrlOriginal,
      t('Successfully copied href to clipboard', { vn: 'Đã copy link' }),
    );
  };

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('PRODUCT INFORMATION INSURANCE', {
          vn: 'THÔNG TIN SẢN PHẨM BẢO HIỂM',
        }),
        titleTooltip: t('PRODUCT INFORMATION INSURANCE', {
          vn: 'THÔNG TIN SẢN PHẨM BẢO HIỂM',
        }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'code',
      rendering: !isNewDocument,
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Code'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage(
            'Insurances product code',
          ),
        },
      ],
      componentProps: {
        disabled: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      colProps: { xs: 24, sm: 24, md: isNewDocument ? 24 : 12 },
      label: t('Name'),
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Insurances name'),
        },
      ],
      componentProps: {
        placeholder: t('Enter the product name'),
        onChange: onNameChange,
      },
    }),
    createOrganizationSuggestionElement({
      name: 'orgId',
      label: t('Manufacture'),
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      rules: [
        {
          required: true,
          message: ValidationMessages.requiredMessage('Organization'),
        },
      ],
      componentProps: {
        searchWhenHidenValueChange: true,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Product category'),
      colProps: { xs: 24, sm: 24, md: 12 },
      name: 'categoryId',
      rules: [
        {
          required: true,
          message: t('Loan type is required', {
            vn: 'Danh mục sản phẩm là bắt buộc',
          }),
        },
      ],
      componentProps: {
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.insurance },
        placeholder: t('Enter the product category', {
          vn: 'Nhập vào danh mục sản phẩm',
        }),
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
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
      Component: Input.TextArea,
      name: 'description',
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Description'),
      rules: [
        {
          required: true,
          message: t('Description is require', { vn: 'Mô tả là bắt buộc' }),
        },
      ],
      componentProps: {
        rows: 2,
        placeholder: t('Description'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: ['info', 'productUrlOriginal'],
      label: t('Original product url', { vn: 'Đường dẫn mua sản phẩm' }),
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        placeholder: t('Original product url', {
          vn: 'Đường dẫn mua sản phẩm',
        }),
        suffix: (
          <Button size={'small'} type={'primary'} onClick={handleCopy}>
            Copy
          </Button>
        ),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Bộ câu hỏi', { vn: 'Bộ câu hỏi' }),
      colProps: { xs: 24, sm: 24, md: 12 },
      name: 'questionGroupId',
      rules: [
        {
          required: true,
          message: t('Loan type is required', {
            vn: 'Danh mục sản phẩm là bắt buộc',
          }),
        },
      ],
      componentProps: {
        endpoint: 'question-groups/suggestion',
        hiddenValues: { productType: PRODUCT_TYPES.insurance },
        placeholder: t('Enter the product category', {
          vn: 'Nhập vào danh mục sản phẩm',
        }),
        optionsConverter: (document) => {
          document.label = `${document?.name}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: ['insuranceConfig', 'periodTime'],
      colProps: { span: 6 },
      label: t('Thời hạn hợp đồng'),
      rules: [
        {
          required: true,
          message: t('period time is require', {
            vn: 'Thời hạn hợp đồng là bắt buộc',
          }),
        },
      ],
      componentProps: {
        style: { width: '100%' },
      },
    }),
    createSchemaItem({
      Component: Select,
      name: ['insuranceConfig', 'typePeriodTime'],
      colProps: { span: 6 },
      label: t('Thời hạn hợp đồng'),
      rules: [
        {
          required: true,
          message: t('period time is require', {
            vn: 'Thời hạn hợp đồng là bắt buộc',
          }),
        },
      ],
      componentProps: {
        style: { width: '100%' },
        options: [
          { label: 'Năm', value: 'year' },
          { label: 'Tháng', value: 'month' },
          { label: 'Ngày', value: 'day' },
        ],
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: ['insuranceConfig', 'countdown'],
      colProps: { span: 6 },
      label: t('Thời hạn hợp đồng'),
      rules: [
        {
          required: true,
          message: t('period time is require', {
            vn: 'Thời hạn hợp đồng là bắt buộc',
          }),
        },
      ],
      componentProps: {
        style: { width: '100%' },
      },
    }),
    createSchemaItem({
      Component: Select,
      name: ['insuranceConfig', 'typeCountdown'],
      colProps: { span: 6 },
      label: t('Thời hạn hợp đồng'),
      rules: [
        {
          required: true,
          message: t('period time is require', {
            vn: 'Thời hạn hợp đồng là bắt buộc',
          }),
        },
      ],
      componentProps: {
        style: { width: '100%' },
        options: [
          { label: 'Tháng', value: 'month' },
          { label: 'Ngày', value: 'day' },
          { label: 'Phút', value: 'minute' },
        ],
      },
    }),
    createSchemaItem({
      Component: Radio.Group,
      label: t('Thẩm định', { vn: 'Thẩm định' }),
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 12 } },
      name: 'isExpertise',
      rules: [
        {
          required: true,
          message: t('Chọn loại thẩm định', { vn: 'Chọn loại thẩm định' }),
        },
      ],
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          {
            label: t('Not public', { vn: 'Không cần thẩm định' }),
            value: false,
          },
          { label: t('Public', { vn: 'Cần thẩm định' }), value: true },
        ],
      },
    }),
    createSchemaItem({
      Component: Switch,
      valuePropName: 'checked',
      label: t('On sale', { vn: 'Đang mở bán' }),
      colProps: { xs: 24, sm: 24, md: 12 },
      name: 'isActive',
    }),
    createSchemaItem({
      Component: Checkbox,
      name: 'isFina',
      colProps: { xs: 24, sm: 24, md: 12 },
      label: t('Sản phẩm bảo hiểm của FINA', {
        vn: 'Sản phẩm bảo hiểm của FINA',
      }),
      valuePropName: 'checked',
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('INSURANCE PRODUCTS PHOTOS', {
          vn: 'HÌNH ẢNH SẢN PHẨM BẢO HIỂM',
        }),
        titleTooltip: t('INSURANCE PRODUCTS PHOTOS', {
          vn: 'HÌNH ẢNH SẢN PHẨM BẢO HIỂM',
        }),
      },
    }),
    createSchemaItem({
      Component: HUploadImage,
      name: [detail, 'image'],
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Image'),
      componentProps: {
        useImageCrop: false,
      },
    }),
    createSchemaItem({
      Component: HUpload,
      name: [detail, 'insurance_certificate'],
      colProps: { xs: 24, sm: 24, md: 8 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Insurance certificate', { vn: 'Chứng nhận bảo hiểm' }),
      componentProps: {
        buttonUpload: (
          <div>
            <UploadOutlined />
            <div>
              {t('Insurance certificate', { vn: 'Chứng nhận bảo hiểm' })}
            </div>
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: HUpload,
      name: [detail, 'claim_certificate'],
      colProps: { span: 8 },
      label: t('Insurance claim', { vn: 'Yêu cầu bồi thường bảo hiểm' }),
      componentProps: {
        buttonUpload: (
          <div>
            <UploadOutlined />
            <div>
              {t('Insurance claim', { vn: 'Yêu cầu bồi thường bảo hiểm' })}
            </div>
          </div>
        ),
      },
    }),
    createSchemaItem({
      Component: HUpload,
      name: [detail, 'receipts'],
      colProps: { span: 8 },
      label: t('Receipts', { vn: 'Biên lai' }),
      componentProps: {
        buttonUpload: (
          <div>
            <UploadOutlined />
            <div>{t('Receipts', { vn: 'Biên lai' })}</div>
          </div>
        ),
      },
    }),
  ];
};

export const InsurancesSchemaFormDetail = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const detail = 'info';
  const { initialValues } = props;
  console.log('initialValues', initialValues?.source);
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('PRODUCT INFORMATION', { vn: 'Thông tin sản phẩm' }),
        titleTooltip: t('PRODUCT INFORMATION', { vn: 'Thông tin sản phẩm' }),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: [detail, 'productUrlOriginal'],
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Product link original', { vn: 'Đường dẫn sản phẩm bảo hiểm' }),
      componentProps: {
        placeholder: t('Product link original', {
          vn: 'Nhập đường dẫn sản phẩm bảo hiểm',
        }),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: [detail, 'commissionPercentage'],
      rowProps: { gutter: { xs: 24, md: 24 } },
      colProps: { span: 24 },
      label: t('Commission', { vn: 'Phần trăm hoa hồng (%)' }),
      componentProps: {
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
        style: { width: '100%' },
        placeholder: t('Commission', { vn: 'Phần trăm hoa hồng  (%)' }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: [detail, 'intro_title'],
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Title'),
      componentProps: {
        rows: 2,
        placeholder: t('Enter the title', { vn: 'Nhập tiêu đề' }),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: [detail, 'intro_des'],
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Description'),
      componentProps: {
        rows: 2,
        placeholder: t('Description'),
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: [detail, 'note_payment'],
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Payment Notes', { vn: 'Ghi chú thanh toán' }),
      componentProps: {
        rows: 2,
        placeholder: t('Enter the Payment Notes', {
          vn: 'Nhập ghi chú thanh toán',
        }),
      },
    }),
    createSchemaItem({
      Component: Checkbox,
      name: 'highlight',
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Highlight', { vn: 'Nổi bật' }),
      valuePropName: 'checked',
    }),
    createSchemaItem({
      Component: Input,
      name: [detail, 'codeGatewayGlobalCare'],
      hidden: true,
      ignore: initialValues?.source !== PRODUCT_SOURCE.GLOBAL_CARE,
    }),
    createSchemaItem({
      Component: Input,
      name: [detail, 'defaultStaffId'],
      hidden: true,
    }),
  ];
};

export const PackageItemSchemaDetail = (
  props: HFormProps,
): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('INSURANCE PACKAGE', { vn: 'GÓI SẢN PHẨM BẢO HIỂM' }),
        titleTooltip: t('INSURANCE PACKAGE', { vn: 'GÓI SẢN PHẨM BẢO HIỂM' }),
      },
    }),
    createHDynamicSchemaFormItems({
      name: 'packages',
      componentProps: {
        colMinus: 1,
        colPlus: 1,
        schemaItems: (field) => [
          createSchemaItem({
            Component: Divider,
            className: 'divider',
            style: {
              marginBottom: 10,
              minHeight: 0,
            },
            componentProps: {
              style: {
                margin: 0,
              },
            },
          }),
          createSchemaItem({
            Component: Input,
            name: 'name',
            label: t('Name', { vn: 'Tên' }),
            colProps: { span: 7 },
            rowProps: { gutter: { xs: 24, md: 24 } },
            rules: [
              {
                required: true,
                message: t('Name is required.', {
                  vn: 'Tên gói sản phẩm bảo hiểm là bắt buộc',
                }),
              },
            ],
            componentProps: {
              placeholder: t('Tên gói sản phẩm', { vn: 'Tên gói sản phẩm' }),
            },
          }),
          createSchemaItem({
            Component: InputNumber,
            name: 'price',
            label: t('Price FINA', { vn: 'Giá Fina' }),
            colProps: { span: 7 },
            rules: [
              {
                required: true,
                message: t('Price is require', {
                  vn: 'Giá gói bảo hiểm là bắt buộc',
                }),
              },
            ],
            componentProps: {
              style: { width: '100%' },
              placeholder: t('Giá', { vn: 'Giá' }),
              formatter: (value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              parser: (value) => value.replace(/(,*)/g, ''),
              min: 0,
            },
          }),
          createSchemaItem({
            Component: InputNumber,
            name: 'priceRoot',
            label: t('Price root', { vn: 'Giá gốc' }),
            colProps: { span: 7 },
            rules: [
              {
                required: true,
                message: t('Price is require', {
                  vn: 'Giá gói bảo hiểm là bắt buộc',
                }),
              },
            ],
            componentProps: {
              style: { width: '100%' },
              placeholder: t('Giá', { vn: 'Giá' }),
              formatter: (value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              parser: (value) => value.replace(/(,*)/g, ''),
              min: 0,
            },
          }),
          createSchemaItem({
            Component: HUploadImage,
            name: 'image',
            colProps: { span: 7 },
            rowProps: { gutter: { xs: 24, md: 24 } },
            label: t('Image'),
          }),
          createSchemaItem({
            Component: Checkbox,
            name: 'isObject',
            label: t('Is select customers', { vn: 'Có đối tượng khách hàng' }),
            colProps: { span: 7 },
            valuePropName: 'checked',
          }),
          createSchemaItem({
            name: 'isObject',
            colProps: { span: 7 },
            Component: ({ value: isObject }) => {
              return (
                <HSubForm
                  {...{
                    schema: () => [
                      createSchemaItem({
                        Component: Select,
                        name: [field?.name, 'objects'],
                        label: t('Object customers', {
                          vn: 'Đối tượng khách hàng',
                        }),
                        rules: [
                          {
                            required: isObject,
                            message: t('Object customers is required', {
                              vn: 'Đối tượng khách hàng là bắt buộc',
                            }),
                          },
                        ],
                        componentProps: {
                          mode: 'multiple',
                          placeholder: t('Chọn đối tượng', {
                            vn: 'Chọn đối tượng',
                          }),
                          options: [
                            { label: 'Nhân viên', value: 'staff' },
                            { label: 'Người thân', value: 'relative' },
                          ],
                        },
                        hidden: !isObject,
                      }),
                    ],
                  }}
                />
              );
            },
          }),
          createSchemaItem({
            Component: HTinyEditor,
            name: 'content',
            label: t('Content', { vn: 'Nội dung' }),
            colProps: { span: 24 },
            componentProps: {
              height: 250,
            },
          }),
        ],
      },
    }),
  ];
};
