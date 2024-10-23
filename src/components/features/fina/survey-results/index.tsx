import { HFeature, HTable } from '@schema-form/features';
import { HDocumentModalPanel } from '@schema-form/features/panels';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import SurveyResultsDetailScreen from './survey-results.detail-screen';
import { SurveyResultsTableSchema } from './survey-results.table-schema';

import './survey-results.module.scss';

interface SurveyResultsProps {
  questionGroup?: any;
}

const SurveyResults = ({ questionGroup = {} }: SurveyResultsProps) => {
  return (
    <HFeature
      {...{
        featureId: 'survey-results',
        nodeName: 'survey-results',
        documentIdName: 'surveyResultId',
        documentRelations: ['customer', 'questionGroup'],
      }}
    >
      <HSearchFormHiddenAble
        {...{
          withRelations: ['customer', 'questionGroup'],
          hiddenFields: { questionGroupId: questionGroup?.id },
        }}
      />
      <HDocumentModalPanel>
        <SurveyResultsDetailScreen {...{ questionGroup }} />
      </HDocumentModalPanel>
      <HTable
        scroll={{ y: 200 }}
        size={'small'}
        schema={SurveyResultsTableSchema}
      />
    </HFeature>
  );
};

export default SurveyResults;
