import React, { ReactNode } from 'react';
import { FooterControls, getPropsAfterRemoveFooterProps } from './popover-footer-controls';
import {
  useItemVisibility,
} from '../hooks';
import { HModal, HModalProps } from '../../../components/shared/common/h-modal';
import { useOnCloseItem } from '../hooks/document-detail-hooks';

export interface HItemDocumentModalPanelProps extends HModalProps {
  children: ReactNode,
  hiddenDocumentButtonControls?: Function | boolean,
  closeButtonLabel?: string,
  submitButtonLabel?: string,
  hideSubmitAndContinueButton?: boolean,
  submitAndContinueButtonLabel?: string,
  submitAndContinueConfirmMessage?: string
}

export const HItemDocumentModalPanel = (props: HItemDocumentModalPanelProps) => {
  const { children } = props;
  const itemDocumentDetailVisibility = useItemVisibility();
  const onCloseItem = useOnCloseItem();
  if (!itemDocumentDetailVisibility) {
    return null;
  }
  return (
    <HModal
      {...getPropsAfterRemoveFooterProps({ ...props })}
      onCancel={onCloseItem}
      width={props.width || '80%'}
      visible={itemDocumentDetailVisibility}
      footer={props.footer || <FooterControls hiddenCloseButton {...props}/>}>
      {children}
    </HModal>
  );
};
