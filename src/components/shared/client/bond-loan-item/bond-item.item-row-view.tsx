import { RightOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';
import { TYPE_ACTIONS } from '../bond-list/constants';

import '../bond-list/bond-item-list.module.scss';

const BondItemRowView = (_props: any) => {
  const { t } = useHTranslation('common');
  const {
    backgroundColor = '',
    orgImage = '',
    slug = '',
    uiDescription,
    name,
    content,
    titleHeader,
  } = _props;
  const { onClick } = _props;

  return (
    <div className={'client-bond-list-main-list-item-list-view'}>
      <div
        className={'client-bond-list-main-list-item-list-view__header'}
        style={{ backgroundColor: backgroundColor || undefined }}
      >
        <div className="client-bond-list-main-list-item-list-view__header__wrapper">
          <div
            className={
              'client-bond-list-main-list-item-list-view__header__image'
            }
          >
            {orgImage && <img src={orgImage} alt={orgImage} />}
          </div>

          {titleHeader && (
            <div
              className={
                'client-bond-list-main-list-item-list-view__header__title'
              }
            >
              {titleHeader}
            </div>
          )}
        </div>
        <div
          className={
            'client-bond-list-main-list-item-list-view__content__title'
          }
        >
          {name}
        </div>
      </div>

      <div className={'client-bond-list-main-list-item-list-view__content'}>
        {/* <div className={'client-bond-list-main-list-item-list-view__content__title'}>{name}</div> */}
        <div className={'client-bond-list-main-list-item-list-view__info-wrap'}>
          <div
            className={
              'client-bond-list-main-list-item-list-view__info-wrap__left'
            }
          >
            <div
              className={
                'client-bond-list-main-list-item-list-view__info-wrap__left__advantage-wrap'
              }
            >
              {uiDescription}
            </div>
            <Button
              type="link"
              className={
                'client-bond-list-main-list-item-list-view__content__detail-button'
              }
              href={slug}
            >
              {t('See detail', {
                en: 'See detail',
                vn: 'Xem chi tiết',
              })}
              <RightOutlined />
            </Button>
          </div>
          <div
            className={
              'client-bond-list-main-list-item-list-view__info-wrap__right'
            }
          >
            {content}
          </div>
        </div>

        <div
          className={
            'client-bond-list-main-list-item-list-view__content__request-button'
          }
        >
          <Button onClick={() => onClick(TYPE_ACTIONS.REQUEST)}>
            {t('Request counselling', {
              en: 'Request counselling',
              vn: 'Yêu cầu tư vấn',
            })}
          </Button>

          <Button
            className="buy-button"
            onClick={() => onClick(TYPE_ACTIONS.BUY)}
          >
            {t('Buy', { vn: 'Mua' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BondItemRowView;
