import React from 'react';

interface Props{
  isMobile: boolean
}

const PercentSvg = React.memo(({ isMobile }: Props)=> {
  const length = isMobile ? '40' : '72';
  return (
    <svg width={length} height={length} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 6H45C60 6 66 12 66 27V45C66 60 60 66 45 66H27C12 66 6 60 6 45V27C6 12 12 6 27 6Z" stroke="#064DD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25.7102 45.8099L45.3301 26.1899" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26.94 31.11C28.978 31.11 30.63 29.4579 30.63 27.42C30.63 25.3821 28.978 23.73 26.94 23.73C24.9021 23.73 23.25 25.3821 23.25 27.42C23.25 29.4579 24.9021 31.11 26.94 31.11Z" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M46.5601 48.2701C48.598 48.2701 50.2501 46.618 50.2501 44.5801C50.2501 42.5421 48.598 40.8901 46.5601 40.8901C44.5221 40.8901 42.8701 42.5421 42.8701 44.5801C42.8701 46.618 44.5221 48.2701 46.5601 48.2701Z" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});
export default PercentSvg;
