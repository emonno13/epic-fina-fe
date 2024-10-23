import IntroHome from './intro-home';
import CareerOpportunities from './career-opportunities';
import Benefit from './benefit';
import RecruitmentProcess from './recruitment-process';
import Register from './register';
import Citation from './citation';
import ConnectFina from './connect-fina';
import SearchHome from '../components/home/search-home';

const RecruitHome = () => {
  return (
    <>
      <IntroHome />
      <SearchHome />
      <CareerOpportunities />
      <Benefit />
      <RecruitmentProcess />
      <Register />
      <Citation />
      <ConnectFina />
    </>
  );
};

export default RecruitHome;
