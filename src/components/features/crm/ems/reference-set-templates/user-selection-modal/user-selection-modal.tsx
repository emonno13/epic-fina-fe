import { useEffect, useState } from 'react';

import { useHTranslation } from '../../../../../../lib/i18n';
import { HModal } from '../../../../../shared/common/h-modal';
import { HForm } from '../../../../../../schema-form/h-form';
import { SelectUtils } from '../../../../../shared/common-form-elements/select/Utils';
import { ConverterUtils } from '../../../../../../lib/converter';

export const UserSelectionModal = (props) => {
  const { t } = useHTranslation('admin-common');
  const { visibleModal, onSelectedUser, userRelations = [] } = props;
  const [showModal, setShowModal] = useState(!!visibleModal);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    setShowModal(visibleModal);
  }, [visibleModal]);

  return (
    <HModal{...{
      title: t('Choose an user'),
      visible: showModal,
      onCancel: () => {
        onSelectedUser(null);
        setShowModal(false);
      },
      centered: true,
      width: '450px',
      onOk: () => {
        setShowModal(false);
        onSelectedUser(selectedUser);
      },
      destroyOnClose: true,
    }}>
      <HForm
        {...{
          hideControlButton: true,
          hideSubmitAndContinueButton: true,
          schema: () => [
            SelectUtils.createUserSelectionElement({
              label: false,
              name: 'userId',
              colProps: { xs: 24, sm: 24, md: 24 },
              componentProps: {
                placeholder: t('Test user'),
                mode: 'single',
                withRelations: userRelations,
                onChangeSelected: setSelectedUser,
                optionsConverter: (document) => {
                  document.label = `${ConverterUtils.getFullNameUser(document)} ${document?.code ? `- ${document?.code}` : ''}`;
                  return document;
                },
              },
            }),
          ],
        }}
      />
    </HModal>
  );
};
