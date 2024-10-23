import HCarousel from '@components/shared/common/h-carousel';
import { Link } from '@components/shared/link';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { useMemo } from 'react';
import { CLIENT_PRODUCT_DETAIL_ROUTE } from '../../product-detail/constants';
import { AlmaOtherOffersFixedData } from '../constants';
import AlmaOtherOffersRightArrow from '../icons/alma-other-offers-right-arrow';

const AlmaOtherOffersProductDetailsItem = ({ productDetailData, index }) => {
  const { t } = useHTranslation('common');
  const { name, product, slug } = productDetailData || {};
  const { project } = product || {};
  const existAlmaOtherOffersFixedData: any = useMemo(() => {
    const result = AlmaOtherOffersFixedData.find(
      (item) => item.name === productDetailData.name,
    );
    return result || {};
  }, [AlmaOtherOffersFixedData]);
  return (
    <div className="alma-other-offers-list-item">
      <div className="alma-other-offers-list-item__image">
        <img
          src={`/assets/images/${existAlmaOtherOffersFixedData?.fileName}`}
        />
      </div>
      <div className="alma-other-offers-list-item__info">
        <h1 className="alma-other-offers-list-item__info-name">{name}</h1>
        <p className="alma-other-offers-list-item__info-desc">
          {product?.description}
        </p>
        <Link href={`/${CLIENT_PRODUCT_DETAIL_ROUTE.LOAN}/${slug}`}>
          <div className="alma-other-offers-list-item__info-see-detail">
            <span className="alma-other-offers-list-item__info-see-detail-text">
              {t('See detail', { vn: 'Xem chi tiết' })}
            </span>
            <div className="alma-other-offers-list-item__info-see-detail-icon">
              <AlmaOtherOffersRightArrow />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const AlmaOtherOffersProductDetails = () => {
  const data = useTableSourceData('almaOtherOffers') || [];
  const isMobile = useIsMobile();
  return (
    <HFeature
      {...{
        nodeName: 'product-details/public',
        featureId: 'almaOtherOffers',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          withRelations: [
            {
              relation: 'product',
              scope: {
                include: [{ relation: 'project' }],
              },
            },
          ],
          hiddenFields: {
            or: AlmaOtherOffersFixedData.map(({ name }) => ({ name })),
          },
        }}
      />
      <div className="alma-other-offers-list">
        <HCarousel
          {...{
            dots: false,
            arrows: false,
            slidesToShow: isMobile ? 1 : 4,
          }}
        >
          {data.map((productDetailData, index) => (
            <AlmaOtherOffersProductDetailsItem
              key={`alma-offer-item-${productDetailData?.id}`}
              {...{ productDetailData, index }}
            />
          ))}
        </HCarousel>
      </div>
    </HFeature>
  );
};

export default AlmaOtherOffersProductDetails;
