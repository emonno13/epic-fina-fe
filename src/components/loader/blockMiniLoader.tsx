import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props {
  size?: number;
  noWrapper?: boolean;
}

export const LoaderSpan = styled.span<{ $size?: number }>`
  width: ${(props) => `${props.$size || 48}px`};
  height: ${(props) => `${props.$size || 48}px`};
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;

  &::before,
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #fff;
    animation: prixClipFix 2s linear infinite;
  }
  &::after {
    border-color: #16a979;
    animation: prixClipFix 2s linear infinite, rotate 0.5s linear infinite reverse;
    inset: 6px;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`;

export const BlockMiniLoader: React.FC<Props & PropsWithChildren> = ({ size, noWrapper }) => {
  return (
    <>
      {noWrapper ? (
        <LoaderSpan $size={size} />
      ) : (
        <div className='flex flex-col justify-center items-center bg-[#263038] self-center w-screen h-screen overflow-auto'>
          <LoaderSpan $size={size} />
        </div>
      )}
    </>
  );
};
