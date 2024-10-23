import { HDatePicker } from '@components/shared/common-form-elements/date-picker';
import { Input, Select, Switch } from 'antd';
import { isEmpty } from 'underscore';
import { useHTranslation } from '../../../../../../lib/i18n';
import { placeholderMessage } from '../../../../../../lib/validation-message';
import { useIsNewDocument } from '../../../../../../schema-form/features/hooks/document-detail-hooks';
import { HSubForm } from '../../../../../../schema-form/h-form';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../../schema-form/h-types';
import { createHDynamicSchemaFormItems } from '../../../../../shared/common-form-elements/h-dynamic-form-items';
import { HInputNumber } from '../../../../../shared/common-form-elements/h-input';
import { HSlug } from '../../../../../shared/common-form-elements/h-slug';
import { HSelect } from '../../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../../shared/common-form-elements/select/Utils';
import { setFormSlugValue } from '../../../../../shared/common-form-elements/utils';
import { createSchemaLabelItem } from '../../../../../shared/common/h-label/h-label-title';
import { HRadioGroup } from '../../../../../shared/common/h-radio-group';
import { PRODUCT_TYPE } from '../../utils';
import { FUND_STATUS, ORDER_MATCHING_DAY_OPTIONS } from '../constants';

export const FundFormDetailSchema = (props: HFormProps): HFormItemProps[] => {
  const isNewDocument = useIsNewDocument();
  const { t } = useHTranslation('admin-common');

  if (isNewDocument) {
    return [
      createSchemaItem({
        Component: Input,
        name: 'code',
        label: t('fundProduct.code'),
        rules: [
          {
            required: true,
            message: t('Code is required', { vn: 'Mã là bắt buộc' }),
          },
        ],
        componentProps: {
          placeholder: placeholderMessage(t('fundProduct.code'), t),
        },
      }),
      SelectUtils.createOrganizationSuggestionElement({
        rules: [
          {
            required: true,
            message: t('Organization is required', {
              vn: 'Tổ chức là bắt buộc',
            }),
          },
        ],
      }),
    ];
  }

  return [
    createSchemaItem({
      colProps: { xs: 24, md: 12 },
      rowProps: { gutter: { xs: 12, md: 24 } },
      Component: () => (
        <HSubForm
          {...{
            schema: () => GeneralInformationOfFundFormDetailSchema(props),
          }}
        />
      ),
    }),
    createSchemaItem({
      colProps: { xs: 24, md: 12 },
      Component: () => (
        <HSubForm
          {...{
            schema: DetailInformationOfFundFormDetailSchema,
          }}
        />
      ),
    }),
    // createSchemaItem({
    // 	colProps: {xs: 24, md: 12},
    // 	rowProps: {gutter: {xs: 12, md: 24}},
    // 	Component: () => (
    // 		<HSubForm {...{
    // 			schema: InvestmentMoneySettingOfFundFormDetailSchema,
    // 		}} />
    // 	),
    // }),
    // createSchemaItem({
    // 	colProps: {xs: 24, md: 12},
    // 	Component: () => (
    // 		<HSubForm {...{
    // 			schema: HoldingTimeSettingOfFundFormDetailSchema,
    // 		}} />
    // 	),
    // }),
  ];
};

