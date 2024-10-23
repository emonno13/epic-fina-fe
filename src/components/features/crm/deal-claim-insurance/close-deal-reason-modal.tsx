import { WarningFilled } from '@ant-design/icons';
import { HSelect } from '@components/shared/common-form-elements/select';
import { HModal } from '@components/shared/common/h-modal';
import { useCurrentUser } from '@lib/providers/auth';
import {
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form, Input, notification } from 'antd';
import { memo, useState } from 'react';
import { useHTranslation } from '../../../../lib/i18n';
import { endpoints } from '../../../../lib/networks/endpoints';
import { HForm } from '../../../../schema-form/h-form';
import { createSchemaItem } from '../../../../schema-form/h-types';
import { DEAL_CLAIM_INSURANCE_STATUSES } from './utils';

export const EnterFinishRequestCounsellingReasonModal = ({
  isVisibleCloseRequest,
  setIsVisibleCloseRequest,
}) => {
  const { t } = useHTranslation('admin-common');
  const document = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const id = document?.id;
  const [form] = Form.useForm();
  const [reasonCloseTask, setReasonCloseTask] = useState<any>();
  const currentUser = useCurrentUser();
  const searchForm = useSearchForm();

  const handleOk = () => {
    form.submit();
    setIsVisibleCloseRequest(false);
  };

  const statusUpdate = () => {
    const reasonForRefusal = form?.getFieldsValue()?.reasonForRefusal;
    return reasonForRefusal;
  };

  const onDataReadyToSubmit = (value) => {
    delete value.reasonForRefusal;

    const historyLog = {
      status: statusUpdate(),
      createdAt: new Date(),
      createdById: currentUser.id,
      message: `Đóng yêu cầu vì: ${reasonCloseTask?.content || 'Nhân viên Fina đóng yêu cầu tư vấn'}`,
      createdBy: currentUser,
    };

    return {
      ...value,
      status: statusUpdate(),
      history: document?.statusHistories
        ? [...document.statusHistories, historyLog]
        : [historyLog],
    };
  };

  const handleGotSuccess = () => {
    searchForm?.submit();
    setDocumentDetail({ ...document, status: statusUpdate() });

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
      notification.success({
        message: t('Change status of task successfully', {
          vn: 'Thay đổi trạng thái yêu tư vấn thành công',
        }),
      });
    }
  };

  const schema = [
    createSchemaItem({
      Component: HSelect,
      label: t('Reason for refusal', { vn: 'Lý do từ chối' }),
      name: 'reasonForRefusal',
      rules: [
        {
          required: true,
          message: t('Reason for refusal is required!', {
            vn: 'Lý do từ chối là bắt buộc!',
          }),
        },
      ],
      componentProps: {
        options: [
          {
            label: t('Partner does not want to receive', {
              vn: 'Đối tác không muốn tiếp nhận',
            }),
            value: DEAL_CLAIM_INSURANCE_STATUSES.CANCELLED_BY_PARTNER,
          },
          {
            label: t('Partner refused due to lack of processing records', {
              vn: 'Đới tác từ chối do thiếu hồ sơ xử lý',
            }),
            value: DEAL_CLAIM_INSURANCE_STATUSES.MOVE_TO_PARTNER,
          },
        ],
      },
    }),
    createSchemaItem({
      Component: Input.TextArea,
      name: 'noteCloseTask',
      label: t('Note', { vn: 'Ghi chú' }),
      rules: [
        {
          required: true,
          message: t('Note is required!', { vn: 'Ghi chú là bắt buộc!' }),
        },
      ],
      componentProps: {
        rows: 4,
      },
    }),
  ];

  return (
    <HModal
      {...{
        visible: isVisibleCloseRequest,
        onCancel: () => setIsVisibleCloseRequest(false),
        onOk: handleOk,
        className: 'finish-counselling-request-reason-modal',
        title: (
          <>
            <WarningFilled className={'m-r-10'} />
            {t('reasonFinishCounsellingRequest')}
          </>
        ),
      }}
    >
      <HForm
        {...{
          form,
          hideControlButton: true,
          method: 'put',
          endpoint: endpoints.generateNodeEndpoint(`deals/${id}`),
          showSuccessMessage: false,
          onGotSuccess: handleGotSuccess,
          resetIfSuccess: false,
          schema: () => schema,
          onDataReadyToSubmit,
        }}
      />
    </HModal>
  );
};

export default memo(EnterFinishRequestCounsellingReasonModal);
