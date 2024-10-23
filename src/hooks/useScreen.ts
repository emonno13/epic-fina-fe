'use client';

import { useEffect, useState } from 'react';

const useScreen = () => {
  const [screens, setScreens] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: true,
  });
  const updateDimensions = () => {
    const screenWidth = window.innerWidth;
    setScreens({
      isMobile: screenWidth < 640,
      isTablet: screenWidth > 640 && screenWidth < 1024,
      isLaptop: screenWidth > 1024 && screenWidth <= 1280,
      isDesktop: screenWidth > 1280,
    });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return screens;
};

export default useScreen;
