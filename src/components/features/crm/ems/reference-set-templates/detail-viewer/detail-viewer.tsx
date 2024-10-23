import { useEffect, useState } from 'react';

import { ReferenceSetTemplateSchemaForm } from './detail-schema-form';
import { useHTranslation } from '../../../../../../lib/i18n';
import { useDocumentDetail } from '../../../../../../schema-form/features/hooks';
import { HFeatureForm } from '../../../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../../../schema-form/features/panels';

import { UserSelectionModal } from '../user-selection-modal/user-selection-modal';

export const ReferenceSetTemplateDetailViewer = () => {
  const { t } = useHTranslation('admin-common');
  const referenceSetTemplate = useDocumentDetail();
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataMapping, setDataMapping] = useState([]);
  const [userRelations, setUserRelations] = useState([]);

  useEffect(() => {
    const mappingKeys = referenceSetTemplate?.mappingKeys || [];
    setDataMapping(mappingKeys);

    const relations: any = [];

    mappingKeys.forEach((item: any) => {
      const nameSplit = item?.value?.split('.') || [];
      if (nameSplit.length > 1) {
        relations.push(nameSplit[0]);
      }
    });

    setUserRelations(relations);
  }, [referenceSetTemplate]);

  return (
    <div>
      <HDocumentDrawerPanel title={t(!referenceSetTemplate?.id ? 'Thêm mới' : 'Chỉnh sửa')}>
        <HFeatureForm {...{
          schema: ReferenceSetTemplateSchemaForm,
          hideSubmitAndContinueButton: true,
          resetIfSuccess: false,
          transport: {
            setVisibleModal,
            dataMapping,
          },
        }}/>
      </HDocumentDrawerPanel>

      {visibleModal && <UserSelectionModal {...{
        visibleModal,
        userRelations,
        onSelectedUser: (user) => {
          setVisibleModal(false);
          const data = [...dataMapping];

          data.forEach((item: any) => {
            const keys = item?.value?.split('.') || [];
            if (keys.length > 0) {
              const existedValue = keys.reduce((a, v) => a?.[v] || '', user);
              item.result = existedValue || '';
            }
          });

          setDataMapping(data);
        },
      }}/>}
    </div>

  );
};