export const GeneralInformationOfFundFormDetailSchema = (props) => {
  const { t } = useHTranslation('admin-common');
  const { form } = props;
  const isNewDocument = useIsNewDocument();
  const onNameChange = (e) => {
    const value = e?.target?.value;
    if (isNewDocument) {
      setFormSlugValue(value, form);
    }
  };
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('fundProduct.generalInformation'),
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'code',
      label: t('fundProduct.code'),
      rules: [
        {
          required: true,
          message: t('Code is required', { vn: 'Mã là bắt buộc' }),
        },
      ],
      componentProps: {
        disabled: !useIsNewDocument(),
        placeholder: placeholderMessage(t('fundProduct.code'), t),
      },
    }),
    SelectUtils.createOrganizationSuggestionElement({
      rules: [
        {
          required: true,
          message: t('Organization is required', { vn: 'Tổ chức là bắt buộc' }),
        },
      ],
      componentProps: {
        disabled: !useIsNewDocument(),
      },
    }),
    createSchemaItem({
      Component: Select,
      name: ['info', 'typeOfFund'],
      label: t('fundProduct.typeOfFund'),
      rules: [
        {
          required: true,
          message: t('Type fund is required', { vn: 'Loại quỹ là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: placeholderMessage(t('fundProduct.typeOfFund'), t),
        options: [
          { label: t('Quỹ cổ phiếu'), value: 'stock' },
          { label: t('Quỹ trái phiếu'), value: 'bond' },
          { label: t('Quỹ cân bằng'), value: 'balanced' },
          { label: t('Quỹ tiền tệ'), value: 'ipo' },
        ],
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'name',
      label: t('fundProduct.name'),
      rules: [
        {
          required: true,
          message: t('Name is required', { vn: 'Tên là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: placeholderMessage(t('fundProduct.name'), t),
        onChange: onNameChange,
      },
    }),
    createSchemaItem({
      Component: HSlug,
      name: 'slug',
      colProps: { span: 24 },
      label: t('Slug'),
      rules: [
        {
          required: true,
          message: t('Slug is required', { vn: 'Slug là bắt buộc' }),
        },
      ],
      componentProps: {
        placeholder: t('product.enterTheSlug'),
      },
    }),
    createSchemaItem({
      Component: Switch,
      name: 'isOutstanding',
      colProps: { span: 24 },
      label: t('Chứng chỉ quỹ nổi bật', { en: 'Outstanding fund' }),
      valuePropName: 'checked',
      initialValue: false,
    }),
    createSchemaItem({
      Component: Input,
      name: 'type',
      initialValue: PRODUCT_TYPE.FUND,
      hidden: true,
    }),
    createSchemaItem({
      Component: Input,
      name: 'status',
      initialValue: 'active',
      hidden: true,
    }),
    createSchemaItem({
      Component: Input,
      name: ['info', 'idPartner'],
      hidden: true,
    }),
    createHDynamicSchemaFormItems({
      name: ['info', 'priceUpdateHistories'],
      hidden: true,
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: HDatePicker,
            name: 'updatedAt',
          }),
          createSchemaItem({
            Component: HInputNumber,
            name: 'price',
          }),
        ],
      },
    }),
    createSchemaItem({
      Component: HRadioGroup,
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('product.status'),
      componentProps: {
        optionType: 'button',
        buttonStyle: 'solid',
        options: [
          { label: t('Đang mở bán'), value: FUND_STATUS.ACTIVE },
          { label: t('Chưa mở bán'), value: FUND_STATUS.INACTIVE },
        ],
      },
      name: 'status',
    }),
    createSchemaItem({
      Component: Input.TextArea,
      colProps: { xs: 24, sm: 24, md: 24 },
      label: t('Description', { vn: 'Ghi chú' }),
      name: 'description',
      componentProps: {
        rows: 4,
      },
    }),
  ];
};

export const DetailInformationOfFundFormDetailSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('fundProduct.detailInformation'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('fundProduct.orderMatchingDate'),
      name: ['info', 'orderMatchingDate'],
      rules: [
        {
          required: true,
          message: t('Order matching date is required', {
            vn: 'Ngày giao dịch là bắt buộc',
          }),
        },
      ],
      componentProps: {
        mode: 'multiple',
        disabled: !useIsNewDocument(),
        options: ORDER_MATCHING_DAY_OPTIONS,
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('fundProduct.nextOrderMatchingSession'),
      name: ['info', 'nextOrderMatchingSession'],
      rules: [
        {
          required: true,
          message: t('Next order matching session is required', {
            vn: 'Phiên khớp lệnh tiếp theo là bắt buộc',
          }),
        },
      ],
      componentProps: {
        showTime: true,
        disabled: !useIsNewDocument(),
        placeholder: placeholderMessage(
          t('fundProduct.nextOrderMatchingSession'),
          t,
        ),
        format: 'DD/MM/YYYY',
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('fundProduct.closedOrderBookTime'),
      name: ['info', 'closedOrderBookTime'],
      rules: [
        {
          required: true,
          message: t('Closed order book time is required', {
            vn: 'Thời điểm đóng sổ lệnh là bắt buộc',
          }),
        },
      ],
      componentProps: {
        showTime: true,
        disabled: !useIsNewDocument(),
        placeholder: placeholderMessage(
          t('fundProduct.closedOrderBookTime'),
          t,
        ),
        format: 'DD/MM/YYYY HH:mm:ss',
      },
    }),
    createSchemaItem({
      Component: HDatePicker,
      label: t('fundProduct.orderAndTransferMoneyToBuyDate'),
      name: ['info', 'orderAndTransferMoneyToBuyDate'],
      rules: [
        {
          required: true,
          message: t('Order and transfer money to buy date is required', {
            vn: 'Thời điểm đặt lệnh và chuyển tiền mua là bắt buộc',
          }),
        },
      ],
      componentProps: {
        disabled: !useIsNewDocument(),
        placeholder: placeholderMessage(
          t('fundProduct.orderAndTransferMoneyToBuyDate'),
          t,
        ),
        showTime: true,
        format: 'DD/MM/YYYY HH:mm:ss',
      },
    }),
    createHDynamicSchemaFormItems({
      label: t('Report fund', { vn: 'Báo cáo quỹ', en: 'Report fund' }),
      name: 'linksReport',
      componentProps: {
        colMinus: 2,
        colPlus: 2,
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { span: 10 },
            rowProps: { gutter: { xs: 8, md: 24 } },
            label: t('Title'),
            name: 'name',
            componentProps: {
              placeholder: t('Enter the name file', {
                vn: 'Nhập tên file',
                en: 'Enter the name file',
              }),
            },
          }),
          createSchemaItem({
            Component: Input,
            colProps: { span: 10 },
            label: t('Link'),
            name: 'link',
            componentProps: {
              placeholder: t('Enter the link file', {
                vn: 'Nhập đường dẫn file',
                en: 'Enter the link file',
              }),
            },
          }),
        ],
      },
    }),
    createSchemaItem({
      Component: ({ value }) => {
        if (isEmpty(value)) return <></>;
        const contentShouldShow = value
          ?.map((item) => item.name)
          ?.filter(Boolean);
        return (
          <ul>
            {contentShouldShow?.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        );
      },
      label: t('fundProduct.programList'),
      name: 'productDetails',
    }),
  ];
};

