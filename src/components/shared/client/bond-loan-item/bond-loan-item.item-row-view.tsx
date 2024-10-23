import { RightOutlined } from '@ant-design/icons';
import { useHTranslation } from '@lib/i18n';
import { Button } from 'antd';

import '../bond-list/bond-item-list.module.scss';

const ItemRowView = (_props: any) => {
  const { t } = useHTranslation('common');
  const {
    screen = '',
    showCheckBox = true,
    backgroundColor = '',
    orgImage = '',
    slug = '',
    buttonText = '',
    uiDescription,
    name,
    content,
    titleHeader,
  } = _props;
  const { onClick } = _props;

  if (!screen) {
    return null;
  }

  return (
    <div className={`client-${screen}-list-main-list-item-list-view`}>
      <div
        className={`client-${screen}-list-main-list-item-list-view__header`}
        style={{ backgroundColor: backgroundColor || undefined }}
      >
        <div
          className={`client-${screen}-list-main-list-item-list-view__header__image`}
        >
          {orgImage && <img src={orgImage} />}
        </div>

        {titleHeader && (
          <div
            className={`client-${screen}-list-main-list-item-list-view__header__title`}
          >
            {titleHeader}
          </div>
        )}

        {/*{showCheckBox && <div className={`client-${screen}-list-main-list-item-list-view__header__checkbox`}>*/}
        {/*	<span>{t('Compare', { en: 'Compare', vn: 'So sánh' })}</span>*/}
        {/*	<Checkbox />*/}
        {/*</div>}*/}
      </div>

      <div
        className={`client-${screen}-list-main-list-item-list-view__content`}
      >
        <div
          className={`client-${screen}-list-main-list-item-list-view__content__title`}
        >
          {name}
        </div>
        <div
          className={`client-${screen}-list-main-list-item-list-view__info-wrap`}
        >
          <div
            className={`client-${screen}-list-main-list-item-list-view__info-wrap__left`}
          >
            <Button
              type="link"
              className={`client-${screen}-list-main-list-item-list-view__content__detail-button`}
              href={slug}
            >
              {t('See detail', {
                en: 'See detail',
                vn: 'Xem chi tiết',
              })}
              <RightOutlined />
            </Button>
            <div
              className={`client-${screen}-list-main-list-item-list-view__info-wrap__left__advantage-wrap`}
            >
              {uiDescription}
            </div>
          </div>
          <div
            className={`client-${screen}-list-main-list-item-list-view__info-wrap__right`}
          >
            {content}
            <div
              className={`client-${screen}-list-main-list-item-list-view__content__request-button`}
            >
              <Button onClick={onClick}>{buttonText}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemRowView;
