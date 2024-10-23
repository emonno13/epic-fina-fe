import { useEffect, useState } from 'react';

export const useWindowScroll = (handleScroll) => {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export const useResizeHeightWhenScroll = ({ maxHeight, minHeight }) => {
  const [resizeHeight, setResizeHeight] = useState(maxHeight);

  const handleScroll = () => {
    const scrollTop = window.scrollY,
      result = Math.max(minHeight, maxHeight - scrollTop);
    setResizeHeight(result);
  };

  useWindowScroll(handleScroll);

  return resizeHeight;
};
