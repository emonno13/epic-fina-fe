import { useMediaQuery } from 'react-responsive';

export const useIsMobile = () => {
  return useMediaQuery({ query: '(max-width: 768px)' });
};

export const useIsTablet = () => {
  return useMediaQuery({ query: '(max-width: 1224px)' });
};
