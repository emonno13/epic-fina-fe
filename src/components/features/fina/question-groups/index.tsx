import { HFeature, HTable } from '@schema-form/features';
import { useClearDocumentDetail } from '@schema-form/features/hooks';
import {
  useDocumentDetail,
  useIsNewDocument,
} from '@schema-form/features/hooks/document-detail-hooks';
import { CreateModalUpdateDrawerPanel } from '@schema-form/features/panels';
import { HSearchFormWithCreateButton } from '@schema-form/features/search-form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import QuestionGroupCreateOrUpdate from './question-groups-detail.screen';
import {
  QUESTION_GROUP_TYPE,
  QuestionGroupsProvider,
  useQuestionGroupsContext,
} from './question-groups-provider';
import { QuestionGroupsTableSchema } from './question-groups.table-schema';

import { CreateGeneralQuestionFooter } from './common/create-general-question-form';

const QuestionGroups = ({ type }) => {
  const { questionGroupType } = useQuestionGroupsContext();
  const { query } = useRouter();
  const isCreateNew = useIsNewDocument();
  const clearDocument = useClearDocumentDetail();

  const questionGroup = useDocumentDetail();

  useEffect(() => {
    if (!query?.documentId) clearDocument();
  }, [query?.documentId]);

  return (
    <>
      <HSearchFormWithCreateButton hiddenFields={{ type }} />

      {/* CREATE NEW QUESTION GROUP */}
      {isCreateNew && (
        <CreateModalUpdateDrawerPanel
          width={650}
          footer={
            questionGroupType === QUESTION_GROUP_TYPE.NORMAL ? undefined : (
              <CreateGeneralQuestionFooter />
            )
          }
        >
          <QuestionGroupCreateOrUpdate />
        </CreateModalUpdateDrawerPanel>
      )}

      {/* EDIT QUESTION GROUP */}
      {!isCreateNew && (
        <CreateModalUpdateDrawerPanel
          width={650}
          footer={
            questionGroup?.questionGroupType !== 'GENERAL' ? undefined : (
              <CreateGeneralQuestionFooter />
            )
          }
        >
          <QuestionGroupCreateOrUpdate />
        </CreateModalUpdateDrawerPanel>
      )}

      <HTable schema={QuestionGroupsTableSchema} />
    </>
  );
};

const QuestionGroupsWrapper = ({ type }) => {
  return (
    <HFeature
      {...{
        featureId: 'question-groups',
        nodeName: 'question-groups',
      }}
    >
      <QuestionGroupsProvider>
        <QuestionGroups type={type} />
      </QuestionGroupsProvider>
    </HFeature>
  );
};
export default QuestionGroupsWrapper;
