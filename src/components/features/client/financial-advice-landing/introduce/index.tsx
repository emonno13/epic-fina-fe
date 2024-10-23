/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'antd';

import './introduce.module.scss';

const introduceContents = [
  'Cung cấp tổng quát <span class="text-financial-advice-hight-light">Danh mục tài sản</span> và <span class="text-financial-advice-hight-light">tỷ lệ phân bổ </span> giữa các lớp tài sản',
  'Giúp giải đáp cụ thể loại Bất động sản <span  class="text-financial-advice-hight-light">nên mua? Mua ở đâu? Thời điểm mua?</span>',
  'Có nên vay và vay ở đâu để có lãi suất tốt nhất',
  'Cung cấp giỏ hàng với đa dạng lựa chọn đã được sàng lọc',
  '<span class="text-financial-advice-hight-light">Giảm thiểu các rủi ro</span> và <span class="text-financial-advice-hight-light">tiết kiệm thời gian</span> cho khách hàng',
];

const FinancialAdviceIntroduce = () => {
  return (
    <div id="introduce" className="financial-advice-introduce">
      <div className="financial-advice-container">
        <Row>
          <Col {...{ xs: 24, sm:24, md: 12, lg: 11 }}>
            <div className="financial-advice-introduce-img">
              <img src={'/assets/images/image-introduce-financial-advice.png'} />
            </div>
          </Col>
          <Col {...{ xs: 24, sm:24, md: 12, lg: 13 }}>
            <div className="financial-advice-introduce-right">
              {introduceContents?.map((introduce, index) => (
                <div key={index} className="financial-advice-introduce-description">
                  <span className="dot" />
                  <div dangerouslySetInnerHTML={{ __html: introduce }} className="financial-advice-introduce-text"/>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FinancialAdviceIntroduce;
