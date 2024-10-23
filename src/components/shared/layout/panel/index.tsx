import React from 'react';
import classNames from 'classnames';

interface IHPanel {
  className?: string,
  screenSize: 'small' | 'medium' | 'large' | 'full';
  children?: any
}

export const HPanel = ({ screenSize = 'full', className, children }: IHPanel) => {
  return (
    <div className={classNames('ui-h-panel', `panel-${screenSize}` , className)}>
      {children}
      <style jsx>{`
        .ui-h-panel {
          margin: 15px auto;
          padding: 20px;
        }
        .panel-small {
            max-width: 350px;
        }
      `}</style>
    </div>
  );
};