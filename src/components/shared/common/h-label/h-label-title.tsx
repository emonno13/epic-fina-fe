import { Tooltip } from 'antd';
import React, { CSSProperties } from 'react';
import { AlignLeftOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import cls from 'classnames';
import { createSchemaItem, HFormItemProps } from '../../../../schema-form/h-types';

import './h-label-title.module.scss';

export interface HLabelItemProps extends HFormItemProps {
  componentProps?: HLabelItem
}

export interface HLabelItem {
  showFirstIcon?: boolean,
  firstIcon?: any,
  label?: any,
  lastIcon?: any,
  titleTooltip?: any,
  className?: string,
  uppercaseLabel?: boolean;
  style?: CSSProperties;
  labelStrong?: boolean;
  uppercaseTooltip?: boolean;
}

export const createSchemaLabelItem = (props: HLabelItemProps) => {
  return createSchemaItem({
    colProps: { span: 24 },
    className: 'm-b-0',
    ...props,
    Component: LabelItem,
  });
};

export const LabelItem = ({ showFirstIcon = true, ...props }: HLabelItem) => {
  const { uppercaseLabel = true, labelStrong = true, uppercaseTooltip, ...restProps } = props;
  return (
    <span style={restProps?.style} className={cls('ui-label-title', restProps?.className)}>
      {showFirstIcon && (restProps?.firstIcon || <AlignLeftOutlined/>)}
      {labelStrong &&
				<b className={cls('label-content', {
				  'uppercase': uppercaseLabel,
				})}>
				  {restProps?.label}
				</b>
      }
      
      {!labelStrong &&
				<span className={cls('label-content', {
				  'uppercase': uppercaseLabel,
				})}>
				  {restProps?.label}
				</span>
      }

      {restProps.titleTooltip && (
        <Tooltip 
          title={restProps?.titleTooltip}
          overlayStyle={{ textTransform: uppercaseTooltip ? 'uppercase' : undefined }}
        >{restProps?.lastIcon || <QuestionCircleTwoTone/>}</Tooltip>
      )}
    </span>
  );
};
