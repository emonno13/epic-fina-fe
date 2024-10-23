import { HSelect } from '@components/shared/common-form-elements/select';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { useAuth } from '@lib/providers/auth';
import { HFeature } from '@schema-form/features';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import { createSchemaItem } from '@schema-form/h-types';
import { Typography } from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import {
  MAPPING_PRODUCT_TYPES_TO_TYPE_TASK,
  USER_TYPES_MAPPING,
} from './constans';
import { EditTaskSchemaForm } from './edit-form/edit-task-schema-form';
import { useGetBelongOrgTypeForTask, useGetTypeForTask } from './hooks';
import { TASK_TYPE } from './utils';
const { Text } = Typography;

export const TaskPopover = ({ children, onGotSuccess }) => {
  const { currentUser } = useAuth();
  const type = currentUser?.type;

  const initialValues = {
    type: TASK_TYPE.counselling,
    sourceId: currentUser.id,
    rootTask: USER_TYPES_MAPPING[type],
    startAt: moment(),
  };

  return (
    <HFeature
      nodeName={'tasks'}
      featureId={'tasks_popover'}
      useQueryParams={false}
      documentIdName={'taskPopoverId'}
    >
      <HDocumentModalPanel
        destroyOnClose={true}
        hideSubmitAndContinueButton={true}
      >
        <HFeatureForm
          {...{
            initialValues,
            schema: EditTaskSchemaForm,
            hideSubmitAndContinueButton: true,
            onDataReadyToSubmit: handleCreateTaskReadyToSubmit,
            onGotSuccess,
          }}
        />
      </HDocumentModalPanel>
      {children}
    </HFeature>
  );
};

export const createTaskSchemaItem = () => {
  const { t } = useHTranslation('admin-common');
  const { currentUser } = useAuth();
  const userType = currentUser?.type;
  const belongOrgType = useGetBelongOrgTypeForTask();
  const { type: newType } = useGetTypeForTask();

  const initialValues = {
    type: TASK_TYPE.counselling,
    sourceId: currentUser.id,
    rootTask: USER_TYPES_MAPPING[userType],
    startAt: moment(),
  };

  const whereConditions: any = { belongOrgType, type: newType };

  return createSchemaItem({
    Component: SelectNewSchemaItem,
    name: 'belongToId',
    label: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
    rowProps: { gutter: { xs: 24, sm: 24, md: 24 } },
    colProps: { xs: 24, sm: 24, md: 12 },
    componentProps: {
      placeholder: t('Task counselling', { vn: 'Yêu cầu tư vấn' }),
      endpoint: 'tasks/suggestion',
      hiddenValues: whereConditions,
      withRelations: ['user'],
      allowClear: true,
      showSearch: true,
      mode: 'single',
      optionsConverter: generateLabelTaskElement,
      newItemOption: {
        formProps: {
          schema: EditTaskSchemaForm,
          nodeName: 'tasks',
          useDefaultMessage: true,
          initialValues,
          onDataReadyToSubmit: handleCreateTaskReadyToSubmit,
        },
        modalProps: {
          width: '80%',
          style: { top: '8px' },
        },
      },
    },
  });
};

const SelectNewSchemaItem = (props) => {
  return (
    <HFeature
      nodeName={'tasks'}
      featureId={'tasks_create_new_form'}
      useQueryParams={false}
      documentIdName={'taskCreateNewFormId'}
    >
      <HSelect {...props} />
    </HFeature>
  );
};

const generateLabelTaskElement = (
  document,
  optionsConverter: any = undefined,
) => {
  const newDocument = optionsConverter ? optionsConverter(document) : document;
  const user = document?.user || {};
  newDocument.label = (
    <div>
      <span>{`${document?.rootTask} - ${document?.code}`}</span>
      {!isEmpty(user) && (
        <div style={{ fontSize: 13 }}>
          <Text italic type="secondary">
            {ConverterUtils.getFullNameUser(user)}
            {user?.emails
              ? ` - ${ConverterUtils.showUserEmail(user?.emails)}`
              : ''}
          </Text>
        </div>
      )}
    </div>
  );
  return newDocument;
};

const handleCreateTaskReadyToSubmit = (document) => {
  delete document.reasonCloseTask;
  if (document?.productType) {
    document.type = MAPPING_PRODUCT_TYPES_TO_TYPE_TASK[document?.productType];
  }
  return document;
};
