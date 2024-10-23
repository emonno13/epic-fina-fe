import { Link } from '@components/shared/link';
import { useHTranslation } from '@lib/i18n';
import { useTableSourceData } from '@schema-form/features/hooks';
import { Col, Row } from 'antd';
import ClientHomeNewsListByCategory from './client-home-new.list-by-category';
import ClientHomeCategoryHeaderIcon from './icons/client-home.category-header-icon';

const ClientHomeNewsCategoriesItem = ({ categoryData }) => {
  const { t } = useHTranslation('common');
  return (
    <div className="client-home-news-categories-item">
      <div className="client-home-news-categories-item__header">
        <div className="client-home-news-categories-item__header__icon">
          <ClientHomeCategoryHeaderIcon />
        </div>
        <h1 className="client-home-news-categories-item__header__title">
          {categoryData.name}
        </h1>
      </div>
      <ClientHomeNewsListByCategory {...{ categoryData }} />
      <Link href="/tin-tuc">{t('See more', { vn: 'Xem thêm bài viết' })}</Link>
    </div>
  );
};

const ClientHomeNewsCategories = () => {
  const newsCategories = useTableSourceData();
  if (!newsCategories?.length) {
    return null;
  }
  return (
    <Row gutter={[30, 30]}>
      {newsCategories.map((categoryData, index) => (
        <Col
          key={`client-home-news-category-item-${index}`}
          {...{ xs: 24, sm: 24, md: 8 }}
        >
          <ClientHomeNewsCategoriesItem categoryData={categoryData} />
        </Col>
      ))}
    </Row>
  );
};

export default ClientHomeNewsCategories;
