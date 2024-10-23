import { GetIndexPrioritized } from '@components/features/fina/projects';
import { useIsMobile } from '@lib/hooks/use-media';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import HomeProductCarousel from '../home-product-carousel';
import ProductListWrapper from '../product-list-wrapper';
import HomeProjectListItem from './home-project-list.item';

import './home-project-list.module.scss';

const HomeProjectList = () => {
  const { t } = useHTranslation('common');
  const data = useTableSourceData();
  const isMobile = useIsMobile();

  if (!data?.length) {
    return null;
  }
  return (
    <div>
      <ProductListWrapper
        {...{
          title: t('home_project_list_wrapper_title', {
            en: 'Featured projects',
            vn: 'Các dự án nổi bật',
          }),
          description: t('home_project_list_wrapper_desc', {
            en: 'Exclusively for real estate formed in the future',
            vn: 'Dành riêng cho bất động sản hình thành trong tương lai',
          }),
          url: '/danh-sach-bat-dong-san',
        }}
      >
        <HomeProductCarousel
          {...{
            slidesToScroll: isMobile ? 1 : 4,
            slidesToShow: isMobile ? 1 : 4,
          }}
        >
          {data.map((projectData, index) => (
            <HomeProjectListItem
              key={`home-project-list-item-${index}`}
              {...{ projectData }}
            />
          ))}
        </HomeProductCarousel>
      </ProductListWrapper>
    </div>
  );
};

export const HomeProjectListWithFetching = ({ transformData = (f) => f }) => {
  const indexPrioritized = GetIndexPrioritized();

  return (
    <HFeature
      {...{
        featureId: 'homeProjectsList',
        nodeName: 'projects/public',
      }}
    >
      <HSearchFormHiddenAble
        {...{
          onDataReadyToSubmit: transformData,
          hiddenValues: {
            filter: {
              order: ['indexPrioritized ASC'],
              where: {
                indexPrioritized: { inq: indexPrioritized },
                active: true,
              },
              fields: ['id', 'name', 'slug', 'images'],
            },
          },
        }}
      />
      <HomeProjectList />
    </HFeature>
  );
};

export default HomeProjectList;
