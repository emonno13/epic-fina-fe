import { HFeature, HTable } from '@schema-form/features';
import { HFeatureForm } from '../../../schema-form/features/forms/h-feature-form';
import { useDetailTitleDefault } from '../../../schema-form/features/hooks/document-detail-hooks';
import { HDocumentModalPanel } from '../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../schema-form/features/search-form';
import { TemplateNotificationDetailSchema } from './detail-schema-form';
import { TemplateResultSchema } from './template-result-schema';

export default () => {
  const defaultTitleWithModel = useDetailTitleDefault();

  return (
    <HFeature
      {...{
        featureId: 'templates',
        nodeName: 'templates',
      }}
    >
      <HSearchFormWithCreateButton />
      <HDocumentModalPanel width={'70%'}>
        <HFeatureForm
          {...{
            schema: TemplateNotificationDetailSchema,
          }}
        />
      </HDocumentModalPanel>
      <HTable schema={TemplateResultSchema} />
    </HFeature>
  );
};
