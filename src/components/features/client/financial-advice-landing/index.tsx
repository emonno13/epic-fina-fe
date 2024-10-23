import FinancialAdviceConsultation30Minute from './consultation-30-minute';
import FinancialAdviceExclusiveOffer from './exclusive-offer';
import FinancialAdviceBanner from './financial-advice-banner';
import FinancialAdviceFindSolution from './find-solution';
import FinancialAdviceIntroduce from './introduce';
import Process9Step from './process-9-step';
import FinancialAdviceReceiveInformation from './receive-information';
import FinancialAdviceTeamOfExperts from './team-of-experts';

const FinancialAdvicePage = () => {
  return (
    <>
      <FinancialAdviceBanner />
      <FinancialAdviceConsultation30Minute />
      <FinancialAdviceIntroduce />
      <FinancialAdviceExclusiveOffer />
      <Process9Step />
      <FinancialAdviceTeamOfExperts/>
      <FinancialAdviceFindSolution />
      <FinancialAdviceReceiveInformation />
    </>
  );
};

export default FinancialAdvicePage;
