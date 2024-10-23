import { HModal } from '@components/shared/common/h-modal';
import {
  useDocumentDetail,
  useSearchForm,
  useSetDocumentDetail,
} from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Form } from 'antd';
import { TASK_STATUSES } from 'constants/crm/task';
import { useHTranslation } from 'lib/i18n';
import { endpoints } from 'lib/networks/endpoints';
import { useCurrentUser } from 'lib/providers/auth';
import { memo } from 'react';

export const CreateDealModal = ({ isVisible, setIsVisible }) => {
  const { t } = useHTranslation('admin-common');
  const taskDetail = useDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const id = taskDetail?.id;
  const [form] = Form.useForm();
  const currentUser = useCurrentUser();
  const searchForm = useSearchForm();

  const handleOk = () => {
    form.submit();
    setIsVisible(false);
  };

  const handleGotSuccess = () => {
    searchForm?.submit();
    setDocumentDetail({ ...taskDetail, status: TASK_STATUSES.CONSULTED });
    FormUtils.submitForm(
      {
        id,
        dealMetadata: taskDetail?.metadata,
      },
      {
        endpoint: endpoints.generateNodeEndpoint('/tasks/send-deal-to-partner'),
        method: 'put',
        showSuccessMessage: false,
      },
    );
  };

  return (
    <HModal
      {...{
        visible: isVisible,
        onCancel: () => setIsVisible(false),
        onOk: handleOk,
        className: 'finish-counselling-request-reason-modal',
        title: <>{t('create deal', { vn: 'Tạo hồ sơ yêu cầu bảo hiểm' })}</>,
      }}
    >
      <HForm
        {...{
          form,
          hideControlButton: true,
          method: 'put',
          endpoint: endpoints.generateNodeEndpoint(`tasks/${id}`),
          showSuccessMessage: false,
          onGotSuccess: handleGotSuccess,
          useDefaultMessage: true,
          onDataReadyToSubmit: () => {
            const historyLog = {
              status: TASK_STATUSES.CONSULTED,
              createdAt: new Date(),
              createdById: currentUser.id,
              message: 'Tạo hồ sơ yêu cầu bảo hiểm',
              createdBy: currentUser,
            };
            return {
              status: TASK_STATUSES.CONSULTED,
              history: taskDetail?.history
                ? [...taskDetail.history, historyLog]
                : [historyLog],
            };
          },
          resetIfSuccess: false,
        }}
      />
    </HModal>
  );
};

export default memo(CreateDealModal);
