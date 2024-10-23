import { useIsMobile } from '@lib/hooks/use-media';
import { Col, Row } from 'antd';
import { PlayIconGray } from 'icons';

import './process-9-step.module.scss';

const dataProcess = [
  'Lắng nghe nhu cầu và tìm hiểu tình hình tài chính để hiểu rõ vấn đề của khách hàng',
  'Sắp xếp lịch tư vấn cho khách hàng với Chuyên gia tư vấn tài chính (qua Zoom)',
  'Tư vấn Tài Chính An cư 30 phút',
  'Chia sẻ thông tin về thị trường, khảo sát Bất động sản mà khách hàng quan tâm',
  'Trao tay giải pháp Vay hoặc Rổ hàng Bất động sản phù hợp với nhu cầu của khách',
  'Kiểm tra giá, thương lượng giá với chủ Bất động sản',
  'Thẩm định và tư vấn pháp lý Bất động sản theo yêu cầu (nếu có)',
  'FINA triển khai phương án vay (nếu có)',
  'Hỗ trợ thực hiện hợp đồng Mua-Bán Bất động sản (nếu cần)',
];

const Process9Step = () => {
  const isMobile = useIsMobile();

  return (
    <div id="process" className="financial-advice-process-9-step">
      <div className="financial-advice-container">
        <div className="financial-advice-process-9-step-wrapper">
          <h2 className="financial-advice-process-9-step-title">
            Quy trình 9 bước <br />
            <span>giúp bạn an cư </span>
          </h2>

          <Row
            gutter={isMobile ? [30, 20] : [50, 50]}
            className="financial-advice-process-9-step-list"
          >
            {dataProcess?.map((process, i) => (
              <Col {...{ xs: 24, sm: 24, md: 8, lg: 8 }} key={i}>
                <div className={`process-item process-item-${i + 1}`}>
                  <span className="process-item-step">{i + 1}</span>
                  <span className="process-item-content">{process}</span>
                  <PlayIconGray />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Process9Step;
