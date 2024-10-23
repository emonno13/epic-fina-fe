/* eslint-disable @next/next/no-img-element */
import { mappingTypeOfFund } from '@components/features/fina/products/fund/constants';
import { ConverterUtils } from '@lib/converter';
import { IconDown, IconUp } from './constants';

const DetailAsset = ({ data, currentNav, navInvested, type }) => {
  const price = data?.volume * currentNav - data?.volume * navInvested;
  const interest = (price / (data?.volume * navInvested)) * 100;

  return (
    <>
      <div className="detail-asset-modal-header">
        <div className="detail-asset-modal-header-left">
          <img src={data?.product?.org?.avatar?.url} />
          <div>
            <h4>{data?.productProgramName}</h4>
            <div className="detail-asset-modal-header-product-name">
              {data?.productName}
            </div>
          </div>
        </div>
        <div className="detail-asset-modal-header-right">
          {mappingTypeOfFund[type]}
        </div>
      </div>

      <div className="detail-asset-modal-content">
        <ItemDetailAsset
          label={'Tổng lợi nhuận'}
          value={
            <span
              style={{ color: price > 0 ? 'green' : 'red' }}
              className="total-profit"
            >
              {ConverterUtils.formatNumber(price.toFixed(0))}
              <sup>đ</sup>
            </span>
          }
        />
        <ItemDetailAsset
          label={'Tỉ suất lợi nhuận'}
          value={
            <span
              style={{ color: interest > 0 ? 'green' : 'red' }}
              className="percent-icon"
            >
              {ConverterUtils.formatNumber(interest.toFixed(2))}% &nbsp;
              {interest > 0 ? <IconUp /> : <IconDown />}
            </span>
          }
        />
        <ItemDetailAsset
          label={'Số lượng CCQ'}
          value={ConverterUtils.formatNumber(data?.volume)}
        />
        <ItemDetailAsset
          label={'Giá hiện tại'}
          value={
            <span>
              {currentNav
                ? ConverterUtils.formatNumber(currentNav.toFixed(0))
                : '_'}
              <sup>đ</sup>
            </span>
          }
        />
      </div>
    </>
  );
};

export default DetailAsset;

const ItemDetailAsset = ({ label, value }) => {
  return (
    <div className="detail-asset-modal-content-item">
      <div className="detail-asset-modal-content-label">{label}</div>
      <div className="detail-asset-modal-content-value">{value}</div>
    </div>
  );
};
