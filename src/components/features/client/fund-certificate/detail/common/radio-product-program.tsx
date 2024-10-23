import { ConverterUtils } from '@lib/converter';
import { Popover, Radio } from 'antd';
import { ContentFee } from '../client-fund-certificate-detail';
import {
  useSelectedProductProgram,
  useSetSelectedProductProgram,
} from '../hooks';

import './radio-product-program.module.scss';

export const RadioProductProgram = ({ productPrograms = [] }) => {
  const selectedProductProgram = useSelectedProductProgram();
  const setSelectedProductProgram = useSetSelectedProductProgram();
  return (
    <Radio.Group
      onChange={(e) => setSelectedProductProgram(e?.target?.value)}
      defaultValue={selectedProductProgram}
      className="radio-programs"
    >
      {productPrograms.map((productProgram: any) => (
        <Radio
          key={productProgram?.id}
          className="radio-program"
          value={productProgram?.id}
        >
          <b>{productProgram?.name}</b>
          <div className="buy-min-wrap">
            <p className="buy-label">Giá trị đăng ký mua tối thiểu</p>
            <p className="buy-min">
              {ConverterUtils.formatNumber(productProgram?.buyMinValue)}
              <sup>đ</sup>
            </p>
          </div>

          {selectedProductProgram == productProgram?.id && (
            <div className="fund-detail__left--content__programs-item">
              <div className="fund-detail__left--content__programs-item-wrapper">
                <Popover
                  content={
                    <ContentFee type={'BUY'} fees={productProgram?.fees} />
                  }
                  overlayClassName="fund-content-fee-popover"
                >
                  <span className="item-label">Phí mua</span>
                </Popover>
                <span className="item-value">Theo đổi theo giá mua</span>
              </div>
              <div className="fund-detail__left--content__programs-item-wrapper">
                <Popover
                  content={
                    <ContentFee type={'SELL'} fees={productProgram?.fees} />
                  }
                  overlayClassName="fund-content-fee-popover"
                >
                  <span className="item-label">Phí bán</span>
                </Popover>
                <span className="item-value">
                  Thay đổi theo thời gian nắm giữ
                </span>
              </div>
            </div>
          )}
        </Radio>
      ))}
    </Radio.Group>
  );
};
