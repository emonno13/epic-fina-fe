import { FC } from 'react';
import { ImageProps } from 'next/image';
import Image from 'next/image';
import { useIsMobile } from '@lib/hooks/use-media';
import { rgbDataURL } from '@components/shared/atom/rgb';

interface HResponsiveImageProps extends ImageProps {
  mWidth?: number | string;
  mHeight?: number | string;
  mSrc?: string;
}
const HResponsiveImage: FC<HResponsiveImageProps> = (props) => {
  const isMobile = useIsMobile();
  const {
    mWidth,
    mHeight,
    mSrc,
    width,
    height,
    src,
    alt = 'FINA image',
    ...restProps
  } = props;

  const getMValue = (mValue, value) => {
    if (isMobile && mValue) return mValue;
    return value;
  };

  return (
    <div className={'node-shape'}>
      <Image
        {...{
          placeholder: 'blur',
          blurDataURL: rgbDataURL(220, 220, 220),
          alt,
          width: getMValue(mWidth, width),
          height: getMValue(mHeight, height),
          src: getMValue(mSrc, src),
          ...restProps,
        }}
      />
      <style jsx>{`
        .node-shape {
          width: ${getMValue(mWidth, width)}px;
          height: ${getMValue(mHeight, height)}px;
        }
      `}</style>
    </div>
  );
};
export default HResponsiveImage;
