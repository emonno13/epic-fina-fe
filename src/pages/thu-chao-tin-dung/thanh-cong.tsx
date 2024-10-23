import CreditOfferLetterSuccess from '@components/features/client/credit-offer-letter-success';
import SurveyLayout from '@layouts/survey';
import { PageUtils } from '@schema-form/utils/page-utils';

const CreditOfferLetterSuccessPage = (props) => {
  return <CreditOfferLetterSuccess />;
};

CreditOfferLetterSuccessPage.Layout = (props) => (
  <SurveyLayout
    {...{
      ...props,
      alternateStyle: true,
      style: {
        backgroundColor: '#F2F5F9',
      },
    }}
  />
);

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await PageUtils.getServerSideProps({
        locale,
      })),
    },
  };
};

export default CreditOfferLetterSuccessPage;
