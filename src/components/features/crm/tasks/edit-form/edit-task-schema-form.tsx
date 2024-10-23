import HSteps from '@components/shared/common/h-step';
import { useIsRealEstateSeller } from '@dynamic-configuration/hooks';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input, Radio, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { isEmpty } from 'underscore';
import {
  ROOT_TASK_OPTIONS,
  TASK_PRIORITY,
  TASK_STATUSES,
  TASK_STATUSES_ASSIGNED,
} from '../../../../../constants/crm/task';
import { ConverterUtils } from '../../../../../lib/converter';
import { HSelect } from '../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../shared/common-form-elements/select/Utils';
import { PRODUCT_TYPES, TASK_STEPS } from '../constans';
import { TASK_TYPE } from '../utils';
import { CounsellingSchemaForm } from './includes-schema-form/counselling-schema-from';

const { Link } = Typography;

export const EditTaskSchemaForm = (props: HFormProps): HFormItemProps[] => {
  const { t } = useHTranslation('admin-crm');
  const documentDetail = useDocumentDetail();
  const schema: HFormItemProps[] = [];
  const [currentStep, setCurrentStep] = useState<number>(0);
  let steps = TASK_STEPS(t);
  const TASK_STEPS_STATUS = TASK_STEPS(t)?.map((step) => step?.value);
  const isRealEstateSeller = useIsRealEstateSeller();

  const renderTypeOfTaskSchemaItem = () => {
    if (isRealEstateSeller) {
      return [];
    }

    return [
      createSchemaItem({
        Component: HSelect,
        label: t('Classify', { vn: 'Phân loại' }),
        rules: [
          {
            required: true,
            message: 'Phân loại là bắt buộc',
          },
        ],
        colProps: { xs: 24, sm: 24, md: 12 },
        rowProps: { gutter: { xs: 16, md: 16 } },
        name: 'productType',
        componentProps: {
          placeholder: t('Please enter classify', { vn: 'Phân loại' }),
          options: PRODUCT_TYPES(t),
          disabled: [
            TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
            TASK_STATUSES_ASSIGNED.BANK_APPROVAL,
          ].includes(documentDetail?.statusAssign),
        },
      }),
    ];
  };

  const renderSourceOfTaskSchemaItem = () => {
    if (isRealEstateSeller) {
      return [];
    }

    return [
      createSchemaItem({
        label: t('Source', { vn: 'Nguồn' }),
        Component: HSelect,
        colProps: { xs: 24, sm: 24, md: 12 },
        name: 'rootTask',
        componentProps: {
          disabled: true,
          optionValues: ROOT_TASK_OPTIONS,
        },
      }),
    ];
  };

  useEffect(() => {
    setCurrentStep(
      TASK_STEPS_STATUS.indexOf(
        documentDetail?.status === TASK_STATUSES.CONSULTED
          ? documentDetail?.statusAssign
          : documentDetail?.status,
      ),
    );
  }, [documentDetail, TASK_STEPS_STATUS]);

  if (documentDetail?.status === TASK_STATUSES.DONE) {
    steps = TASK_STEPS(t)?.map((step) => ({ ...step, status: 'error' }));
  }

  if (!isEmpty(documentDetail)) {
    schema.push(
      createSchemaItem({
        Component: () => <HSteps {...{ currentStep, steps }} />,
        colProps: { xs: 24, sm: 24, md: 24 },
        rowProps: { gutter: { xs: 24, md: 24 } },
      }),
    );

    // if (documentDetail?.rootTask === ROOT_TASK.WEB) {
    //   schema.push(
    //     createSchemaItem({
    //       label: t('Page Url', { vn: 'Đường dẫn' }),
    //       Component: ({ value, ...propsChild }) => (
    //         <Link href={value || ''} target="_blank" {...propsChild}>{value || ''}</Link>
    //       ),
    //       colProps: { xs: 24, sm: 24, md: 12 },
    //       name: 'page',
    //       componentProps: {
    //         copyable: true,
    //       },
    //     }),
    //   );
    // }
  }

  return [
    ...schema,
    createSchemaItem({
      Component: Radio.Group,
      label: t('CRM_TASK_FORM_CONTROL_TYPE_LABEL'),
      colProps: { xs: 24, sm: 24, md: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: 'type',
      rules: [
        {
          required: true,
          message: t('Type is required', { vn: 'Loại nhiệm vụ là bắt buộc' }),
        },
      ],
      componentProps: {
        optionType: 'button',
        options: [
          { label: t('Call', { vn: 'Cuộc gọi' }), value: TASK_TYPE.call },
          { label: t('Yêu cầu tư vấn'), value: TASK_TYPE.counselling },
        ],
      },
    }),
    ...renderTypeOfTaskSchemaItem(),
    // ...renderSourceOfTaskSchemaItem(),
    createSchemaItem({
      Component: Input,
      name: 'subject',
      colProps: { xs: 24, sm: 24, md: 12 },
      rules: [
        {
          required: true,
          message: 'Tên nhiệm vụ là bắt buộc',
        },
      ],
      rowProps: { gutter: { xs: 16, md: 16 } },
      label: t('CRM_TASK_FORM_CONTROL_TASK_NAME_LABEL'),
      componentProps: {
        placeholder: t('CRM_TASK_FORM_CONTROL_TASK_NAME_PLACEHOLDER'),
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Presenter', { vn: 'Người giới thiệu' }),
      name: 'sourceId',
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        disabled: documentDetail?.id,
        placeholder: t('Source', { vn: 'Nguồn' }),
        mode: 'single',
        optionsConverter: (document) => {
          document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('CRM_TASK_FORM_CONTROL_PRIORITY_LABEL'),
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      name: 'priority',
      componentProps: {
        placeholder: t('CRM_TASK_FORM_CONTROL_PRIORITY_PLACEHOLDER'),
        options: [
          { label: t('CRM_TASK_PRIORITY_LOW'), value: TASK_PRIORITY.LOW },
          { label: t('CRM_TASK_PRIORITY_NORMAL'), value: TASK_PRIORITY.NORMAL },
          { label: t('CRM_TASK_PRIORITY_HIGH'), value: TASK_PRIORITY.HIGH },
          { label: t('CRM_TASK_PRIORITY_ASAP'), value: TASK_PRIORITY.ASAP },
        ],
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Organization', { vn: 'Tổ chức' }),
      name: 'orgId',
      colProps: { xs: 24, sm: 24, md: 12 },
      componentProps: {
        placeholder: t('Organization', { vn: 'Tổ chức' }),
        showSearch: true,
        allowClear: true,
        endpoint: 'organizations/suggestion',
        optionFilterProp: 'children',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: Select,
      label: t('Reason cancel', { vn: 'Lý do đóng' }),
      name: ['reasonCloseTask', 'content'],
      colProps: { xs: 24, sm: 24, md: 12 },
      hidden: !documentDetail?.reasonCloseTaskId,
      componentProps: {
        disabled: true,
      },
    }),
    ...CounsellingSchemaForm(props),
  ];
};
