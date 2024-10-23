import { useTranslation } from 'next-i18next';

import { HotlineDetailSchemaForm } from './detail-schema-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';

const HotlineDetail = (props) => {
  const { t } = useTranslation('admin-common');
  const hotlineDetail = useDocumentDetail();

  return (
    <HDocumentModalPanel title={t(!hotlineDetail?.id ? 'Thêm mới' : 'Chỉnh sửa')} width={'40%'}>
      <HFeatureForm {...{
        schema: HotlineDetailSchemaForm,
        hideSubmitAndContinueButton: true,
      }}/>
    </HDocumentModalPanel>
  );
};

export default HotlineDetail;
