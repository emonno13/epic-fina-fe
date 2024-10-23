import { SVGProps } from 'react';

export const LoadingSvgIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M12 3.00002C16.9706 3.00002 21 7.02946 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02946 7.02944 3.00002 12 3.00002Z'
        stroke='#D1E4EF'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M12 3.00002C16.9706 3.00002 21 7.02946 21 12'
        stroke='url(#paint0_linear_3326_63296)'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_3326_63296'
          x1='16.5283'
          y1='1.53752'
          x2='11.2138'
          y2='12.8169'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#71B4F2' />
          <stop offset='0.46' stopColor='#419FF7' />
          <stop offset='1' stopColor='#41C35E' />
        </linearGradient>
      </defs>
    </svg>
  );
};
