import { ModalProps } from 'antd/lib/modal';
import { Modal } from 'antd';
import { ReactNode } from 'react';
import cn from 'classnames';

import './HModal.module.scss';

export interface HModalProps extends ModalProps {
  children?: ReactNode;
  extraTitle?: ReactNode;
}

export const HModal = (props: HModalProps) => {
  const { title, extraTitle } = props;

  const renderTitleWithExtraContent = () => {
    if (!extraTitle) {
      return title;
    }
    return (
      <div className="extra-title">
        <span>{title}</span>
        <span>{extraTitle}</span>
      </div>
    );
  };

  return (
    <Modal 
      {...props} 
      title={renderTitleWithExtraContent()}
      className={cn(
        'h-modal', 
        { 'modal-without-title': !title }, 
        props.className,
      )}
    >{props?.children}</Modal>
  );
};
