/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'antd';

import './consultation-30-minute.module.scss';

const FinancialAdviceConsultation30Minute = () => {
  return (
    <div id="consultation-30-minute" className="consultation-30-minute">
      <div className="financial-advice-container">
        <h1 className="consultation-30-minute-title">Có gì trong 30 phút tư vấn <span>Tài Chính An Cư</span></h1>

        <Row gutter={[30, 30]} className="consultation-30-minute-row">
          <Col {...{ xs: 24, sm:24, md: 16, lg: 16 }}>
            <iframe src="https://www.youtube.com/embed/49X9qI1g_Vw" allowFullScreen title="Hé lộ một vài phút đặc biệt trong 30 phút tư vấn cùng chuyên gia FIDT" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </Col>
          <Col {...{ xs: 24, sm:24, md: 8, lg: 8 }}>
            <div className="consultation-30-minute-right">
              <h2 className="consultation-30-minute-right-subtitle">TƯ VẤN</h2>
              <h1 className="consultation-30-minute-right-title"><span></span>30 PHÚT</h1>

              <p className="consultation-30-minute-right-desc">
								Trước buổi tư vấn, Financial Planners sẽ trao đổi và ghi nhận một số thông tin sơ khởi về tài chính của bạn. Điều này giúp chúng tôi đưa ra các định hướng tư vấn hiệu quả và sát với nhu cầu của bạn trong buổi tư vấn 30 phút.
              </p>

              <p className="consultation-30-minute-right-note">
								*Toàn bộ thông tin trong video đã được khách hàng đồng ý chia sẻ
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FinancialAdviceConsultation30Minute;
