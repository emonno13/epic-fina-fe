import { SVGProps } from 'react';

export const ArrowRightSvgIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        opacity='0.3'
        d='M12 22C17.5228 22 22 17.5229 22 12C22 6.47718 17.5228 2.00002 12 2.00002C6.47715 2.00002 2 6.47718 2 12C2 17.5229 6.47715 22 12 22Z'
        fill='url(#paint0_linear_3495_9969)'
      />
      <path
        d='M16.03 11.47L13.03 8.47004C12.74 8.18004 12.26 8.18004 11.97 8.47004C11.68 8.76004 11.68 9.24004 11.97 9.53004L13.69 11.25H8.5C8.09 11.25 7.75 11.59 7.75 12C7.75 12.41 8.09 12.75 8.5 12.75H13.69L11.97 14.47C11.68 14.76 11.68 15.24 11.97 15.53C12.12 15.68 12.31 15.75 12.5 15.75C12.69 15.75 12.88 15.68 13.03 15.53L16.03 12.53C16.32 12.24 16.32 11.76 16.03 11.47Z'
        fill='#0180B6'
      />
      <defs>
        <linearGradient
          id='paint0_linear_3495_9969'
          x1='12.0629'
          y1='-1.24998'
          x2='0.252792'
          y2='23.8153'
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
