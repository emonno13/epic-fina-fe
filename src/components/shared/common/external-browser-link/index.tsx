import React, { ReactElement } from 'react';
import { useState } from 'react';
import { Modal } from 'antd';
import { ClickableOpacity } from '../../utils/clickable-opacity';

import './view.module.scss';

interface IExternalBrowserLink {
  title?: string;
  label?: string;
  icon?: any;
  href: string;
}

const ExternalBrowserLink = (props: IExternalBrowserLink): ReactElement => {
  const { title,label, icon, href } = props;
  const [show, setShow] = useState(false);
  const showModel = () => setShow(true);
  const hideModel = () => setShow(false);
  return (
    <div>
      <ClickableOpacity onClick={showModel}>{label}</ClickableOpacity>
      <Modal
        className="external-browser-popup"
        centered
        width={'100%'}
        title={title}
        visible={show}

        footer={null}
        destroyOnClose
        closable
        onOk={hideModel}
        onCancel={hideModel}>
        <iframe  style={{ width: '100%', border: 'none', height: 'calc(100vh - 112px)' }} src={href} title={title}/>
      </Modal>
    </div>
  );
};

export { ExternalBrowserLink };