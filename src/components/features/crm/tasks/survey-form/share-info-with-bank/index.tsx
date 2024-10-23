import { useHTranslation } from '@lib/i18n';
import HFeature from '@schema-form/features/feature';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HForm } from '@schema-form/h-form';
import { FormInstance, Modal, notification } from 'antd';
import { TASK_STATUSES, TASK_STATUSES_ASSIGNED } from 'constants/crm/task';
import { ShareSchemaForm } from './share-info-schema';
import { useShareWithBank } from './utils';

interface ShareInfoWithBankProps {
  visibleShareInfoWithBank: boolean;
  setVisibleShareInfoWithBank: (value: boolean) => void;
  surveyQuestionForm: FormInstance;
  formShare: FormInstance;
  selectedProductId: string;
}

const ShareInfoWithBank = (props: ShareInfoWithBankProps) => {
  const {
    visibleShareInfoWithBank,
    setVisibleShareInfoWithBank,
    surveyQuestionForm,
    formShare,
    selectedProductId,
  } = props;
  const { t } = useHTranslation('admin-common');
  const shareWithBank = useShareWithBank();
  const taskDetail = useDocumentDetail();
  const { surveyResultId, status, statusAssign } = taskDetail;

  return (
    <Modal
      visible={visibleShareInfoWithBank}
      title="Share Thông tin đến đối tác Fina"
      width={1100}
      onCancel={() => {
        setVisibleShareInfoWithBank(false);
      }}
      destroyOnClose
      onOk={() => {
        if (
          !selectedProductId &&
          !surveyQuestionForm?.getFieldValue('productId')
        ) {
          notification.error({
            message: t('Please select a loan product for counselling request', {
              vn: 'Vui lòng chọn một sản phẩm vay cho yêu cầu tư vấn này',
            }),
          });
          return;
        }
        // redistribution to the bank
        if (
          surveyResultId &&
          status === TASK_STATUSES.CONSULTED &&
          [
            TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_APPROVAL,
            TASK_STATUSES_ASSIGNED.WAITING_FOR_BANK_PROCESS,
            TASK_STATUSES_ASSIGNED.OVERDUE_FOR_BANK_RESPONSE,
          ].includes(statusAssign)
        ) {
          shareWithBank({
            formShare,
            surveyQuestionForm,
            setVisibleShareInfoWithBank,
          });

          return;
        }

        if (
          selectedProductId &&
          surveyQuestionForm?.getFieldValue('productId')
        ) {
          surveyQuestionForm.submit();
        }
        if (
          selectedProductId &&
          !surveyQuestionForm?.getFieldValue('productId')
        ) {
          shareWithBank({
            formShare,
            surveyQuestionForm,
            setVisibleShareInfoWithBank,
          });
        }
      }}
    >
      <HFeature
        {...{
          featureId: 'share-with-bank',
          documentIdName: 'share-with-bank',
        }}
      >
        <HForm
          {...{
            form: formShare,
            schema: ShareSchemaForm,
            hideControlButton: true,
            initialValues: {
              isAllBank: true,
            },
            transport: {
              productId: selectedProductId,
            },
          }}
        />
      </HFeature>
    </Modal>
  );
};

export default ShareInfoWithBank;
