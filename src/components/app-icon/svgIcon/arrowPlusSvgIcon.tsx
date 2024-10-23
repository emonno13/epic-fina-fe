import { SVGProps } from 'react';

export const ArrowPlusSvgIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H6C5.44771 11 5 11.4477 5 12C5 12.5523 5.44771 13 6 13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H13V6Z'
        fill='url(#paint0_linear_3672_73449)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_3672_73449'
          x1='12.044'
          y1='2.725'
          x2='3.77695'
          y2='20.2707'
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
