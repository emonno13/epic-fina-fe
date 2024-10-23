import { TooltipIcon } from '@icons/rsvgs/tooltip-icon';
import { Tooltip, Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import classNames from 'classnames';
import { ReactNode } from 'react';

import './h-card.module.scss';

const { Title } = Typography;

interface HTitleCardProps extends TitleProps {
  tooltip?: string;
  className?: string;
  tooltipIcon?: ReactNode;
  style?: any;
}

interface HContentCardProps {
  className?: string;
  style?: any;
}

interface HCardProps {
  className?: string;
  title?: string;
  children: ReactNode;
  titleProps?: HTitleCardProps;
  contentProps?: HContentCardProps;
}

const HCard = (props: HCardProps) => {
  const {
    className = '',
    children,
    titleProps = {},
    contentProps = {},
    title = '',
  } = props;

  return (
    <div className={classNames('h-card', className)}>
      {title && (
        <Title
          level={5}
          {...titleProps}
          className={classNames('h-card__title', titleProps?.className)}
        >
          {title}
          {titleProps?.tooltip && (
            <Tooltip
              title={titleProps?.tooltip}
              className="h-card__title--tooltip"
            >
              {titleProps?.tooltipIcon || (
                <div className="h-card__title-tooltip__label">
                  <TooltipIcon />
                </div>
              )}
            </Tooltip>
          )}
        </Title>
      )}
      <div
        {...contentProps}
        className={classNames('h-card__content', contentProps?.className)}
      >
        {children}
      </div>
    </div>
  );
};

export default HCard;
