import { CloseCircleOutlined } from '@ant-design/icons';
import { Drawer, DrawerProps } from 'antd';
import { ReactNode, useCallback } from 'react';
import { useCancelClientDocumentDetail, useClientFeature } from '../hooks/client-feature-hook';

interface ClientFeatureDrawerProps extends DrawerProps {
  children: ReactNode;
}

const ClientFeatureDrawer = (props: ClientFeatureDrawerProps) => {
  const { closeIcon, onClose, placement = 'bottom' } = props;
  const cancelClientDocumentDetail = useCancelClientDocumentDetail();
  const { documentDetailVisible } = useClientFeature();

  const onDrawerClose = useCallback((e) => {
    cancelClientDocumentDetail();
    if (onClose) onClose(e);
  }, [onClose, cancelClientDocumentDetail]);

  return (
    <Drawer {...{
      ...props,
      closeIcon: closeIcon || <CloseCircleOutlined/>,
      onClose: onDrawerClose,
      destroyOnClose: true,
      visible: documentDetailVisible,
      placement,
    }} />
  );
};

export default ClientFeatureDrawer;
