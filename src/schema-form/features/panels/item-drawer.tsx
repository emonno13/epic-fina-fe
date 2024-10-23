import React, { ReactNode, useEffect } from 'react';
import { Drawer, DrawerProps } from 'antd';
import { useDispatch } from 'react-redux';
import { FooterControls, getPropsAfterRemoveFooterProps } from './popover-footer-controls';
import { generateDefaultTitle } from './utils';
import {
  useItemDocument, useItemVisibility,
} from '../hooks';
import { setHasFeatureDetailStatus } from '../../../store/actions';
import { useOnCloseItem } from '../hooks/document-detail-hooks';
import { useHTranslation } from '../../../lib/i18n';

export interface HDocumentSubDrawerPanelProps extends DrawerProps {
  children?: ReactNode,
  hiddenDocumentButtonControls?: Function | boolean,
  closeButtonLabel?: string,
  submitButtonLabel?: string,
  hideSubmitAndContinueButton?: boolean,
  submitAndContinueButtonLabel?: string,
  submitAndContinueConfirmMessage?: string
  supportDragAndDropView?: boolean
}

export const HDocumentSubDrawerPanel = (props: HDocumentSubDrawerPanelProps) => {
  const { children, placement = 'right', supportDragAndDropView = false } = props;
  const { t } = useHTranslation('common');
  const visibility = useItemVisibility();
  const itemDocument: any = useItemDocument() || {};
  const itemVisibility = useItemVisibility();
  const dispatch = useDispatch();
  const onCloseItem = useOnCloseItem();

  useEffect(() => {
    dispatch(setHasFeatureDetailStatus({ status: visibility }));
  }, [visibility]);

  useEffect(() => {
    return () => {
      dispatch(setHasFeatureDetailStatus({ status: false }));
      onCloseItem();
    };
  }, []);
  const noFooter = props.footer === null;
  if (!visibility) {
    return null;
  }
  return (
    <Drawer
      {...getPropsAfterRemoveFooterProps({ ...props })}
      {...{
        placement,
        className: `${props.className} ${supportDragAndDropView ? 'ui-sub-drawer-with-dnd-control' : ''}`,
        width: props.width || '800px',
      }}
      mask={false}
      title={props.title || itemDocument?.name || generateDefaultTitle(t, itemDocument)}
      onClose={onCloseItem}
      visible={itemVisibility}
      footer={ noFooter ? null : (props.footer || <FooterControls hiddenCloseButton {...{ ...props, submitAndContinueButtonLabel: 'Save & close' }}/>)}
    >
      {children}
    </Drawer>
  );
};
