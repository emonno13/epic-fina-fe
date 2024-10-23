/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'antd';
import FinancialAdviceFooterContact from './footer.contact';
import FinancialAdviceFooterAppLinks from './footer-app-links';
import { URL_SOCIAL_NETWORK } from '../constants';

import './footer.module.scss';

const ClientFinancialAdviceFooter = () => {
  return (
    <div className="financial-advice-container">
      <img src="/assets/images/icons/ic_logo_fina_text.svg" alt="ic_logo_fina_text" className="logo" />

      <Row className="financial-advice-footer">
        <Col {...{ xs: 24, sm: 24, md:12, lg: 10 }}>
          <FinancialAdviceFooterContact />
        </Col>

        <Col {...{ xs: 24, sm: 24, md:12, lg: 7 }}>
          <h2 className="title-footer">
						Kênh thông tin
            <div className="line-header"></div>
          </h2>
          <div className="footer-social-network">
            {URL_SOCIAL_NETWORK?.map(social => (
              <a href={social?.url} target="_blank" rel="noreferrer" key={social?.url}>
                {social?.icon}
              </a>
            ))}
          </div>
        </Col>

        <Col {...{ xs: 24, sm: 24, md:12, lg: 5 }}>
          <FinancialAdviceFooterAppLinks />
        </Col>
      </Row>
    </div>
  );
};

export default ClientFinancialAdviceFooter;
