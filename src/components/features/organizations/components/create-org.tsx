import { useTranslation } from 'next-i18next';
import { useDocumentDetail } from '../../../../schema-form/features/hooks';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { OrgDetailSchemaForm } from '../detail-schemas/org-detail-schema-form';
import { HDocumentModalPanel } from '../../../../schema-form/features/panels';

export const CreateOrganization = (props: any) => {
  const { hiddenValues, initialValues } = props;
  const documentDetail = useDocumentDetail();
  const { t } = useTranslation('admin-common');
  if (documentDetail?.id) {
    return null;
  }

  return (
    <HDocumentModalPanel title={t('Create a new Organization')} className="drawer-no-padding-top">
      <HFeatureForm {...{
        schema: OrgDetailSchemaForm,
        hiddenValues,
        showResetButton: true,
        initialValues,
      }}/>
    </HDocumentModalPanel>
  );
};