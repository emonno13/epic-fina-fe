import { DotCustomIcon } from '@icons/rsvgs/dot-custom';
import { ConvertUtils } from '@lib/utils/convert';
import { Timeline } from 'antd';
import { useTranslation } from 'react-i18next';

import './product-detail-insurance-content.module.scss';

export const ProductDetailInsuranceContent = ({ data }) => {
  const { t } = useTranslation('common');
  const { productContent = [] } = data;

  return (
    <div className="insurance-detail__content">
      {/* <h1 className="insurance-detail__content-title">{t('insuranceInformation')}</h1> */}
      <Timeline className="insurance-detail__content__timeline">
        {productContent?.map((timelineItem, index) => {
          return (
            <Timeline.Item
              key={`$insurance-item-${index}`}
              {...{
                dot: <DotCustomIcon color={timelineItem?.color} />,
                className: 'insurance-detail__content__timeline-item',
              }}
            >
              <p className="insurance-detail__content__timeline-item__title">
                {timelineItem?.title}
              </p>
              <InsuranceDetailContentWrapper
                color={ConvertUtils.hexToRgbA(timelineItem?.color, 0.1)}
              >
                <p
                  className="insurance-detail__content__text"
                  dangerouslySetInnerHTML={{ __html: timelineItem?.content }}
                />
              </InsuranceDetailContentWrapper>
            </Timeline.Item>
          );
        })}
      </Timeline>
      {/*
			{data?.info?.productUrlOriginal &&
				<a {...{
					className: 'insurance-detail__content__buy-insurance',
					type: 'primary',
					href: data?.info?.productUrlOriginal,
					target: '_blank',
				}}>{t('buyingInsurance')}</a>
			} */}
    </div>
  );
};

export default ProductDetailInsuranceContent;

export const InsuranceDetailContentWrapper = ({ children, color }) => {
  return (
    <div
      className="insurance-detail__content__timeline-item__content"
      style={{ backgroundColor: `${color}` }}
    >
      {children}
    </div>
  );
};
