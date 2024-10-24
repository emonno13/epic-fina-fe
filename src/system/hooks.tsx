import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { isEqual } from 'underscore';

export const useSystemEnvironments = (): any => {
  const environments = useSelector((state: RootStateOrAny) => {
    return state?.system.environments;
  }, isEqual);
  return environments;
};

export const usePublicEnvironment = (key): any => {
  const environments = useSystemEnvironments();
  const publicEnv: any = environments?.public || {};
  return publicEnv[key];
};

export const usePrivateEnvironment = (key) => {
  const environments = useSystemEnvironments();
  const publicEnv: any = environments?.private || {};
  return publicEnv[key];
};

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
		  	setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
	  },
	  [delay, value],
  );

  return debouncedValue;
}

export const scrollToTop = () => {
  if (window) (window as any)?.mainViewRef?.current?.scrollTo(0, 0);
};
