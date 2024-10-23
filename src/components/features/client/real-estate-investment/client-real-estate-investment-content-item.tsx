/* eslint-disable @next/next/no-img-element */
import {
  getOptionBalconyDirection,
  PROPERTIES_TYPE,
} from '@components/features/fina/properties/contansr';
import { HButton } from '@components/shared/common-form-elements/h-confirmation-button';
import {
  HomeIconSvg,
  IconBathroom,
  IconDirection,
  IconGridArtboard,
  IconSingleBed,
  MapIconSvg,
} from '@icons';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { NumberUtils } from '@lib/utils/number';
import { Col, Row } from 'antd';

import './real-estate-investment.module.scss';

const ClientRealEstateInvestmentContentItem = ({ realEstate }) => {
  const { t } = useHTranslation('admin-common');
  const isApartment = realEstate?.type === PROPERTIES_TYPE?.APARTMENT;
  const isMobile = useIsMobile();

  const getBalconyDirection = (balconyDirection) =>
    getOptionBalconyDirection(t).find((el) => el?.value === balconyDirection)
      ?.label;

  return (
    <div className="client-real-estate-investment-content-item">
      {!isMobile && (
        <>
          <h2 className="client-real-estate-investment-content-item-name">
            {realEstate?.name}
          </h2>
          <p
            className="client-real-estate-investment-content-item-desc"
            dangerouslySetInnerHTML={{ __html: realEstate?.description }}
          />
        </>
      )}

      <Row gutter={[15, 15]}>
        <Col {...{ xs: 24, sm: 24, md: 11 }}>
          <div className="client-real-estate-investment-content-item-image">
            <img src={realEstate?.images?.[0]?.url} alt={realEstate?.name} />
            <span
              className={`client-real-estate-investment-content-item-image-type ${isApartment ? 'type-apartment' : ''}`}
            >
              {isApartment ? 'Chung cư' : 'Nhà mặt đất'}
            </span>
          </div>

          {isMobile && (
            <>
              <h2 className="client-real-estate-investment-content-item-name">
                {realEstate?.name}
              </h2>
              <p
                className="client-real-estate-investment-content-item-desc"
                dangerouslySetInnerHTML={{ __html: realEstate?.content }}
              />
            </>
          )}
        </Col>
        <Col {...{ xs: 24, sm: 24, md: 13 }}>
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
        </Col>
      </Row>

      <div className="client-real-estate-investment-content-item-bottom">
        <Row gutter={[15, 15]}>
          <Col {...{ xs: 24, sm: 24, md: 11 }}>
            <div className="home-real-estate-investment-item-content-org">
              <img
                src={realEstate?.org?.avatar?.url}
                alt={realEstate?.org?.name}
              />
              <span>{realEstate?.org?.name}</span>
            </div>
          </Col>
          <Col {...{ xs: 24, sm: 24, md: 13 }}>
            <div className="home-real-estate-investment-item-content-view-detail">
              <HButton
                block
                type="link"
                href={`/danh-sach-san-pham-bat-dong-san/${realEstate?.slug}`}
              >
                Xem chi tiết
              </HButton>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ClientRealEstateInvestmentContentItem;

export const UtilityIcon = ({ icon, value }) => {
  return (
    <span className="utility-icon">
      {icon} {value || '_'}
    </span>
  );
};
