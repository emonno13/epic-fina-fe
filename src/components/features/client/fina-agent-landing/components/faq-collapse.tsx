import { Collapse } from 'antd';
import React from 'react';
import { ArrowDownSvg, ArrowUpSvg } from '../icons';

import '../css/faq.module.scss';

interface Props {
  question: string,
  content: string,
  index: number
}

const { Panel } = Collapse;


const FaqCollapse = React.memo(({ question, content, index }: Props) => {
  return (
    <div className="faq-collapse-item">
      <Collapse {...{
        expandIconPosition: 'right',
        expandIcon: (props) => {
          const { isActive } = props;
          if (isActive) {
            return (
              <ArrowUpSvg />
            );
          }
          return (
            <ArrowDownSvg />
          );
        },
      }}>
        <Panel key={1} header={question}>
          <div className="faq-collapse-content">
            {index === 2 && <>
              <p style={{  fontFamily: 'SFPD-bold' }}>Vay mua mua nhà:</p>
              <p style={{ paddingLeft: '15px' }}>- Vay mua nhà có sổ</p>
              <p style={{ paddingLeft: '15px' }}>- Vay mua nhà dự án</p>
              <p style={{ paddingLeft: '15px' }}>- Tái cơ cấu khoản vay</p>
              <p style={{  fontFamily: 'SFPD-bold' }}>Sản phẩm đầu tư:</p>
              <p style={{ paddingLeft: '15px' }}>	- Bất động sản</p>
              <p style={{ paddingLeft: '15px' }}>- Trái phiếu</p>
              <p style={{ paddingLeft: '15px' }}>- Chứng chỉ quỹ</p>
              <p style={{  fontFamily: 'SFPD-bold' }}>Sản phẩm bảo hiểm:</p>
              <p style={{ paddingLeft: '15px' }}>- Bảo hiểm bất động sản</p>
              <p style={{ paddingLeft: '15px' }}>- Bảo hiểm con người</p>
              <p style={{ paddingLeft: '15px' }}>- Bảo hiểm khác</p>
            </>}
            <p>{content}</p>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});

export default FaqCollapse;
