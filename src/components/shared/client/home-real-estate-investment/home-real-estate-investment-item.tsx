/* eslint-disable @next/next/no-img-element */
import { PROPERTIES_TYPE } from '@components/features/fina/properties/contansr';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import { HomeIconSvg, MapIconSvg } from '@icons';
import { NumberUtils } from '@lib/utils/number';

export const HomeRealEstateInvestmentItem = ({ realEstate }) => {
  const isApartment = realEstate?.type === PROPERTIES_TYPE?.APARTMENT;

  return (
    <div key={realEstate?.id} className="home-real-estate-investment-item">
      <div className="home-real-estate-investment-item-header">
        <img src={realEstate?.images?.[0]?.url} alt={realEstate?.name} />
        <span
          className={`home-real-estate-investment-item-header-type ${isApartment ? 'type-apartment' : ''}`}
        >
          {isApartment ? 'Chung cư' : 'Nhà mặt đất'}
        </span>
      </div>
      <div className="home-real-estate-investment-item-content">
        <h2 className="home-real-estate-investment-item-content-title">
          {realEstate?.name}
        </h2>
        <p
          className="home-real-estate-investment-item-content-desc"
          dangerouslySetInnerHTML={{ __html: realEstate?.description }}
        />

        <div className="home-real-estate-investment-item-content-wrapper">
          <div className="home-real-estate-investment-item-content-wrapper-item">
            <div className="home-real-estate-investment-item-content-wrapper-label">
              Giá dự kiến
            </div>
            <div className="home-real-estate-investment-item-content-wrapper-value">
              {realEstate?.expectedPrice
                ? NumberUtils.format(realEstate?.expectedPrice || 0) + 'đ'
                : '_'}{' '}
            </div>
          </div>
          <div className="home-real-estate-investment-item-content-wrapper-item">
            <div className="home-real-estate-investment-item-content-wrapper-label">
              Loại bất động sản
            </div>
            <div className="home-real-estate-investment-item-content-wrapper-value">
              {isApartment ? 'Chung cư' : 'Nhà mặt đất'}
            </div>
          </div>
        </div>
        <div className="home-real-estate-investment-item-content-wrapper">
          <div className="home-real-estate-investment-item-content-wrapper-item">
            <div className="home-real-estate-investment-item-content-wrapper-label">
              Mã căn hộ
            </div>
            <div className="home-real-estate-investment-item-content-wrapper-value">
              <HomeIconSvg />
              {realEstate?.apartmentCode}
            </div>
          </div>
          <div className="home-real-estate-investment-item-content-wrapper-item">
            <div className="home-real-estate-investment-item-content-wrapper-label">
              Vị trí
            </div>
            <div
              className="home-real-estate-investment-item-content-wrapper-value"
              title={realEstate?.address}
            >
              <MapIconSvg />
              {realEstate?.address || '_'}
            </div>
          </div>
        </div>

        <div className="home-real-estate-investment-item-content-org">
          <img src={realEstate?.org?.avatar?.url} alt={realEstate?.org?.name} />
          <span>{realEstate?.org?.name}</span>
        </div>

        <div className="home-real-estate-investment-item-content-view-detail">
          <HButton
            block
            type="link"
            href={`/danh-sach-san-pham-bat-dong-san/${realEstate?.slug}`}
          >
            Xem chi tiết
          </HButton>
        </div>
      </div>
    </div>
  );
};
