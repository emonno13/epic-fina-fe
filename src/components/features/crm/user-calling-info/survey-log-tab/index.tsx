import { HFeature, HTable } from '@schema-form/features';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { SurveyLogTableSchema } from './survey-log-tab.table-schema';

const SurveyLogTab = ({ user }) => {
  return (
    <HFeature
      {...{
        featureId: 'survey-logs',
        nodeName: 'survey-results',
      }}
    >
      <HSearchFormWithCreateButton
        withRelations={['customer']}
        hiddenFields={{ customerId: user?.id }}
        className="deals-custom hidden"
        hideControlButton
      />
      <HTable
        scroll={{ y: 200 }}
        size={'small'}
        pagination={{ position: [] }}
        schema={SurveyLogTableSchema()}
      />
    </HFeature>
  );
};

export default SurveyLogTab;
