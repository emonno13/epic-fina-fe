import { EditOutlined } from '@ant-design/icons';
import { HCommentWithLabel } from '@components/shared/common-form-elements/h-comment';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { HFeatureForm } from '@schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { HDocumentDrawerPanel } from '@schema-form/features/panels';
import { TASK_STATUSES } from 'constants/crm/task';
import { useHTranslation } from 'lib/i18n';
import { useCurrentUser } from 'lib/providers/auth';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { EnterFinishRequestCounsellingReasonModal } from '../tasks/edit-form/finish-request-counselling/confirm-request-counselling-reason-modal';
import CreateDealModal from './create-deal-modal';
import { ClaimInsuranceSchemaDetailForm } from './schema-detail/claim-insurance.schema-detail-form';

export const ClaimInsuranceDetails = (props) => {
  const { type } = props;

  const { t } = useHTranslation('admin-common');
  const currentUser = useCurrentUser();
  const [
    isVisibleFinishRequestCounselling,
    setIsVisibleFinishRequestCounselling,
  ] = useState(false);
  const [isVisibleCreateDeal, setIsVisibleCreateDeal] = useState(false);
  const documentDetail = useDocumentDetail();
  const documentId = useMemo(() => documentDetail?.id, [documentDetail]);

  const initialValues = useMemo(
    () => ({
      type,
      sourceId: currentUser.id,
      startAt: moment(),
    }),
    [type, currentUser.id, currentUser.type],
  );

  const handleFinishRequest = () => {
    setIsVisibleCreateDeal(true);
  };

  const handleCancelRequest = () => {
    setIsVisibleFinishRequestCounselling(true);
  };

  return (
    <HDocumentDrawerPanel
      {...{
        title: t('Claim insurance', { vn: 'Yêu cầu bồi thường bảo hiểm' }),
        customButton: documentDetail?.status === TASK_STATUSES?.ASSIGNED && (
          <>
            <HButton
              onClick={handleCancelRequest}
              className={'m-r-10'}
              type={'ghost'}
              danger
            >
              {t('Closing an insurance claim', {
                vn: 'Đóng yêu cầu bồi thường bảo hiểm',
              })}
            </HButton>

            <HButton
              onClick={handleFinishRequest}
              className={'m-r-10'}
              type={'primary'}
            >
              {t('Confirm', { vn: 'Tạo hồ sơ claim bảo hiểm' })}
            </HButton>
          </>
        ),
        hideSubmitAndContinueButton: true,
        hiddenDocumentButtonControls:
          documentDetail?.status === TASK_STATUSES?.DONE,
      }}
    >
      <HFeatureForm
        {...{
          schema: ClaimInsuranceSchemaDetailForm,
          initialValues,
          transport: {
            initialValues,
          },
        }}
      />

      <HCommentWithLabel
        label={
          <LabelItem
            label={t('Note', { vn: 'Ghi chú' })}
            firstIcon={<EditOutlined />}
          />
        }
        placeholder={t('Note', { vn: 'Ghi chú' })}
        documentId={documentId}
      />

      <EnterFinishRequestCounsellingReasonModal
        {...{
          isVisibleFinishRequestCounselling,
          setIsVisibleFinishRequestCounselling,
          isClaimInsurance: true,
        }}
      />

      <CreateDealModal
        {...{
          isVisible: isVisibleCreateDeal,
          setIsVisible: setIsVisibleCreateDeal,
        }}
      />
    </HDocumentDrawerPanel>
  );
};

export default ClaimInsuranceDetails;
