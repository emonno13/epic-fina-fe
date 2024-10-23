import { Input, InputNumber, Tooltip } from 'antd';
import { useTranslation } from 'next-i18next';
import React, { memo, useEffect, useState } from 'react';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { UserDetailShortSchema } from '@components/features/crm/tasks/edit-form/includes-schema-form/user-detail-schema-from';
import { ConverterUtils } from '@lib/converter';
import { PRODUCT_DETAIL_STATUS } from '@components/features/fina/products/products-detail/utils';
import {
  CallPhoneFcssSDKConvert,
  IEmailItem,
  IPhoneNumberItem,
} from '@lib/fccs-sdk-convert';
import { AnyObject } from '@components/shared/atom/type';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '../../../../../../../schema-form/h-types';
import { ValidationMessages } from '../../../../../../../lib/validation-message';
import { createSchemaLabelItem } from '../../../../../../shared/common/h-label/h-label-title';
import { HSelect } from '../../../../../../shared/common-form-elements/select';
import {
  ORGANIZATION_TYPES,
  PRODUCT_TYPES,
  USER_TYPES,
} from '../../../../../../../types/organization';
import { LOAN_STATUS, PRODUCT_TYPE } from '../../../../products/utils';
import { TASK_PRODUCT_TYPES, TASK_TYPE } from '../../../../../crm/tasks/utils';
import { SelectUtils } from '../../../../../../shared/common-form-elements/select/Utils';
import { ItemViewer } from '../../../../../../shared/common/configuration/item-viewer';
import { useHTranslation } from '../../../../../../../lib/i18n';
import { HRadioGroup } from '../../../../../../shared/common/h-radio-group';
import { getOptionsTypeSource, TYPE_SOURCE } from '../../../utils';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '../../../../../../../schema-form/features/hooks/document-detail-hooks';
import { HSubForm } from '../../../../../../../schema-form/h-form';
import { SEARCH_MODES } from '../../../../../../../schema-form/features/search-form/schema';
import {
  TASK_STATUSES,
  TASK_STATUSES_ASSIGNED,
} from '../../../../../../../constants/crm/task';

