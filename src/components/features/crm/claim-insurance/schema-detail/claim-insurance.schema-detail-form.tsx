import { HUpload } from '@components/shared/common-form-elements/h-upload';
import { HSelect } from '@components/shared/common-form-elements/select';
import { SelectUtils } from '@components/shared/common-form-elements/select/Utils';
import { createSchemaLabelItem } from '@components/shared/common/h-label/h-label-title';
import HSteps from '@components/shared/common/h-step';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useCurrentUser } from '@lib/providers/auth';
import { useDocumentDetail } from '@schema-form/features/hooks';
import {
  createSchemaItem,
  HFormItemProps,
  HFormProps,
} from '@schema-form/h-types';
import { Input } from 'antd';
import { TASK_PRIORITY } from 'constants/crm/task';
import { useEffect, useState } from 'react';
import { USER_TYPES } from '../../tasks/constans';
import {
  RenderAssign,
  RenderViewCustomer,
} from '../../tasks/edit-form/includes-schema-form/counselling-schema-from';
import { TASK_CLAIM_INSURANCE_STATUS } from '../contants';
import { mappingLabelClaimInsuranceStep } from '../utils';

export const ClaimInsuranceSchemaDetailForm = (
  props: HFormProps,
): HFormItemProps[] => {
  const { transport } = props;
  const { initialValues } = transport;

  const { t } = useHTranslation('admin-crm');
  const currentUser = useCurrentUser();
  const documentDetail = useDocumentDetail();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = mappingLabelClaimInsuranceStep;
  const STATUS = mappingLabelClaimInsuranceStep.map((step) => step?.value);

  useEffect(() => {
    setCurrentStep(STATUS.indexOf(documentDetail?.status));
  }, [documentDetail, TASK_CLAIM_INSURANCE_STATUS]);
  const isOrgStaff = currentUser.type === USER_TYPES.staff;

  return [
    createSchemaItem({
      Component: () => (
        <HSteps
          {...{
            currentStep,
            steps,
          }}
        />
      ),
    }),
    createSchemaLabelItem({
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        label: 'THÔNG TIN',
        titleTooltip: 'THÔNG TIN',
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'id',
      initialValue: documentDetail?.id,
      hidden: true,
    }),
    createSchemaItem({
      label: t('Source', { vn: 'Nguồn' }),
      Component: Input,
      colProps: { span: 12 },
      name: 'rootTask',
      componentProps: {
        disabled: true,
      },
    }),
    createSchemaItem({
      Component: Input,
      name: 'subject',
      colProps: { span: 12 },
      rules: [
        {
          required: true,
          message: 'Tên nhiệm vụ là bắt buộc',
        },
      ],
      label: t('CRM_TASK_FORM_CONTROL_TASK_NAME_LABEL'),
      componentProps: {
        placeholder: t('CRM_TASK_FORM_CONTROL_TASK_NAME_PLACEHOLDER'),
      },
    }),
    SelectUtils.createUserSelectionElement({
      label: t('Presenter', { vn: 'Người giới thiệu' }),
      name: 'sourceId',
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
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
      colProps: { span: 12 },
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
      colProps: { span: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
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
      Component: HUpload,
      name: 'images',
      colProps: { xs: 24, sm: 24, md: 12 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      label: t('Image  claim insurance', { vn: 'Ảnh claim bảo hiểm' }),
      componentProps: {
        useImageCrop: false,
      },
    }),
    createSchemaLabelItem({
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 24, md: 24 } },
      componentProps: {
        label: 'THÔNG TIN KHÁCH HÀNG',
        titleTooltip: 'THÔNG TIN của KHÁCH HÀNG',
      },
    }),
    createSchemaItem({
      Component: RenderViewCustomer,
      colProps: { span: 12 },
      componentProps: { initialValues },
    }),
    ...(isOrgStaff
      ? [
          createSchemaItem({
            Component: RenderAssign,
            colProps: { span: 24 },
            rowProps: { gutter: { xs: 24, md: 24 } },
            componentProps: { initialValues },
          }),
        ]
      : []),
  ];
};
