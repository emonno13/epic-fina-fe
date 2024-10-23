import { DocumentTemplateResultTableSchema } from './document-template-result-table-schema';
import { TabpaneDocumentTemplateForm } from './tabpane-document-template-form';
import { DocumentTemplateAdvanceFormSchema } from './document-template-advance-form-schema';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';
import { useDetailTitleDefault } from '../../../../schema-form/features/hooks/document-detail-hooks';
import { useHTranslation } from '../../../../lib/i18n';

export default () => {
  const { t } = useHTranslation('admin-common');
  const defaultTitleWithModel = useDetailTitleDefault();
  const relations = [
    'org',
    'clonedFrom',
    'category',
    {
      relation: 'documentTemplateDetails',
      scope: {
        include: [
          {
            relation: 'document',
            scope: {
              include: [{ relation: 'documentCategory' }],
            },
          },
        ],
      },
    },
  ];
  return (
    <HFeature
      {...{
        featureId: 'documentTemplates',
        nodeName: 'document-templates',
      }}>
      <HSearchFormWithCreateButton
        resetIfSuccess={false}
        advancedSchema={DocumentTemplateAdvanceFormSchema}
        withRelations={relations}
      />

      <HDocumentDrawerPanel title={t(defaultTitleWithModel('template'))} footer={null}>
        <TabpaneDocumentTemplateForm/>
      </HDocumentDrawerPanel>

      <HTable schema={DocumentTemplateResultTableSchema}/>
    </HFeature>
  );
};