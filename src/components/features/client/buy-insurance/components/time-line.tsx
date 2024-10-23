import { Button, Timeline } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const TimeLineContent = ({ data, nextToBuy }) => {
  const { t } = useTranslation('common');
  const { productContent = [] } = data;

  const dot = (timelineItem) =>
    (<div>
      <img className="buy-insurance-page__time-line__content__icon" src={timelineItem?.icon?.url} />
    </div>);

  return (
    <div className="buy-insurance-page__time-line">
      <h1 className="buy-insurance-page__time-line__content-title">{t('insuranceInformation')}</h1>
      <Timeline className="buy-insurance-page__time-line__content">
        {
          productContent?.map((timelineItem, index) => (
            <Timeline.Item
              key={`$insurance-item-${index}`}
              {...{
                dot: dot(timelineItem),
                className: 'buy-insurance-page__time-line__content__dot',
              }}>
              <p className="buy-insurance-page__time-line__content__title">{timelineItem?.title}</p>
              <div className="buy-insurance-page__time-line__content__content">
                <p className="buy-insurance-page__time-line__content__text" dangerouslySetInnerHTML={{ __html: timelineItem?.content }} />
              </div>
            </Timeline.Item>
          ))
        }
      </Timeline>
      
      <Button className="buy-insurance-page__time-line__next" onClick={nextToBuy} style={{ }}>Mua bảo hiểm</Button>
    </div>
  );
};

export default TimeLineContent;
