import { GreetingFileDetailSchemaForm } from './detail-schema-form';
import { HDocumentModalPanel } from '../../../../../schema-form/features/panels';
import { HFeatureForm } from '../../../../../schema-form/features/forms/h-feature-form';
import { useDocumentDetail } from '../../../../../schema-form/features/hooks';
import { useHTranslation } from '../../../../../lib/i18n';

const GreetingFileDetail = (props) => {
  const { t } = useHTranslation('admin-common');
  const groupDetail = useDocumentDetail();

  return (
    <HDocumentModalPanel title={t(!groupDetail?.id ? 'Thêm mới' : 'Chỉnh sửa')} width={'40%'}>
      <HFeatureForm {...{
        onDataReadyToSubmit: (data) => {
          if (data?.file) {
            data.fileId = data.file.id;
            delete data.file;
          }

          return {
            ...data,
          };
        },
        schema: GreetingFileDetailSchemaForm,
        hideSubmitAndContinueButton: true,
      }}/>
    </HDocumentModalPanel>
  );
};

export default GreetingFileDetail;
