import CreditOfferLetter from '@components/features/client/credit-offer-letter';
import ClientFeatureProvider from '@schema-form/client-features/providers/client-feature-provider';
import { PageUtils } from '@schema-form/utils/page-utils';
import { useEffect, useState } from 'react';

const CreditOfferLetterPage = (props) => {
  const { pageData } = props;
  const [taskDataDetail, setTaskDataDetail] = useState<any>();

  useEffect(() => {
    document.body.classList.add('credit-offer-letter-page');
  }, []);

  return (
    <ClientFeatureProvider
      {...{
        initDocumentDetail: taskDataDetail || pageData,
      }}
    >
      <CreditOfferLetter />
    </ClientFeatureProvider>
  );
};

export const getServerSideProps = async ({ locale, query }) => {
  const { taskId } = query;

  return {
    props: {
      ...(await PageUtils.getServerSideProps({
        locale,
        nodeName: 'tasks/public',
        documentId: taskId,
        withRelations: [
          'assignee',
          {
            relation: 'surveyResult',
            scope: {
              include: [{ relation: 'questionGroup' }],
            },
          },
          'user',
        ],
      })),
    },
  };
};

export default CreditOfferLetterPage;
