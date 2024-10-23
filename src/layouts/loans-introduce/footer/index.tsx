/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'antd';
import LoansIntroduceFooterContact from './footer.contact';
import LoansIntroduceFooterAppLinks from './footer-app-links';
import { URL_SOCIAL_NETWORK } from '../constants';

import './footer.module.scss';

const ClientLoansIntroduceFooter = () => {
  return (
    <div className="loans-introduce-container">
      <img src="/assets/images/icons/ic_logo_fina_text.svg" alt="ic_logo_fina_text" className="logo" />

      <Row className="loans-introduce-footer">
        <Col {...{ xs: 24, sm: 24, md:12, lg: 10 }}>
          <LoansIntroduceFooterContact />
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
          <LoansIntroduceFooterAppLinks />
        </Col>
      </Row>
    </div>
  );
};

export default ClientLoansIntroduceFooter;
