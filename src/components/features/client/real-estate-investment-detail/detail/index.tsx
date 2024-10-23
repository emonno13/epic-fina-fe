/* eslint-disable @next/next/no-img-element */
import {
  getOptionBalconyDirection,
  PROPERTIES_TYPE,
} from '@components/features/fina/properties/contansr';
import HCarousel from '@components/shared/common/h-carousel';
import {
  HomeIconSvg,
  IconBathroom,
  IconDirection,
  IconGridArtboard,
  IconSingleBed,
  MapIconSvg,
} from '@icons';
import { useHTranslation } from '@lib/i18n';
import { useIsAuthenticated } from '@lib/providers/auth';
import { NumberUtils } from '@lib/utils/number';
import { Button } from 'antd';
import { UtilityIcon } from '../../real-estate-investment/client-real-estate-investment-content-item';

const RealEstateInvestmentDetail = ({ realEstate }) => {
  const { t } = useHTranslation('admin-common');
  const isApartment = realEstate?.type === PROPERTIES_TYPE?.APARTMENT;
  const getBalconyDirection = (balconyDirection) =>
    getOptionBalconyDirection(t).find((el) => el?.value === balconyDirection)
      ?.label;
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="real-estate-investment-detail">
      <h2 className="real-estate-investment-detail-title">
        {realEstate?.name}
      </h2>
      <p className="real-estate-investment-detail-desc">
        {realEstate?.description}
      </p>

      <div className="real-estate-investment-detail-carousel">
        <span
          className={`real-estate-investment-detail-carousel-type ${isApartment ? 'type-apartment' : ''}`}
        >
          {isApartment ? 'Chung cư' : 'Nhà mặt đất'}
        </span>
        <HCarousel
          {...{
            dots: true,
            slidesToShow: 1,
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
          }}
        >
          {realEstate?.images?.map((image) => (
            <div
              key={image?.id}
              className="real-estate-investment-detail-carousel-image"
            >
              <img src={image?.url} alt={image?.name} />
            </div>
          ))}
        </HCarousel>
      </div>

      <h2 className="real-estate-investment-detail-title">Tổng quan</h2>
      <div
        className="real-estate-investment-detail-desc"
        dangerouslySetInnerHTML={{ __html: realEstate?.content }}
      />

      <div className="real-estate-investment-detail-scale">
        <h2 className="real-estate-investment-detail-title">Quy mô dự án</h2>
        {isAuthenticated ? (
          <div className="real-estate-investment-detail-scale-info">
            <div className="client-real-estate-investment-content-item-utilities">
              <UtilityIcon
                icon={<IconDirection />}
                value={getBalconyDirection(realEstate?.balconyDirection)}
              />
              <UtilityIcon
                icon={<IconSingleBed />}
                value={realEstate?.sleepNumber}
              />
              <UtilityIcon
                icon={<IconBathroom />}
                value={realEstate?.numberOfToilets}
              />
              <UtilityIcon
                icon={<IconGridArtboard />}
                value={`${realEstate?.totalArea}m2`}
              />
            </div>
            <div className="client-real-estate-investment-content-item-info">
              <div className="client-real-estate-investment-content-item-wrapper">
                <div className="client-real-estate-investment-content-item-wrapper-item">
                  <div className="client-real-estate-investment-content-item-wrapper-label">
                    Giá dự kiến
                  </div>
                  <div className="client-real-estate-investment-content-item-wrapper-value">
                    {realEstate?.expectedPrice
                      ? NumberUtils.format(realEstate?.expectedPrice || 0) + 'đ'
                      : '_'}
                  </div>
                </div>
                <div className="client-real-estate-investment-content-item-wrapper-item">
                  <div className="client-real-estate-investment-content-item-wrapper-label">
                    Loại bất động sản
                  </div>
                  <div className="client-real-estate-investment-content-item-wrapper-value">
                    {isApartment ? 'Chung cư' : 'Nhà mặt đất'}
                  </div>
                </div>
              </div>
              <div className="client-real-estate-investment-content-item-wrapper">
                <div className="client-real-estate-investment-content-item-wrapper-item">
                  <div className="client-real-estate-investment-content-item-wrapper-label">
                    Mã căn hộ
                  </div>
                  <div className="client-real-estate-investment-content-item-wrapper-value">
                    <HomeIconSvg />
                    {realEstate?.apartmentCode}
                  </div>
                </div>
                <div className="client-real-estate-investment-content-item-wrapper-item">
                  <div className="client-real-estate-investment-content-item-wrapper-label">
                    Vị trí
                  </div>
                  <div
                    className="client-real-estate-investment-content-item-wrapper-value"
                    title={realEstate?.address}
                  >
                    <MapIconSvg />
                    {realEstate?.address || '_'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="real-estate-investment-detail-need-login">
            <Button
              type="link"
              href={`/users/login?redirect=${location.pathname}`}
              block
            >
              Đăng nhập để xem chi tiết
            </Button>
          </div>
        )}
      </div>

      <h2 className="real-estate-investment-detail-title">Vị trí</h2>
      {isAuthenticated ? (
        <>
          <p
            className="real-estate-investment-detail-desc"
            dangerouslySetInnerHTML={{ __html: realEstate?.mapDesc }}
          />
          {realEstate?.map ? (
            <div
              className="real-estate-investment-detail-map"
              dangerouslySetInnerHTML={{ __html: realEstate?.map }}
            />
          ) : (
            '_'
          )}
        </>
      ) : (
        <div className="real-estate-investment-detail-need-login">
          <Button
            type="link"
            href={`/users/login?redirect=${location.pathname}`}
            block
          >
            Đăng nhập để xem chi tiết
          </Button>
        </div>
      )}

      <h2 className="real-estate-investment-detail-title">Chủ đầu tư</h2>
      <div className="home-real-estate-investment-item-content-org real-estate-investment-detail-investor">
        <img src={realEstate?.org?.avatar?.url} alt={realEstate?.org?.name} />
        <span>{realEstate?.org?.name}</span>
      </div>
    </div>
  );
};

export default RealEstateInvestmentDetail;
