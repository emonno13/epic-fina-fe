import React from 'react';

export const FiledViewer = ({ label, value, className = '', labelClassName = '', valueClassname = '', widthLabel = '40%' }) => (
  <div className={`h2j-platform-item-wrapper ${className}`}>
    <p className={`h2j-platform-item-wrapper-label ${labelClassName}`}>{label ? `${label}: ` : ''}</p>
    <span className={`h2j-platform-item-wrapper-value ${valueClassname}`}>{value}</span>
    <style jsx>{`
      .h2j-platform-item-wrapper {
        margin-bottom: 3px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 1.5715;
        display: flex;
      }
      .h2j-platform-item-wrapper-label {
         display: inline-block;
         color: rgba(17, 17, 17, 1);
         min-width: ${widthLabel};
         font-weight: 600;
         font-size: 14px;
         line-height: 22px
      }
      .h2j-platform-item-wrapper-value{
        font-style: normal;
        color: rgba(17, 17, 17, 1);
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
      }
    `}</style>
  </div>
);
