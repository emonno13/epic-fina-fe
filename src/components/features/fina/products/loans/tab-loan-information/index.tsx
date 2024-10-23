import { EditOutlined } from '@ant-design/icons';
import { HCommentWithLabel } from '@components/shared/common-form-elements/h-comment';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import { useHTranslation } from '@lib/i18n';
import { useDocumentDetail } from '@schema-form/features/hooks';
import { useMemo } from 'react';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { LOAN_STATUS, PRODUCT_TYPE } from '../../utils';
import { ProductSchemaForm } from './schemas-form/loan-information.schema-form';

export const LoanInformationTab = () => {
  const { t } = useHTranslation('admin-common');
  const documentDetail = useDocumentDetail();
  const documentId = useMemo(() => documentDetail?.id, [documentDetail]);

  return (
    <>
      <HFeatureForm
        {...{
          hiddenValues: { type: PRODUCT_TYPE.LOAN },
          initialValues: { status: LOAN_STATUS.APPROVED },
          schema: ProductSchemaForm,
          resetIfSuccess: false,
          showResetButton: false,
          hideControlButton: false,
          hideSubmitAndContinueButton: false,
        }}
      />
      <HCommentWithLabel
        label={<LabelItem label="Note" firstIcon={<EditOutlined />} />}
        placeholder={t('CRM_TASK_FORM_CONTROL_COMMENT_PLACEHOLDER')}
        documentId={documentId}
      />
    </>
  );
};