export const InvestmentMoneySettingOfFundFormDetailSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('fundProduct.investmentMoneySetting'),
      },
    }),
    createHDynamicSchemaFormItems({
      label: t('fundProduct.investmentMoneySetting'),
      name: ['info', 'investmentMoneySettings'],
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { xs: 20, md: 10 },
            rowProps: { gutter: { xs: 6, md: 12 } },
            name: 'investmentMoney',
            componentProps: {
              placeholder: placeholderMessage(
                t('fundProduct.investmentMoney'),
                t,
              ),
            },
          }),
          createSchemaItem({
            Component: HInputNumber,
            colProps: { xs: 20, md: 10 },
            name: 'fee',
            componentProps: {
              placeholder: placeholderMessage(t('fundProduct.fee'), t),
              max: 100,
              min: 0,
              formatter: (value) => `${value}%`,
              parser: (value) => value!.replace('%', ''),
            },
          }),
        ],
      },
    }),
  ];
};

export const HoldingTimeSettingOfFundFormDetailSchema = () => {
  const { t } = useHTranslation('admin-common');
  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('fundProduct.holdingTimeSetting'),
      },
    }),
    createHDynamicSchemaFormItems({
      label: t('fundProduct.holdingTimeSetting'),
      name: ['info', 'holdingTimeSettings'],
      componentProps: {
        schemaItems: [
          createSchemaItem({
            Component: Input,
            colProps: { xs: 20, md: 10 },
            rowProps: { gutter: { xs: 6, md: 12 } },
            name: 'holdingTime',
            componentProps: {
              placeholder: placeholderMessage(t('fundProduct.holdingTime'), t),
            },
          }),
          createSchemaItem({
            Component: HInputNumber,
            colProps: { xs: 20, md: 10 },
            name: 'fee',
            componentProps: {
              placeholder: placeholderMessage(t('fundProduct.fee'), t),
              max: 100,
              min: 0,
              formatter: (value) => `${value}%`,
              parser: (value) => value!.replace('%', ''),
            },
          }),
        ],
      },
    }),
  ];
};
