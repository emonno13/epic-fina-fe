/* eslint-disable @next/next/no-img-element */
import { RightOutlined } from '@ant-design/icons';
import { PROPERTIES_STATUS } from '@components/features/fina/properties/contansr';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { usePublicEnvironment } from '@system/hooks';
import HomeProductCarousel from '../home-product-carousel';
import { HomeRealEstateInvestmentItem } from './home-real-estate-investment-item';

import './home-real-estate-investment.scss';

export const HomeRealEstateInvestmentWrapper = (props) => {
  const { t } = useHTranslation('admin-common');
  const {
    title = t('Real estate', { vn: 'Bất động sản' }),
    des = 'Lãi suất cao ưu đãi',
  } = props;

  const filter = { where: { status: PROPERTIES_STATUS.ACTIVE, publish: true } };

  return (
    <HFeature
      {...{
        featureId: 'properties-public',
        nodeName: 'properties/public',
      }}
    >
      <HSearchFormHiddenAble
        withRelations={['org']}
        pagination={{
          filter: {
            limit: +usePublicEnvironment('MAX_INDEX_PRIORITIZED') || 10,
          },
        }}
        hiddenValues={{ filter }}
      />

      <HomeRealEstateInvestmentWrapperWithTitle des={des} title={title} />
    </HFeature>
  );
};

export default HomeRealEstateInvestmentWrapper;

const HomeRealEstateInvestmentWrapperWithTitle = ({ title, des }) => {
  const data = useTableSourceData();
  const { t } = useHTranslation('admin-common');

  if (!data?.length) return null;

  return (
    <div className="home-real-estate-investment-wrapper">
      <div className="home-real-estate-investment-wrapper__title">{title}</div>

      <div className="home-real-estate-investment-wrapper__des">
        <span>{des}</span>
        <a
          className="home-real-estate-investment-wrapper__link"
          href={'/danh-sach-san-pham-bat-dong-san'}
        >
          {t('Fund Certificates Wrapper', {
            en: 'View all',
            vn: 'Xem tất cả',
          })}
          <RightOutlined style={{ fontSize: '12px', marginLeft: '10px' }} />
        </a>
      </div>
      <HomeRealEstateInvestmentList />
    </div>
  );
};

export const HomeRealEstateInvestmentList = () => {
  const data = useTableSourceData();
  const isMobile = useIsMobile();

  return (
    <HomeProductCarousel
      {...{
        autoplay: false,
        slidesToShow: isMobile ? 1.2 : 3,
        infinite: !isMobile,
      }}
    >
      {data?.map((item) => (
        <HomeRealEstateInvestmentItem realEstate={item} key={item?.id} />
      ))}
    </HomeProductCarousel>
  );
};
