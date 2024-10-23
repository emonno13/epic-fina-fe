import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import useForm from 'antd/lib/form/hooks/useForm';
import { RequestBackStatusOfTaskFormSchemaDetail } from './request-back-status-of-task/schemas-detail/request-back-status-of-task.form-schema-detail';
import { useDocumentSelected, useSetVisibleReopenTask, useVisibleReopenTask } from './hooks';
import { HForm } from '../../../../schema-form/h-form';
import { HModal } from '../../../shared/common/h-modal';
import { endpoints } from '../../../../lib/networks/endpoints';

export const ReopenTaskCounselling = () => {
  const visible = useVisibleReopenTask();
  const setVisible = useSetVisibleReopenTask();
  const documentReopen = useDocumentSelected();
  const [form] = useForm();

  const initialValues = { taskId: documentReopen?.id, statuses: undefined, requestMsg: undefined };

  useEffect(() => {
    form?.setFieldsValue(initialValues);
  }, [initialValues]);

  if (isEmpty(documentReopen)) {
    return <></>;
  }

  const handleDataReadyToSubmit = (document) => {
    const { statuses } = document;
    const newRequestObject = { ...document };
    const statusOfTask = statuses.split(' ')?.[0];
    const statusAssignOfTask = statuses.split(' ')?.[1];
    return { ...newRequestObject, statusOfTask, statusAssignOfTask, statuses: undefined };
  };

  return (
    <HModal
      visible={visible}
      onCancel={() => setVisible?.(false)}
      destroyOnClose={true}
      width={'60%'}
      onOk={() => form?.submit()}
    >
      <HForm
        initialValues={initialValues}
        schema={RequestBackStatusOfTaskFormSchemaDetail}
        hideControlButton={true}
        onDataReadyToSubmit={handleDataReadyToSubmit}
        endpoint={endpoints.endpointWithApiDomain('/requests-back-task-status')}
        method={'post'}
        form={form}
        onGotSuccess={() => setVisible?.(false)}
        useDefaultMessage={true}
      />
    </HModal>
  );
};