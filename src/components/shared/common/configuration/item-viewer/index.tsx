import React from 'react';
import { Tooltip } from 'antd';

export interface ItemViewerProps {
  label: any,
  value: any,
  tooltipContent?: any,
  className?: any,
  labelClassName?: any,
  onClick?: Function,
  space: boolean,
  valueClassName?:string
}

export const ItemViewer = ({
  label, 
  value, 
  tooltipContent = '' as any, 
  className = '', 
  labelClassName = '',
  valueClassName = '',
  onClick = (f => f),
  space = false,
}) => (
  <div {...{ onClick }} >
    <Tooltip placement="topLeft" title={tooltipContent && tooltipContent}>
      <div className={`h2j-platform-item-wrapper ${className}`}>
        <b className={`h2j-platform-item-wrapper-label ${labelClassName}`}>{label}</b>
        <span className={valueClassName}>{value}</span>
      </div>
    </Tooltip>
    <style jsx>{`
        .h2j-platform-item-wrapper {
          margin-bottom: 12px;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          line-height: 1.5715;
          display: flex;
          align-items: center;
          cursor: pointer;
          justify-content: ${space ? 'space-between' : 'initial'};
          text-align: ${space ? 'right' : 'initial'};
        }
        .h2j-platform-item-wrapper-label {
           display: inline-block;
           margin-right: 10px !important;
           color: rgba(0, 0, 0, 0.85);
           margin: 0;
           width: auto;
           display: flex;
           justify-content: center;
        }
      `}</style>
  </div>
);
