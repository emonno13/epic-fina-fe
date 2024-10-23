'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const usePathname = () => {
  const router = useRouter();
  const [pathName, setPathName] = useState('/not-found');

  useEffect(() => {
    console.log(window?.location?.pathname);
    setPathName(window?.location?.pathname);
  }, [router]);

  return pathName;
};

export default usePathname;
