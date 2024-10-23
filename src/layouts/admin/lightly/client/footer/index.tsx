import { Col, Row } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import ClientFooterAppLinks from './client-footer.app-links';
import ClientFooterContactUs from './client-footer.contact-us';
import ClientFooterLoanLinks from './client-footer.loan-links';
import ClientFooterLogoBox from './client-footer.logo-box';

const ClientFooter = () => {
  return (
    <Footer className="ui-lightly-client-footer">
      <div className="max-w-1100 m-auto">
        <div className="ui-lightly-client-footer__wrapper">
          <ClientFooterLogoBox />
          <Row gutter={[17, 17]}>
            <Col {...{ xs: 24, sm: 24, md: 10 }}>
              <ClientFooterContactUs />
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 8 }}>
              <ClientFooterLoanLinks />
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 6 }}>
              <ClientFooterAppLinks />
            </Col>
          </Row>
        </div>
      </div>
    </Footer>
  );
};

export default ClientFooter;
