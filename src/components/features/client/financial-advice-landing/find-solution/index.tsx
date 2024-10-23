/* eslint-disable @next/next/no-img-element */
import { RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

import './find-solution.module.scss';

const dataSolution = [
  { title: 'Giải pháp vay', link: '/vay-mua-nha', contents: ['Lãi suất tốt nhất', 'Tỷ lệ giải ngân hơn 98%', 'Không lích kích hồ sơ'] },
  { title: 'Giải pháp Bất động sản', link: '/danh-sach-bat-dong-san', contents: ['Đảm bảo pháp lý', 'Đảm bảo vùng giá mua - bán', 'Hỗ trợ hồ sơ mua-bán'] },
  { title: 'Giải pháp Thẩm định', link: '/calculators-toolkit', contents: ['Thẩm định sơ bộ giá trị BĐS', 'Thẩm định khả năng vay vốn của khách hàng', 'Thẩm định giá chính thức từ đơn vị định giá'] },
];

const FinancialAdviceFindSolution = () => {
  return (
    <div id="find-solution" className="financial-advice-find-solution">
      <div className="financial-advice-container">
        <h1 className="financial-advice-find-solution-title">TÌM RA GIẢI PHÁP <b>-</b> <span>MUA NHÀ ĐƯỢC NGAY</span></h1>
        <Row gutter={[30, 30]}>
          {dataSolution?.map((solution, i) => (
            <Col {...{ xs: 24, sm:24, md: 8, lg: 8 }} key={i}>
              <div className="financial-advice-find-solution-item">
                <h2 className="financial-advice-find-solution-item-title">{solution?.title}</h2>
                {solution?.contents?.map(content => (
                  <p key={content} className="financial-advice-find-solution-item-desc">- {content}</p>
                ))}

                <a href={solution?.link} className="financial-advice-find-solution-item-link" target="_blank" rel="noopener noreferrer">Xem chi tiết <RightOutlined /></a>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FinancialAdviceFindSolution;
