import React, { ReactNode, useEffect } from 'react';
import { FooterControls, getPropsAfterRemoveFooterProps } from './popover-footer-controls';
import {
  useDocumentDetail,
  useDocumentDetailVisibility, useOnCloseDocumentDetail,
} from '../hooks';
import { HModal, HModalProps } from '../../../components/shared/common/h-modal';
import { useReloadDocumentDetailWithChildren } from '../hooks/table-hooks';

export interface HDocumentModalPanelProps extends HModalProps {
  children: ReactNode,
  hiddenDocumentButtonControls?: Function | boolean,
  closeButtonLabel?: string,
  rendering?: boolean,
  submitButtonLabel?: string,
  hideSubmitAndContinueButton?: boolean,
  submitAndContinueButtonLabel?: string,
  submitAndContinueConfirmMessage?: string,
  onCloseParams?: any,
}

export const HDocumentModalPanel = (props: HDocumentModalPanelProps) => {
  const { children, rendering = true, onCloseParams = {} } = props;
  const documentDetailVisibility = useDocumentDetailVisibility();
  const closeDocumentDetailPopover = useOnCloseDocumentDetail();
  const documentDetail = useDocumentDetail();
  const reloadDocumentDetail = useReloadDocumentDetailWithChildren();
  useEffect(() => {
    reloadDocumentDetail(documentDetail);
  }, []);
  if (!documentDetailVisibility || !rendering) {
    return null;
  }
  return (
    <HModal
      {...getPropsAfterRemoveFooterProps({ ...props })}
      onCancel={() => closeDocumentDetailPopover(onCloseParams)}
      width={props.width || '80%'}
      visible={documentDetailVisibility}
      footer={props.footer === null ? props.footer : (props.footer || <FooterControls {...props}/>)}>
      {children}
    </HModal>
  );
};
