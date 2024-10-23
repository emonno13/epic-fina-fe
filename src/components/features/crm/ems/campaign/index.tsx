import { CampaignTableSchema } from './campaign-table-schema';
import { HFeature, HTable } from '../../../../../schema-form/features';
import { HSearchFormWithCreateButton } from '../../../../../schema-form/features/search-form';

export default () => {
  return (
    <HFeature
      {...{
        featureId: 'campaign',
        documentIdName: 'campaignId',
      }}>
      <HSearchFormWithCreateButton {...{
        hiddenCreateButton: true,
        // advancedSchema: () => CommissionAdvanceFormSchema({type}),
        hiddenValues: {
          filter: {
            order: 'createTime DESC',
          },
        },
        resetIfSuccess: false,
      }}/>

      <HTable schema={CampaignTableSchema}/>
    </HFeature>
  );
};
