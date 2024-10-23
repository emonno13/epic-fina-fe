import React from 'react';

interface Props{
  isMobile: boolean
}

const CardSvg = React.memo(({ isMobile }: Props)=> {
  const length = isMobile ? '40' : '72';
  return (
    <svg width={length} height={length} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 25.5H45.72" stroke="#064DD6" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 49.5H21.87" stroke="#064DD6" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M33 49.5H43.5" stroke="#064DD6" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23.9399 61.4999H52.6799C63.3599 61.4999 65.9999 58.8599 65.9999 48.3299V20.6699" stroke="#064DD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M59.97 11.25C58.11 10.71 55.71 10.5 52.68 10.5H19.32C8.67 10.5 6 13.14 6 23.67V48.3C6 55.32 7.17 58.83 11.13 60.39" stroke="#064DD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M66 6L6 66" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});
export default CardSvg;
