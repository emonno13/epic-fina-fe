import {
  AlignLeftOutlined,
  EditOutlined,
  QuestionCircleTwoTone,
} from '@ant-design/icons';
import {
  TemplateEmails,
  TemplatePhones,
} from '@components/features/fina/deals/loans/detail/edit-deal-loan/edit-loan-schema-form';
import { commentDetailSchema } from '@components/shared/common-form-elements/h-comment';
import { TASK_TYPES } from '@constants/crm/task';
import { useCheckRoleFinaStaff } from '@dynamic-configuration/hooks';
import { useHTranslation } from '@lib/i18n';
import { createSchemaItem, HFormProps } from '@schema-form/h-types';
import { useState } from 'react';
import { ConverterUtils } from '../../../../../../lib/converter';
import { useCurrentUser } from '../../../../../../lib/providers/auth';
import { useDetailForm } from '../../../../../../schema-form/features/hooks';
import { SEARCH_MODES } from '../../../../../../schema-form/features/search-form/schema';
import { HSubForm } from '../../../../../../schema-form/h-form';
import { USER_TYPES } from '../../../../../../types/organization';
import {
  HDatePicker,
  HTimePicker,
} from '../../../../../shared/common-form-elements/date-picker';
import { HSelect } from '../../../../../shared/common-form-elements/select';
import { SelectUtils } from '../../../../../shared/common-form-elements/select/Utils';
import {
  createSchemaLabelItem,
  LabelItem,
} from '../../../../../shared/common/h-label/h-label-title';
import useAssignUserGroupSchemaForm from '../../components/assign-user-group';
import { RenderAssignPartnerForm } from '../../real-estate/components/render-assign-partner-form';
import { UserDetailShortSchema } from './user-detail-schema-from';

export const CounsellingSchemaForm = (props: HFormProps) => {
  const { t } = useHTranslation('admin-common');
  const currentUser: any = useCurrentUser();
  const isOrgStaff = currentUser.type === USER_TYPES.staff;
  const isSaleFina = useCheckRoleFinaStaff();
  const assignUserGroupSchemaForm = useAssignUserGroupSchemaForm();

  const { initialValues } = props;
  const renderAssignPartnerSchemaItem = (type) => {
    if (!type) {
      return [];
    }

    if (type !== TASK_TYPES.REAL_ESTATE) {
      return [];
    }

    return [
      createSchemaItem({
        Component: RenderAssignPartnerForm,
        colProps: { span: 24 },
        rowProps: { gutter: { xs: 16, md: 16 } },
        componentProps: { initialValues },
      }),
    ];
  };

  return [
    createSchemaLabelItem({
      colProps: { span: 24 },
      rowProps: { gutter: { xs: 16, md: 16 } },
      componentProps: {
        label: 'THÔNG TIN KHÁCH HÀNG',
        titleTooltip: 'THÔNG TIN của KHÁCH HÀNG',
      },
    }),
    createSchemaItem({
      Component: HSelect,
      label: t('Project'),
      name: 'projectId',
      colProps: { span: 12 },
      componentProps: {
        placeholder: t('Project'),
        showSearch: true,
        allowClear: true,
        optionFilterProp: 'children',
        endpoint: 'projects/suggestion',
        optionsConverter: (document) => {
          document.label = `${document?.name} - ${document.code}`;
          return document;
        },
      },
    }),
    createSchemaItem({
      Component: RenderViewCustomer,
      colProps: { span: 12 },
      componentProps: { initialValues },
    }),
    ...(isOrgStaff && isSaleFina
      ? [
          createSchemaItem({
            Component: RenderAssign,
            colProps: { span: 24 },
            rowProps: { gutter: { xs: 16, md: 16 } },
            componentProps: { initialValues },
          }),
          ...assignUserGroupSchemaForm(props),
          ...renderAssignPartnerSchemaItem(initialValues?.type),
        ]
      : []),
    ...commentDetailSchema({
      label: (
        <LabelItem
          label={t('Note', { vn: 'Ghi chú' })}
          firstIcon={<EditOutlined />}
        />
      ),
      componentProps: {
        placeholder: t('Note', { vn: 'Ghi chú' }),
      },
    }),
  ];
};