export const EditLoanSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-common');
  const { initialValues, form, transport } = props;
  const [categoryId, setCategoryId] = useState<string>();
  const [isRealEstate, setIsRealEstate] = useState<boolean>(false);
  const [data, setData] = useState({});
  const [prod, setProd] = useState<any>({});

  const optionsTypeSource = getOptionsTypeSource(t);

  const deal = useDocumentDetail();
  const isCreate = useIsNewDocument();

  const limitFieldsOfProductDetail = {
    id: true,
    name: true,
    slug: true,
    productId: true,
    orgId: true,
    info: true,
    status: true,
    code: true,
    advantages: true,
  };
  const setProductDetail = transport?.setProductDetail;
  const isCreateFromTaskScreen = transport?.isCreateFromTaskScreen || false;
  const isDisableProductSelect = !categoryId;

  const checkCategoryRealEstate = (category) => {
    if (category?.productCategory === ORGANIZATION_TYPES.REAL_ESTATE) {
      setIsRealEstate(true);
    } else {
      setIsRealEstate(false);
    }
  };

  useEffect(() => {
    const loanByProductSelected = transport?.loanByProductSelected;
    if (!!loanByProductSelected && loanByProductSelected.length) {
      form?.setFieldsValue({
        productDetailIds: loanByProductSelected?.map((productDetail) =>
          productDetail?.id?.toString(),
        ),
      });
    }
  }, [transport]);

  useEffect(() => {
    if (!categoryId) {
      setCategoryId(initialValues?.categoryId);
    }

    if (!prod || isEmpty(prod)) {
      setProd(initialValues?.product);
    }

    if (!data || isEmpty(data)) {
      setData(initialValues?.user);
    }

    checkCategoryRealEstate(initialValues?.category);
  }, [initialValues]);

  const onChangeSelectedByProduct = (document) => {
    const productDetails = document?.productDetails;
    form?.setFieldsValue({ documentTemplateId: document?.documentTemplateId });
    setProd(document);

    if (!isEmpty(productDetails)) {
      const listProduct = productDetails.filter(
        (productDetail) =>
          productDetail?.status === PRODUCT_DETAIL_STATUS.APPROVED,
      );
      setProductDetail(listProduct);
    }
  };

  return [
    createSchemaLabelItem({
      componentProps: {
        label: t('Source'),
        titleTooltip: t('Source'),
      },
    }),
    createSchemaItem({
      Component: HRadioGroup,
      label: t('Source'),
      name: 'typeSource',
      rowProps: { gutter: { xs: 16, md: 24 } },
      colProps: { xs: 24, sm: 12, md: 4 },
      initialValue: TYPE_SOURCE.request_counselling,
      componentProps: {
        optionType: 'button',
        options: optionsTypeSource,
        style: { marginRight: 5, width: 'max-content' },
        buttonStyle: 'solid',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Request counselling'),
      colProps: { xs: 24, sm: 12, md: 8 },
      name: 'taskId',
      rules: [
        {
          required: deal?.id ? false : true,
          message: t('Task is required'),
        },
      ],
      componentProps: {
        disabled: isCreateFromTaskScreen,
        endpoint: 'tasks/suggestion',
        showSearch: true,
        hiddenValues: {
          type: {
            in: [TASK_TYPE.counselling, TASK_TYPE.call],
          },
          status: {
            nin: [
              TASK_STATUSES.DONE,
              TASK_STATUSES.CREATED,
              TASK_STATUSES.DELETED,
            ],
          },
          productType: TASK_PRODUCT_TYPES.loan,
          statusAssign: {
            nin: [TASK_STATUSES_ASSIGNED.CREATE_PROFILE],
          },
        },
        placeholder: t('Select a task'),
        withRelations: [
          'user',
          {
            relation: 'product',
            scope: {
              include: [
                {
                  relation: 'productDetails',
                  scope: {
                    fields: limitFieldsOfProductDetail,
                    include: [{ relation: 'org' }],
                  },
                },
              ],
            },
          },
        ],
        optionsConverter: (document) => {
          document.label = `${document?.subject} - ${document.code}`;
          return document;
        },
        onChangeSelected: (document) => {
          form?.setFieldsValue({ userId: document?.userId });
          form?.setFieldsValue({ categoryId: document?.categoryId });
          form?.setFieldsValue({ productId: document?.productId });
          form?.setFieldsValue({ assigneeId: document?.assigneeId });
          form?.setFieldsValue({ sourceId: document?.sourceId });
          form?.setFieldsValue({
            documentTemplateId: document?.product?.documentTemplateId,
          });
          setData(document?.user);
          setProd(document?.product);
          setProductDetail &&
            setProductDetail(document?.product?.productDetails);
        },
      },
    }),
    createSchemaLabelItem({
      componentProps: {
        label: t('Loan information'),
        titleTooltip: t('Loan information'),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Category Name'),
      colProps: { xs: 24, sm: 24, md: 8 },
      rowProps: { gutter: { xs: 16, md: 24 } },
      name: 'categoryId',
      rules: [
        {
          required: true,
          message: t('Category Name is required'),
        },
      ],
      componentProps: {
        endpoint: 'categories/suggestion',
        hiddenValues: { type: PRODUCT_TYPES.loan },
        placeholder: t('Select a category'),
        showSearch: true,
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
        onChangeSelected: (document) => {
          checkCategoryRealEstate(document);
          setCategoryId(document?.id);
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'productId',
      colProps: { xs: 24, sm: 24, md: 8 },
      label: (
        <Tooltip title={<ViewProduct {...prod} />} color={'#ffffff'}>
          {t('Product')} <QuestionCircleTwoTone />
        </Tooltip>
      ),
      rules: [{ required: true, message: t('Product is required') }],
      componentProps: {
        placeholder: t('Product'),
        showSearch: true,
        allowClear: true,
        searchWhenHidenValueChange: true,
        endpoint: 'products/suggestion',
        mode: 'single',
        hiddenValues: {
          type: PRODUCT_TYPE.LOAN,
          categoryId,
          status: LOAN_STATUS.APPROVED,
        },
        withRelations: [
          {
            relation: 'productDetails',
            scope: {
              fields: limitFieldsOfProductDetail,
              include: [{ relation: 'org', scope: { fields: ['id', 'name'] } }],
            },
          },
        ],
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${document?.name || ''} - ${document?.code || ''}`;
          return document;
        },
        onChangeSelected: onChangeSelectedByProduct,
        disabled: isDisableProductSelect,
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'propertyId',
      colProps: { xs: 24, sm: 24, md: 8 },
      label: (
        <Tooltip title={<ViewProduct {...prod} />} color={'#ffffff'}>
          {t('Property')} <QuestionCircleTwoTone />
        </Tooltip>
      ),
      componentProps: {
        placeholder: t('Property'),
        showSearch: true,
        allowClear: true,
        searchWhenHidenValueChange: true,
        endpoint: 'properties/suggestion',
        hiddenValues: { projectId: prod?.info?.projectId || null },
        optionsConverter: (document) => ({
          ...document,
          label: `${document?.name || ''} - ${document?.apartmentCode || ''}`,
        }),
        onChangeSelected: (document) => {
          form?.setFieldsValue({
            apartmentCodeInvestor: document?.apartmentCodeInvestor,
            realEstateInfo: {
              ...form?.getFieldsValue(['realEstateInfo']),
              apartmentCode: document?.apartmentCode,
              address: document?.address,
            },
          });
        },
      },
    }),
    createSchemaItem({
      Component: RealEstateInfo,
      colProps: { xs: 24, sm: 24 },
      rendering: isRealEstate,
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'loanMoney',
      label: t('', {
        en: 'Amount requested by the customer to borrow (đ)',
        vn: 'Số tiền khách yêu cầu vay',
      }),
      rowProps: { gutter: { xs: 16, md: 24 } },
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/(,*)/g, ''),
        style: { width: '100%' },
        placeholder: t('Enter amount to borrow (đ)', {
          vn: 'Nhập số tiền cần vay(đ)',
        }),
      },
    }),
    createSchemaItem({
      Component: InputNumber,
      name: 'timeLoan',
      label: t('Borrow time (month)', { vn: 'Thời gian vay (tháng)' }),
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        min: 1,
        max: 999,
        style: { width: '100%' },
        placeholder: t('Borrow time (month)', { vn: 'Thời gian vay (tháng)' }),
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'documentTemplateId',
      label: t('Document template', { vn: 'Mẫu tài liệu' }),
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        placeholder: t('Document template', { vn: 'Mẫu tài liệu' }),
        showSearch: true,
        allowClear: true,
        searchWhenHidenValueChange: true,
        endpoint: 'document-templates/suggestion',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      name: 'userId',
      label: (
        <Tooltip title={<ViewUser {...data} />}>
          {t('Customer')} {<QuestionCircleTwoTone />}
        </Tooltip>
      ),
      rules: [
        { required: true, message: ValidationMessages.requiredMessage('User') },
      ],
      colProps: { xs: 24, sm: 24, md: 8 },
      rowProps: { gutter: { xs: 16, md: 24 } },
      componentProps: {
        placeholder: t('Customer'),
        showSearch: true,
        allowClear: true,
        disabled: true,
        endpoint: 'users/suggestion',
        hiddenValues: { searchingRule: SEARCH_MODES.MULTIPLE },
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${ConverterUtils.showOrgEmail(document?.emails)}`;
          return document;
        },
        onChangeSelected: (document) => {
          setData(document);
        },
        newItemOption: {
          formProps: {
            schema: UserDetailShortSchema,
            nodeName: 'users',
            hiddenValues: { type: USER_TYPES.customer },
            useDefaultMessage: true,
          },
        },
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Staff Fina'),
      name: 'assigneeId',
      colProps: { xs: 24, sm: 24, md: 8 },
      rules: [
        {
          required: true,
          message: t('Select Staff Fina', {
            vn: 'Người được giao là bắt buộc',
          }),
        },
      ],
      componentProps: {
        placeholder: t('Select Staff Fina', { vn: 'Chọn người được giao' }),
        mode: 'single',
        hiddenValues: {
          type: USER_TYPES.staff,
          searchingRule: SEARCH_MODES.MULTIPLE,
        },
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${ConverterUtils.showOrgEmail(document?.emails)}`;
          return document;
        },
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Counselor'),
      name: 'sourceId',
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        placeholder: t('Source'),
        mode: 'single',
        hiddenValues: {
          searchingRule: SEARCH_MODES.MULTIPLE,
          or: [
            { type: USER_TYPES.staff },
            { type: USER_TYPES.collaborator },
            { positionCodes: 'FINA_COLLABORATOR' },
          ],
        },
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${ConverterUtils.showOrgEmail(document?.emails)}`;
          return document;
        },
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Staff Co processor'),
      name: 'staffCoprocessorIds',
      colProps: { xs: 24, sm: 24, md: 8 },
      componentProps: {
        placeholder: t('Select Staff Co processor', {
          vn: 'Chọn người đồng xử lý',
        }),
        mode: 'multiple',
        hiddenValues: {
          type: USER_TYPES.staff,
          searchingRule: SEARCH_MODES.MULTIPLE,
          id: {
            nin: [
              form?.getFieldValue('sourceId'),
              form?.getFieldValue('userId'),
              form?.getFieldValue('assigneeId'),
            ],
          },
        },
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${ConverterUtils.showOrgEmail(document?.emails)}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: Input,
      ignore: !isCreate,
      name: 'productDetailIds',
      hidden: true,
    }),
  ];
};

export const TemplateEmails = memo(
  ({ emails = [] }: { emails?: IEmailItem[] }) => {
    if (isEmpty(emails)) {
      return <></>;
    }

    return (
      <div>
        <b>Email:</b>
        {emails.map(({ email }) => (
          <span key={email}>{email} , </span>
        ))}
      </div>
    );
  },
);

export const TemplatePhones = memo(
  ({
    tels = [],
    userData,
    belongToId,
  }: {
    tels?: IPhoneNumberItem[];
    userData?: AnyObject;
    belongToId?: string;
  }) => {
    if (isEmpty(tels) || isEmpty(userData)) {
      return <></>;
    }

    return (
      <div>
        <b>Phone:</b>

        {tels.map((phoneData) => {
          const phoneNumber = phoneData?.tel;
          if (!phoneNumber) {
            return <></>;
          }

          return (
            <CallPhoneFcssSDKConvert
              key={phoneNumber}
              phoneNumber={phoneNumber?.toString()}
              userInfo={userData}
              belongToId={belongToId}
            />
          );
        })}
      </div>
    );
  },
);

const ViewUser = (data) => {
  return (
    <div>
      <TemplateEmails emails={data?.emails} />
      <TemplatePhones tels={data?.tels} userData={data} />
    </div>
  );
};

const ViewProduct = (data) => {
  const { t } = useTranslation('admin-common');
  if (data) {
    return (
      <div>
        <ItemViewer
          {...{
            label: t('Product code'),
            value: data?.code,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Product name'),
            value: data?.name,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Description'),
            value: data?.description,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Conditions apply'),
            value: data?.conditions,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Advantages'),
            value: data?.advantages,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Outstanding advantage'),
            value: data?.outstandingAdvantages,
            labelClassName: 'm-b-0i',
          }}
        />
        <ItemViewer
          {...{
            label: t('Disadvantages'),
            value: data?.disadvantages,
            labelClassName: 'm-b-0i',
          }}
        />
      </div>
    );
  }
  return <span />;
};

const RealEstateInfo = () => {
  const { t } = useHTranslation('admin-common');
  return (
    <HSubForm
      schema={() => [
        createSchemaItem({
          Component: Input,
          name: 'apartmentCodeInvestor',
          label: t('Apartment Code Investor', { vn: 'Mã SP CĐT' }),
          rowProps: { gutter: { xs: 16, md: 24 } },
          colProps: { xs: 24, sm: 24, md: 8 },
          componentProps: {
            placeholder: t('Enter Customer Code Investor ', {
              vn: 'Nhập mã SP CĐT',
            }),
          },
        }),
        createSchemaItem({
          Component: Input,
          name: ['realEstateInfo', 'apartmentCode'],
          label: t('Apartment code'),
          colProps: { xs: 24, sm: 24, md: 8 },
          componentProps: {
            placeholder: t('Enter apartment code ', {
              vn: 'Nhập vào mã căn hộ',
            }),
          },
        }),
        createSchemaItem({
          Component: Input,
          name: ['realEstateInfo', 'address'],
          label: t('Address'),
          colProps: { xs: 24, sm: 24, md: 8 },
          componentProps: {
            placeholder: t('Address'),
          },
        }),
      ]}
    />
  );
};
