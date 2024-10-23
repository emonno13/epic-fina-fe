import { HModal } from '@components/shared/common/h-modal';
import { endpoints } from '@lib/networks/endpoints';
import { useFeatureId } from '@schema-form/features/hooks';
import {
  useDocumentDetail,
  useViewTypeOfDeal,
} from '@schema-form/features/hooks/document-detail-hooks';
import {
  useSetDocumentDetail,
  useSetDocumentDetailWithoutVisible,
} from '@schema-form/features/hooks/table-hooks';
import { HForm } from '@schema-form/h-form';
import { Form } from 'antd';
import { VIEW_TYPE_OF_DEAL } from '../../..';
import { LoanDealDetailSchemaForm } from './loan-deal-detail-schema-form';

export const CreateBankWithLoan = ({
  visible,
  onCancelModal,
  dealLoan,
  activeKey,
}) => {
  const [form] = Form.useForm();
  const document = useDocumentDetail();
  const featureId = useFeatureId() || 'deals';
  const setDocumentDetail = useSetDocumentDetail();
  const setDocumentDetailWithoutVisible =
    useSetDocumentDetailWithoutVisible(featureId);
  const viewTypeOfDeal = useViewTypeOfDeal('view-type-of-deal');

  const handleOkModal = () => {
    form.setFieldsValue({ categoryType: document?.category?.type });
    form.setFieldsValue({
      productCategory: document?.category?.productCategory,
    });
    form.submit();
    onCancelModal();
  };
  const handleCancelModal = () => {
    onCancelModal();
  };

  const handleGotSuccess = (doc) => {
    const dealDetails = [...(document?.dealDetails || []), ...[doc]];
    if (viewTypeOfDeal === VIEW_TYPE_OF_DEAL.GRID) {
      setDocumentDetailWithoutVisible({ ...document, dealDetails });
    } else {
      setDocumentDetail({ ...document, dealDetails });
    }
    activeKey(doc);
  };

  return (
    <HModal
      visible={visible}
      width={'60%'}
      onOk={handleOkModal}
      onCancel={handleCancelModal}
    >
      <HForm
        {...{
          endpoint: endpoints.endpointWithApiDomain('/deal-details'),
          method: 'post',
          form,
          schema: LoanDealDetailSchemaForm,
          hiddenFields: { dealId: dealLoan?.id },
          removeControlActions: true,
          transport: {
            dealLoan,
            form,
          },
          onGotSuccess: handleGotSuccess,
        }}
      />
    </HModal>
  );
};
