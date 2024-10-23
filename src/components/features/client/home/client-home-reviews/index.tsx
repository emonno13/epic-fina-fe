import { UserOutlined } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { HFeature } from '@schema-form/features';
import { useTableSourceData } from '@schema-form/features/hooks';
import { HSearchFormHiddenAble } from '@schema-form/features/search-form';
import { Avatar, Button, Col, Row } from 'antd';

const ClientHomeReviewsListItem = ({ reviewData }) => {
  const {
    id,
    reviewerName,
    reviewerAddress,
    reviewDate,
    content,
    rate,
    avatarSrc,
  } = reviewData;
  return (
    <div className="client-home-reviews__list-item">
      <div className="client-home-reviews__list-item__rate">
        {Array.from(Array(rate)).map((_, index) => (
          <img
            key={`client-home-reviews-item-${id}-${index}`}
            {...{
              height: 40,
              width: 40,
              src: '/assets/images/star_rate.png',
            }}
          />
        ))}
      </div>
      <div className="client-home-reviews__list-item__header">
        <div className="client-home-reviews__list-item__header__avatar">
          <Avatar
            {...{
              icon: <UserOutlined />,
              size: 80,
              src: avatarSrc,
            }}
          />
        </div>
        <div className="client-home-reviews__list-item__header__content">
          <div className="client-home-reviews__list-item__header__content__name">
            {reviewerName}
          </div>
          <div className="client-home-reviews__list-item__header__content__desc">
            {reviewerAddress}
          </div>
        </div>
      </div>
      <div className="client-home-reviews__list-item__content">{content}</div>
      <div className="client-home-reviews__list-item__review-date">
        {ConverterUtils.dateConverterToString(reviewDate)}
      </div>
    </div>
  );
};

const ClientHomeReviewsList = () => {
  const { t } = useHTranslation('admin-common');
  const reviews = useTableSourceData();

  if (!Array.isArray(reviews) || reviews.length < 1) {
    return null;
  }
  return (
    <div className="client-home-reviews max-w-1100 m-auto">
      <div className="client-home-reviews__title">
        {t('client_home_reviews_title', {
          en: 'Customer reviews about us',
          vn: 'Khách hàng đánh giá về chúng tôi',
        })}
      </div>
      <Row gutter={[24, 24]}>
        {reviews.map((reviewData, index) => (
          <Col
            key={`client-home-review-${index}-${reviewData.id}`}
            {...{ xs: 24, sm: 24, md: 8 }}
          >
            <ClientHomeReviewsListItem {...{ reviewData }} />
          </Col>
        ))}
      </Row>
      <div className="client-home-reviews__footer">
        <Button {...{ className: 'client-home-reviews__all-reviews-btn' }}>
          {t('All reviews', { en: 'See all', vn: 'Xem tất cả' })}
        </Button>
      </div>
    </div>
  );
};

const ClientHomeReviews = () => {
  return (
    <HFeature
      {...{
        nodeName: 'client-reviews/public',
        featureId: 'clientReviewsHomePage',
      }}
    >
      <HSearchFormHiddenAble />
      <ClientHomeReviewsList />
    </HFeature>
  );
};

export default ClientHomeReviews;
