import { WarningFilled } from '@ant-design/icons';
import { HSelect } from '@components/shared/common-form-elements/select';
import { TASK_STATUSES } from '@constants/crm/task';
import { useCurrentUser } from '@lib/providers/auth';
import {
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Checkbox, Form, Input, notification } from 'antd';
import { memo, useMemo, useState } from 'react';
import { useHTranslation } from '../../../../../../lib/i18n';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { HForm } from '../../../../../../schema-form/h-form';
import { createSchemaItem } from '../../../../../../schema-form/h-types';
import { HModal } from '../../../../../shared/common/h-modal';
import { TASK_TYPE } from '../../utils';

export const EnterFinishRequestCounsellingReasonModal = ({
  isVisibleFinishRequestCounselling,
  setIsVisibleFinishRequestCounselling,
  isClaimInsurance = false,
}) => {
  const { t } = useHTranslation('admin-common');
  const taskDetail = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const id = taskDetail?.id;
  const [form] = Form.useForm();
  const [reasonCloseTask, setReasonCloseTask] = useState<any>();
  const currentUser = useCurrentUser();
  const searchForm = useSearchForm();
  const isRequiredNote = useMemo(
    () =>
      taskDetail?.type === TASK_TYPE.counselling &&
      reasonCloseTask?.isRequiredNote,
    [taskDetail?.type, reasonCloseTask?.isRequiredNote],
  );

  const handleOk = () => {
    form.submit();
  };

  const handleGotSuccess = () => {
    setIsVisibleFinishRequestCounselling(false);
    searchForm?.submit();
    setDocumentDetail({
      ...taskDetail,
      status: isClaimInsurance ? TASK_STATUSES.CANCEL : TASK_STATUSES.DONE,
      reasonCloseTaskId: reasonCloseTask,
    });
    const comment = form?.getFieldsValue()?.noteCloseTask || '';
    if (comment) {
      FormUtils.submitForm(
        {
          content: comment,
          belongToId: id,
        },
        {
          endpoint: endpoints.generateNodeEndpoint('/comments'),
          method: 'post',
          showSuccessMessage: false,
        },
      );
    }
    notification.success({
      message: t('Successfully closed the insurance claim', {
        vn: 'Đóng yêu cầu bồi thường bảo hiểm thành công',
      }),
    });
  };

  const schema = [
    createSchemaItem({
      Component: HSelect,
      label: t('cancelCounsellingRequestBecause'),
      rules: [
        {
          required: true,
          message: t('Lý do đóng là bắt buộc'),
        },
      ],
      rowProps: { gutter: { xs: 8, md: 16 } },
      name: 'reasonCloseTaskId',
      componentProps: {
        placeholder: 'Chọn lý do đóng',
        showSearch: true,
        endpoint: '/reason-close-tasks/suggestion',
        allowClear: true,
        optionFilterProp: 'children',
        optionsConverter: (document) => ({
          ...document,
          label: document?.content || '',
        }),
        onChangeSelected: setReasonCloseTask,
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'noteCloseTask',
      label: t('Note', { vn: 'Ghi chú' }),
      required: true,
      rules: [
        {
          required: isRequiredNote,
          message: t('Note is required', { vn: 'Ghi chú là bắt buộc' }),
        },
      ],
      componentProps: {
        rows: 4,
      },
    }),
    createSchemaItem({
      Component: Checkbox,
      name: 'isCreateNewTask',
      label: t('Tạo YCTV bất động sản', { vn: 'Tạo YCTV bất động sản' }),
      valuePropName: 'checked',
      componentProps: {
        rows: 4,
      },
    }),
  ];

  return (
    <HModal
      {...{
        visible: isVisibleFinishRequestCounselling,
        onCancel: () => setIsVisibleFinishRequestCounselling(false),
        onOk: handleOk,
        className: 'finish-counselling-request-reason-modal',
        title: (
          <>
            <WarningFilled className={'m-r-10'} />
            {t('Closing reason', { vn: 'Lý do đóng' })}
          </>
        ),
      }}
    >
      <HForm
        {...{
          form,
          hideControlButton: true,
          method: 'put',
          endpoint: endpoints.generateNodeEndpoint(`tasks/${id}`),
          onGotSuccess: handleGotSuccess,
          onDataReadyToSubmit: (document) => {
            const historyLog = {
              status: TASK_STATUSES.DONE,
              createdAt: new Date(),
              createdById: currentUser.id,
              message: `Đóng yêu cầu tư vấn vì: ${reasonCloseTask?.content || 'Nhân viên Fina đóng yêu cầu tư vấn'}`,
              createdBy: currentUser,
            };
            return {
              ...document,
              status: TASK_STATUSES.DONE,
              history: taskDetail?.history
                ? [...taskDetail.history, historyLog]
                : [historyLog],
            };
          },
          resetIfSuccess: false,
          schema: () => {
            if (isClaimInsurance)
              return [
                createSchemaItem({
                  Component: Input.TextArea,
                  name: 'noteCloseTask',
                  label: t('Note', { vn: 'Ghi chú' }),
                  componentProps: {
                    rows: 4,
                  },
                }),
              ];
            return schema;
          },
        }}
      />
    </HModal>
  );
};

export default memo(EnterFinishRequestCounsellingReasonModal);
