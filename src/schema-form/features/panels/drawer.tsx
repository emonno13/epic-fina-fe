import { Drawer, DrawerProps } from 'antd';
import { ReactNode, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import { FooterControls, getPropsAfterRemoveFooterProps } from './popover-footer-controls';
import { setHasFeatureDetailStatus } from '../../../store/actions';
import {
  useDocumentDetail,
  useDocumentDetailVisibility, 
  useOnCloseDocumentDetail, 
  useSetDocumentDetail,
} from '../hooks';
import { useReloadDocumentDetailWithChildren } from '../hooks/table-hooks';

export interface HDocumentDrawerPanelProps extends DrawerProps {
  children: ReactNode,
  hiddenDocumentButtonControls?: Function | boolean,
  insideLayout?: boolean,
  closeButtonLabel?: string,
  rendering?: boolean,
  submitButtonLabel?: string,
  hideSubmitAndContinueButton?: boolean,
  submitAndContinueButtonLabel?: string,
  submitAndContinueConfirmMessage?: string
  onCloseParams?: any,
}

export const HDocumentDrawerPanel = (props: HDocumentDrawerPanelProps) => {
  const { children, placement = 'top', insideLayout = true, getContainer = false, rendering = true, onCloseParams = {} } = props;
  const documentDetailVisibility = useDocumentDetailVisibility();
  const documentDetail = useDocumentDetail();

  const closeDocumentDetailPopover = useOnCloseDocumentDetail();
  const setDocumentDetail = useSetDocumentDetail();
  const dispatch = useDispatch();
  const reloadDocumentDetail = useReloadDocumentDetailWithChildren();
  useEffect(() => {
    // Todo: dispatch to the data source, that will help to save api call for next time
    reloadDocumentDetail(documentDetail);
  }, [documentDetail?.id]);
  useEffect(() => {
    dispatch(setHasFeatureDetailStatus({ status: documentDetailVisibility }));
  }, [documentDetailVisibility]);

  useEffect(() => {
    return () => {
      dispatch(setHasFeatureDetailStatus({ status: false }));
      setDocumentDetail({}, false);
    };
  }, []);

  const noFooter = props.footer === null;
  if (!documentDetailVisibility || !rendering) {
    return null;
  }
  return (
    <Drawer
      {...getPropsAfterRemoveFooterProps({ ...props })}
      {...{
        placement,
        className: `${insideLayout ? 'h-drawer-panel' : ''}  ${props.className || ''}`,
        height: props.height || '100%',
      }}
      getContainer={getContainer}
      onClose={() => closeDocumentDetailPopover(onCloseParams)}
      visible={documentDetailVisibility}
      footer={ noFooter ? null : (props.footer || <FooterControls {...props}/>)}
    >
      <Scrollbars id={`scroll-modal-${new Date().getTime()}`}>
        <div className={'ui-drawer-scroll-helper'}  >
          {children}
        </div>
      </Scrollbars>

    </Drawer>
  );
};