export const RenderViewCustomer = ({ initialValues }) => {
  const { t } = useHTranslation('admin-crm');
  const user = initialValues?.user || null;
  const currentId = initialValues?.id || null;
  const [data, setData] = useState(user);
  const currentUser = useCurrentUser();
  const mapDataUser = (option) => {
    setData(option);
  };

  return (
    <>
      <HSubForm
        {...{
          schema: () => [
            createSchemaItem({
              Component: HSelect,
              label: t('Customer', { vn: 'Khách hàng' }),
              name: 'userId',
              rules: [
                {
                  message: t('Customer is required', {
                    vn: 'Khách hàng là bắt buộc',
                  }),
                  required: true,
                },
              ],
              componentProps: {
                placeholder: t('CRM_TASK_FORM_CONTROL_ASSIGNEE_PLACEHOLDER'),
                showSearch: true,
                endpoint: 'users/suggestion',
                hiddenValues:
                  currentUser?.type === USER_TYPES.customer
                    ? {
                        searchingRule: SEARCH_MODES.MULTIPLE,
                        ownerId: currentUser?.id,
                      }
                    : { searchingRule: SEARCH_MODES.MULTIPLE },
                optionFilterProp: 'children',
                optionsConverter: (document) => {
                  document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
                  return document;
                },
                onChangeSelected: mapDataUser,
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
          ],
        }}
      />
      {data && (
        <div>
          <ViewDetailUser {...{ data, currentId }} />
        </div>
      )}
    </>
  );
};

const ViewDetailUser = ({ data, currentId }) => {
  const emails = data?.emails || [];
  const tels = data?.tels || [];

  return (
    <div>
      <TemplateEmails emails={emails} />
      <TemplatePhones tels={tels} userData={data} belongToId={currentId} />
    </div>
  );
};

export const RenderAssign = () => {
  const { t } = useHTranslation('admin-crm');
  const detailForm = useDetailForm();

  const disabledDate = (current) => {
    const startAt = new Date(detailForm?.getFieldValue('startAt'));
    return current < startAt;
  };

  return (
    <HSubForm
      {...{
        schema: () => [
          createSchemaLabelItem({
            colProps: { xs: 24, sm: 24, md: 12 },
            rowProps: { gutter: { xs: 24, md: 24 } },
            componentProps: {
              firstIcon: <AlignLeftOutlined />,
              label: 'NHÂN VIÊN XỬ LÝ',
              lastIcon: <QuestionCircleTwoTone />,
            },
          }),
          SelectUtils.createUserSelectionElement({
            label: t('CRM_TASK_FORM_CONTROL_ASSIGNEE_LABEL'),
            name: 'assigneeId',
            colProps: { xs: 24, sm: 24, md: 6 },
            rowProps: { gutter: { xs: 24, md: 24 } },
            componentProps: {
              placeholder: t('CRM_TASK_FORM_CONTROL_ASSIGNEE_PLACEHOLDER'),
              hiddenValues: { type: USER_TYPES.staff },
              mode: 'single',
              optionsConverter: (document) => {
                document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
                return document;
              },
            },
          }),
          createSchemaItem({
            Component: HDatePicker,
            name: 'startAt',
            colProps: { xs: 24, sm: 24, md: 6 },
            label: t('CRM_TASK_FORM_CONTROL_START_AT_LABEL'),
            componentProps: {
              style: { width: '100%' },
              showTime: true,
              format: 'DD/MM/YYYY HH:mm:ss',
              placeholder: t('CRM_TASK_FORM_CONTROL_START_AT_PLACEHOLDER'),
            },
          }),
          createSchemaItem({
            Component: HTimePicker,
            name: 'estimateTime',
            colProps: { xs: 24, sm: 24, md: 6 },
            label: t('Estimated time', { vn: 'Thời gian dự kiến' }),
            componentProps: {
              style: { width: '100%' },
              showTime: true,
              format: 'HH:mm:ss',
            },
          }),
          createSchemaItem({
            Component: HDatePicker,
            name: 'endAt',
            colProps: { xs: 24, sm: 24, md: 6 },
            label: t('CRM_TASK_FORM_CONTROL_START_END_LABEL'),
            rules: [
              ({ getFieldValue }) => ({
                validator() {
                  if (!getFieldValue('endAt')) {
                    return Promise.resolve();
                  }
                  const startAt = new Date(getFieldValue('startAt'));
                  const endAt = new Date(getFieldValue('endAt'));
                  if (startAt.getTime() < endAt.getTime()) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    t('End time must be more than start date time', {
                      vn: 'Thời điểm kết thúc nhiệm phải lớn hơn thời điểm bắt đầu',
                    }),
                  );
                },
              }),
            ],
            componentProps: {
              style: { width: '100%' },
              showTime: true,
              disabledDate,
              format: 'DD/MM/YYYY HH:mm:ss',
              placeholder: t('CRM_TASK_FORM_CONTROL_START_END_LABEL'),
            },
          }),
        ],
      }}
    />
  );
};
