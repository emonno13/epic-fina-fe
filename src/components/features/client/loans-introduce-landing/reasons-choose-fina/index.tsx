/* eslint-disable @next/next/no-img-element */
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import HScrollAnimation from '@components/shared/common/h-scroll-animation';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { REASONS_CHOOSE_FINA } from '../constants';

import './reasons-choose-fina.module.scss';

const ReasonsChooseFina = () => {
  const { locale } = useRouter();

  return (
    <div id="reason-choose-fina" className="reason-choose-fina">
      <HScrollAnimation>
        <div className="loans-introduce-container">
          <Row gutter={[24, 24]} className="items-center">
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 13 }}>
              <h4 className="reason-choose-fina-subheader">Vì sao FINA</h4>
              <h2 className="reason-choose-fina-header">
                LÀ LỰA CHỌN TỐI ƯU CHO BẠN?
              </h2>

              <HButton
                className="more-information-btn"
                type="link"
                href={`/${locale}/loans-introduce#register`}
              >
                Tìm hiểu thêm
              </HButton>
            </Col>
            <Col {...{ xs: 24, sm: 24, md: 12, lg: 11 }}>
              <div className="reason-choose-fina-content">
                <Row gutter={[32, 32]}>
                  {REASONS_CHOOSE_FINA?.map((el, index) => (
                    <Col {...{ xs: 24, sm: 24, md: 12, lg: 12 }} key={index}>
                      <div className="reason-choose-fina-content-item">
                        <span className="reason-icon">{el?.icon}</span>
                        <h4>{el?.value}</h4>
                        <p>{el?.description}</p>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </HScrollAnimation>
    </div>
  );
};

export default ReasonsChooseFina;
