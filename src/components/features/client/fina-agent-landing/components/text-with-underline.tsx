import React from 'react';

import '../css/text-with-underline.module.scss';

interface Props{
  isCenter?: boolean
  title: string
}

const TextWithUnderline = React.memo(({ title, isCenter }: Props)=> {
  return (
    <div style={{ display: 'inline-grid' }}>
      <h1 className="text-underline__title">
        {title}
      </h1>
      <div className="text-underline__underline" style={isCenter ? { margin: '0 auto' } : {}} />
    </div>
  );
});
export default TextWithUnderline;
