import React from 'react';
import FinaApp from './fina-app';
import FinaPartners from './fina-partners';
import ReasonsChooseFina from './reasons-choose-fina';
import ListProductFina from './list-product';
import LoanIntroduceCalc from './loans-introduce-calc';
import RateInformation from './rate-infomation';
import RegisterFooter from './register-footer';

const LoansIntroducePage = ({ data }) => {
  return (
    <>
      <RateInformation props={data} />
      <ListProductFina props={data} />
      {/* <ProductDetail props={data} /> */}
      <ReasonsChooseFina />
      <LoanIntroduceCalc />
      <RegisterFooter />
      <FinaPartners />
      <FinaApp />
    </>
  );
};

export default LoansIntroducePage;
