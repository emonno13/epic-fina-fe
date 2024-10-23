/* eslint-disable @next/next/no-img-element */
import {
  ClientFooterFbIcon,
  ClientFooterGmailIcon,
  ClientFooterYoutubeIcon,
  ClientFooterZaloIcon,
} from '@icons';
import { endpoints } from '@lib/networks/endpoints';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import CreditOfferLetterBodyContainer from '../credit-offer-letter-body-container';
import CreditOfferLetterContainer from '../credit-offer-letter-container';
import { ORIGIN_ORG_CODE } from '../credit-offer-letter-header/constants';
import OrgInformationDetail from '../credit-offer-letter-header/org-information-detail';

import './credit-offer-letter-footer-bottom.module.scss';

const CreditOfferLetterFooterBottom = () => {
  const [org, setOrg] = useState<any>();
  const URL_SOCIAL_NETWORK = {
    facebook: 'https://www.facebook.com/finavietnam',
    zalo: 'https://zalo.me/',
    youtube: 'https://www.youtube.com/channel/UCdetskOW9FS3oZwBvEfKHyg',
  };

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        endpoint: endpoints.generateNodeEndpoint(
          'organizations/public/suggestion',
        ),
        hiddenValues: { filter: { where: { code: ORIGIN_ORG_CODE } } },
        onGotSuccess: (orgs) => setOrg(orgs.length && orgs[0]),
      },
    );
  }, []);

  return (
    <CreditOfferLetterBodyContainer>
      <div className="footer-bottom">
        <CreditOfferLetterContainer className="small">
          <img
            src="/assets/images/icons/ic_logo_fina_text.svg"
            alt="ic_logo_fina_text"
            className="logo"
          />
          <Row>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 14 }}>
              <h2 className="title-footer">
                Liên hệ chúng tôi
                <div className="line-header"></div>
              </h2>
              <div className="info-item">
                <img
                  src="/assets/images/icons/ic_letter-template-building.svg"
                  alt="building"
                />
                <p className="info-item__content">{org?.name}</p>
              </div>
              <OrgInformationDetail orgCode={ORIGIN_ORG_CODE} />
            </Col>

            <Col
              {...{ xs: 24, sm: 24, md: 12, lg: 10 }}
              className="footer-right"
            >
              <h2 className="title-footer">
                Kênh thông tin
                <div className="line-header"></div>
              </h2>
              <div className="footer-social-network">
                <a
                  href={URL_SOCIAL_NETWORK.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ClientFooterFbIcon />
                </a>
                <a
                  href={`${URL_SOCIAL_NETWORK.zalo}${(org?.tels && org.tels[0]?.tel.split(' ').join('')) || ''}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ClientFooterZaloIcon />
                </a>
                <a
                  href={URL_SOCIAL_NETWORK.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ClientFooterYoutubeIcon />
                </a>
                <a
                  href={`mailto:${(org?.emails && org.emails[0]?.email) || ''}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ClientFooterGmailIcon />
                </a>
              </div>
            </Col>
          </Row>
        </CreditOfferLetterContainer>
      </div>
    </CreditOfferLetterBodyContainer>
  );
};

export default CreditOfferLetterFooterBottom;
