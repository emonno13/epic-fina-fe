import React from 'react';

import './h-img.module.scss';

export interface HImgProps {
  fileName: string,
  className?: string,
  children?: any
}

export const HImg = ({ fileName, ...props }: HImgProps) => {
  return (<img src={`/assets/images/${fileName}`} {...props}/>);
};

export const HPanelWithBackground = (props: HImgProps) => {
  const { fileName, className, children } = props;
  return (
    <div {...{
      className: `ui-h-background-img ${className}`,
    }}>
      <div className={'ui-h-background-content'}>
        {children}
      </div>

      <style jsx>{`
        .ui-h-background-img::before {
            background-image: url("/assets/images/${fileName}");
          }
      `}</style>
    </div>

  );
};