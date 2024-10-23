import React, { FC, memo, ReactNode } from 'react';
import cn from 'classnames';
import { TagFilled } from '@ant-design/icons';

export interface AttachProps {
  className?: string;
  placement?: 'bottom' | 'left' | 'right' | 'top';
  content?: string | ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const Attach: FC<AttachProps> = memo((props) => {
  const { 
    className, 
    placement = 'bottom', 
    content, 
    onClick,
  } = props;
  
  const renderStylePosition = () => {
    const defaultVertical = 'left: 0; right: 0;';
    const defaultHorizontal = 'top: 0; bottom: 0;';
    if (placement === 'bottom') return `${defaultVertical} bottom: 0;`;
    if (placement === 'top') return `${defaultVertical} top: 0;`;
    if (placement === 'left') return `${defaultHorizontal} left: 0;`;
    if (placement === 'right') return `${defaultHorizontal} right: 0;`;
    return {};
  };

  return (
    <div onClick={e => onClick?.(e)} className={cn('attach-component', className)}>
      {content && (
        <>
          <TagFilled className="mr-5" />
          {content}
        </>
      )}

      <style jsx>{`
      .attach-component {
        ${renderStylePosition()}
        padding: ${content ? '3px' : 0};
        color: #fff;
        align-items: center;
        cursor: pointer;
        display: inline-block;
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
        text-transform: lowercase;
        font-size: 12px;
        position: absolute;
        background-color: #333333cc;
        margin: 0;
        margin-left: 0 !important;
        z-index: 1;
      }
      `}</style>
    </div>
  );
});