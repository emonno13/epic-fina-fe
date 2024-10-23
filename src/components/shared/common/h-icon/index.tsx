import React from 'react';

import './h-svg.module.scss';

export const HSgv = ({ fileName, className = '', ...props }) => {
  return (<img src={`/assets/svgs/${fileName.replace('.svg', '')}.svg`} {...{ ...props, className }}/>);
};