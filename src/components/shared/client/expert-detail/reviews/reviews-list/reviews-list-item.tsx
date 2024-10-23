import { UserOutlined } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { Avatar, Rate } from 'antd';
import { useMemo } from 'react';
import { ExpertDetailProductTypeOptions } from '../../constants';

const ExpertDetailReviewsListItem = ({
  rate,
  createdAt,
  type,
  message,
  image,
  metaData,
  sender,
}) => {
  const { t } = useHTranslation('common');

  const senderInfo = useMemo(() => {
    return {
      fullName: sender
        ? ConverterUtils.getFullNameUser(sender)
        : metaData?.fullName,
      avatar: sender ? sender.avatar : '',
    };
  }, [metaData, sender]);

  const typeLabel = useMemo(() => {
    const label = ExpertDetailProductTypeOptions(t).find(
      ({ value }) => value === type,
    )?.label;

    if (!label) return '';
    return `${t('Product', { vn: 'Sản phẩm' })} ${label}`;
  }, [type]);

  return (
    <div className="expert-detail-reviews-list-item">
      <div className="expert-detail-reviews-list-item-header">
        <div className="expert-detail-reviews-list-item-header-info">
          <Avatar
            {...{
              src: senderInfo?.avatar,
              size: 48,
              icon: <UserOutlined />,
            }}
          />
          <div className="expert-detail-reviews-list-item-header-info__detail">
            <h2>{senderInfo?.fullName}</h2>
            <Rate
              {...{
                disabled: true,
                count: 5,
                value: rate,
                allowHalf: true,
              }}
            />
          </div>
        </div>
        <p className="expert-detail-reviews-list-item-header-created-at">
          {ConverterUtils.dateConverterToString(createdAt)}
        </p>
      </div>
      <div
        {...{
          className: 'expert-detail-reviews-list-item-image',
          style: {
            backgroundImage:
              'url("/assets/images/user-rating-default-image.jpeg")',
          },
        }}
      >
        <p className="expert-detail-reviews-list-item-image__category-name">
          {typeLabel}
        </p>
        <h2 className="expert-detail-reviews-list-item-image__content">
          “{message}”
        </h2>
      </div>
    </div>
  );
};

export default ExpertDetailReviewsListItem;
