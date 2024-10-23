import React from 'react';

interface Props{
  isMobile: boolean
}

const NoteSvg = React.memo(({ isMobile }: Props)=> {
  const length = isMobile ? '40' : '72';
  return (
    <svg width={length} height={length} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 24.75V54C60 63 54.63 66 48 66H24C17.37 66 12 63 12 54V24.75C12 15 17.37 12.75 24 12.75C24 14.61 24.7499 16.29 25.9799 17.52C27.2099 18.75 28.89 19.5 30.75 19.5H41.25C44.97 19.5 48 16.47 48 12.75C54.63 12.75 60 15 60 24.75Z" stroke="#064DD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M48 12.75C48 16.47 44.97 19.5 41.25 19.5H30.75C28.89 19.5 27.2099 18.75 25.9799 17.52C24.7499 16.29 24 14.61 24 12.75C24 9.03 27.03 6 30.75 6H41.25C43.11 6 44.7901 6.75001 46.0201 7.98001C47.2501 9.21001 48 10.89 48 12.75Z" stroke="#064DD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 39H36" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 51H48" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});
export default NoteSvg;
