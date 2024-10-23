import React from 'react';
import QRCode from 'qrcode.react';

interface HQRCodeProps {
  url: string,
  logo?: string
  size?: number,
  className?: string,
}

export const HQRCode = (props: HQRCodeProps) => {
  const className = `${props.className || ''}`;
  const avatarHost = props.url.startsWith('http') ? '' : `${location.host}/vn/`;
  const url = `${avatarHost}${props.url}`;
  return (
    <div className={className}>
      <QRCode value={url} size={props.size || 400}
        level={'M'}
        includeMargin={true}
        imageSettings={{
          // src: props.logo,
          excavate: true, width: '50', height: '50',
        }}/>
    </div>
  );
};
