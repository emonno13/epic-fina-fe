import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { FormUtils } from '@schema-form/utils/form-utils';
import { useTranslation } from 'next-i18next';
import { ReactNode, useEffect } from 'react';
import { removeUnnecessaryProps } from '../../h-types';
import {
  useDetailForm,
  useDocumentDetail,
  useSubmitAndContinueDocumentButtonRef,
  useSubmitDocumentButtonRef,
} from '../hooks';
import { useHideDocumentDetail } from '../hooks/document-detail-hooks';
import {
  useLoadingCreateOrUpdateStatus,
  useSetLoadingCreateOrUpdateStatus,
} from '../hooks/feature-hooks';

export interface HFooterControlProps {
  hiddenDocumentButtonControls?: Function | boolean;
  hiddenCloseButton?: Function | boolean;
  closeButtonLabel?: string;
  submitButtonLabel?: string;
  hideSubmitAndContinueButton?: boolean;
  submitAndContinueButtonLabel?: string;
  submitAndContinueConfirmMessage?: string;
  customButton?: ReactNode;
  onCloseParams?: any;
}
export const getPropsAfterRemoveFooterProps = (props = {}) =>
  removeUnnecessaryProps(props, [
    'hiddenDocumentButtonControls',
    'closeButtonLabel',
    'submitButtonLabel',
    'hideSubmitAndContinueButton',
    'submitAndContinueButtonLabel',
    'submitAndContinueConfirmMessage',
  ]);

export const FooterControls = (props: HFooterControlProps) => {
  const { t } = useTranslation('common');

  const {
    hiddenDocumentButtonControls,
    hideSubmitAndContinueButton,
    submitAndContinueConfirmMessage,
    hiddenCloseButton = false,
    submitButtonLabel = t('submit'),
    closeButtonLabel = t('close'),
    submitAndContinueButtonLabel = t('submit_and_continue'),
    customButton,
    onCloseParams = {},
  } = props;

  const documentDetail = useDocumentDetail();
  const submitDocumentButtonRef = useSubmitDocumentButtonRef();
  const submitAndContinueDocumentRef = useSubmitAndContinueDocumentButtonRef();
  const useForm = useDetailForm();
  const closeDocumentDetailPopover = useHideDocumentDetail();

  const loadingCreateOrUpdateStatus = useLoadingCreateOrUpdateStatus();
  const setLoadingCreateOrUpdateStatus = useSetLoadingCreateOrUpdateStatus();

  const noControlActionsValue =
    typeof hiddenDocumentButtonControls === 'function'
      ? hiddenDocumentButtonControls(documentDetail)
      : hiddenDocumentButtonControls;

  const handleClickOnSubmit = async () => {
    try {
      await useForm?.validateFields();
      submitDocumentButtonRef?.current?.click();
    } catch (error) {
      FormUtils.showFormValidateFailMessage();
    }
  };

  useEffect(() => {
    setLoadingCreateOrUpdateStatus(false);
  }, []);

  if (noControlActionsValue) {
    return null;
  }

  return (
    <div className="item-align-right">
      {customButton}
      {!hiddenCloseButton && (
        <HButton
          onClick={() => closeDocumentDetailPopover(onCloseParams)}
          className="m-r-10"
        >
          {closeButtonLabel}
        </HButton>
      )}
      <HButton
        loading={loadingCreateOrUpdateStatus}
        onClick={handleClickOnSubmit}
        type="primary"
        className="m-r-10"
      >
        {submitButtonLabel}
      </HButton>
      {!hideSubmitAndContinueButton && (
        <HButton
          loading={loadingCreateOrUpdateStatus}
          onClick={() => submitAndContinueDocumentRef?.current?.click()}
          type="primary"
          confirmMessage={submitAndContinueConfirmMessage}
        >
          {submitAndContinueButtonLabel}
        </HButton>
      )}
    </div>
  );
};
