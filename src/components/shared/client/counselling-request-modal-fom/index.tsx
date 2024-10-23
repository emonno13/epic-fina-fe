import { TASK_TYPE } from '@components/features/crm/tasks/utils';
import { MobileCreateTaskChemaForm } from '@components/features/mobile-app/mobile-create-task/mobile-create-task-schema-form';
import { HModal } from '@components/shared/common/h-modal';
import { useHTranslation } from '@lib/i18n';
import { HForm } from '@schema-form/h-form';
import { HFormProps } from '@schema-form/h-types';
import { ModalProps } from 'antd';
import { useCurrentUser } from '../../../../lib/providers/auth';

export const ClientCounsellingRequestForm = (props: HFormProps) => {
  const { onDataReadyToSubmit = (value: any) => {}, ...restProps } = props;
  const currentUser = useCurrentUser();
  const { id: sourceId } = currentUser;

  return (
    <HForm
      {...{
        className: 'm-t-15',
        nodeName: 'tasks/public',
        method: 'post',
        hiddenValues: {
          // productId: '',
          // categoryId: '',
          type: TASK_TYPE.counselling,
        },
        schema: MobileCreateTaskChemaForm,
        onDataReadyToSubmit: (values) => {
          const { page, productType, note, customerInfo } =
            onDataReadyToSubmit(values);

          delete values.customerInfo;

          return {
            email: customerInfo?.email,
            customerName: customerInfo?.fullName,
            phone: customerInfo?.tel,
            sourceId,
            productType,
            page,
            note,
          };
        },
        ...restProps,
      }}
    />
  );
};

interface CounsellingRequestModalProps extends ModalProps {
  HFormProps?: HFormProps;
  type?: string;
}

const ClientCounsellingRequestModal = (props: CounsellingRequestModalProps) => {
  const { HFormProps = {}, type = '', ...modalProps } = props;
  const { t } = useHTranslation('common');
  const { onCancel } = props;

  return (
    <HModal
      {...{
        footer: null,
        destroyOnClose: true,
        title: t('Make a counselling request', {
          vn: 'Tạo một yêu cầu tư vấn',
        }),
        ...modalProps,
      }}
    >
      <ClientCounsellingRequestForm
        {...{
          ...HFormProps,
          onDataReadyToSubmit: (value) => ({
            ...value,
            page: location.href,
            productType: type,
          }),
          onGotSuccess: onCancel,
        }}
      />
    </HModal>
  );
};

export default ClientCounsellingRequestModal;
