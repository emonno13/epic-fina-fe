import { ExternalEmailTemplateTableSchema } from './external-email-template-table-schema';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'externalEmailTemplates',
        documentIdName: 'externalEmailTemplateId',
        nodeName: 'external-email-templates',
      }}>
      <HSearchFormWithCreateButton {...{
        hiddenCreateButton: true,
        // advancedSchema: () => CommissionAdvanceFormSchema({type}),
        resetIfSuccess: false,
      }}/>

      <HTable schema={ExternalEmailTemplateTableSchema}/>
    </HFeature>
  );
};
