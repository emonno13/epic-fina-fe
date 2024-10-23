import React from 'react';

interface Props{
  isMobile: boolean
}

const MoneySvg = React.memo(({ isMobile }: Props)=> {
  const length = isMobile ? '40' : '72';
  return (
    <svg width={length} height={length} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.0156 42.9895C26.0156 46.8595 28.9856 49.9795 32.6756 49.9795H40.2056C43.4156 49.9795 46.0256 47.2495 46.0256 43.8895C46.0256 40.2295 44.4356 38.9395 42.0656 38.0995L29.9756 33.8995C27.6056 33.0595 26.0156 31.7695 26.0156 28.1095C26.0156 24.7495 28.6256 22.0195 31.8356 22.0195H39.3656C43.0556 22.0195 46.0256 25.1395 46.0256 29.0095" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 18V54" stroke="#FF6C0E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M36 66C52.5685 66 66 52.5685 66 36C66 19.4315 52.5685 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5685 19.4315 66 36 66Z" stroke="#064DD6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
});
export default MoneySvg;
