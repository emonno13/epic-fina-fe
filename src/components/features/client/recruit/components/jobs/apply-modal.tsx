import React from 'react';
import { Modal } from 'antd';
import useForm from 'antd/lib/form/hooks/useForm';
import { ApplySchema } from './apply-schema-form';
import { HButton } from '../../../../../shared/common-form-elements/h-confirmation-button';
import { HForm } from '../../../../../../schema-form/h-form';
import { useHTranslation } from '../../../../../../lib/i18n';

import './apply-modal.module.scss';


interface ApplyModalProps{
  visible: boolean;
  closeModal(): void;
  item: any
}

const ApplyModal = React.memo((props: ApplyModalProps)=> {
  const { visible, closeModal, item } = props;
  const { t } = useHTranslation('recruit');
  const [form] = useForm();


  const onClick = async ()=> {
    form.submit();
    closeModal();
  };

  return (
    <Modal
      title={item?.jobTitle ?? ''}
      visible={visible}
      footer={null}
      onCancel={closeModal}
    >
      <HForm {...{
        form,
        nodeName: 'curriculum-vitaes',
        method: 'post',
        schema: ApplySchema,
        resetIfSuccess: true,
        hideControlButton: true,
        onDataReadyToSubmit: values => {
          return {
            ...values,
            jobId: item?.id,
          };
        },
      }}
      />
      <HButton {...{
        size: 'large',
        className:'apply-modal__button',
        onClick,
      }}>
        {t('jobs.submit')}
      </HButton>
    </Modal>
  );
});
export default ApplyModal;
