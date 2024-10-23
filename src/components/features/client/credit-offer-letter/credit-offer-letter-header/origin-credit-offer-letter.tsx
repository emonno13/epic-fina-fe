import React from 'react';
import { HeaderShape, HeaderShapeMobile } from 'icons';
import { ORIGIN_ORG_CODE } from './constants';
import OrgInformationDetail from './org-information-detail';
import CreditOfferLetterContainer from '../credit-offer-letter-container';

const OriginCreditOfferLetter = () => {
  return (
    <div id="intro" className="origin-credit-offer-letter" >
      <div className="banner">
        <CreditOfferLetterContainer className="small">
          <div className="content">
            <HeaderShape className="icon-shape"/>
            <HeaderShapeMobile className="icon-shape icon-shape-mobile"/>
            <div className="slogan">
							FINA - Cố vấn tài chính <br /> của riêng bạn
            </div>
          </div>
        </CreditOfferLetterContainer>
      </div>
      <div className="org-info">
        <CreditOfferLetterContainer className="small">
          <div className="title">
            <p className="welcome">Báo cáo này phát hành bởi FINA MORTGAGE ADVISORY</p>
            <p className="org-name">Công ty Cổ phần Dịch vụ Tài chính Bất động sản Tulip</p>
          </div>
          <OrgInformationDetail orgCode={ORIGIN_ORG_CODE} />
        </CreditOfferLetterContainer>
      </div>
    </div>
  );
};

export default OriginCreditOfferLetter;
