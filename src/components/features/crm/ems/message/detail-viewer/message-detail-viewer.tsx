import { useState } from 'react';
import { MessageDetailSchemaForm } from './message-detail-schema-form';
import { SendMessageModal } from './send-message-modal';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../../../schema-form/features/panels';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { useHTranslation } from '../../../../../../lib/i18n';
import { MESSAGE_TYPE } from '../constants';

export const MessageDetailViewer = () => {
  const { t } = useHTranslation('admin-common');
  const message = useDocumentDetail();
  const [visible, setVisible] = useState(false);
  const [currentMessageType, setCurrentMessageType] = useState( MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL);

  return (
    <div>
      <HDocumentDrawerPanel {...{
        title: message?.id ? t('Edit') : t('Create new', { vn: 'Tạo mới' }),
        className: 'drawer-no-padding-top',
      }}>
        <HFeatureForm
          {...{
            schema: MessageDetailSchemaForm,
            transport: {
              messageType: message?.type || MESSAGE_TYPE.INTERNAL_SERVICE_EMAIL,
              setVisible,
              currentMessageType,
              setCurrentMessageType,
            },
          }}>
        </HFeatureForm>

      </HDocumentDrawerPanel>

      {visible && <SendMessageModal {...{
        visible,
        setVisible,
        currentMessageType,
      }} />}
    </div>

  );
};
