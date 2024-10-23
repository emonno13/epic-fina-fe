import React from 'react';
import cls from 'classnames';

import './render-html.module.scss';

interface RenderHtmlProps{
  label?: string;
  html: string | HTMLElement | any;
  className?: string;
}
const RenderHtml = React.memo(({ label, html, className }: RenderHtmlProps)=> {
  return (
    <div className={cls('render-html__container', className)}>
      {label && <p className="render-html__label">{label}</p>}
      <div dangerouslySetInnerHTML={{ __html: html }} className="render-html__content"/>
    </div>
  );
});
export default RenderHtml;
