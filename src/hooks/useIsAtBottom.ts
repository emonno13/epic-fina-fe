'use client';

import { useEffect, useRef, useState } from 'react';

// Custom hook to determine if content is at the bottom of a scroll container
const useIsAtBottom = ({ className = '' }: any) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isExist, setIsExist] = useState<boolean>(false);

  // Get the current element from the ref
  const container = containerRef.current;

  const handleCheckShowScrollButton = () => {
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1; // Tolerance for minor differences
    setIsAtBottom(atBottom);
  };

  // listen when the container div exist
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (className === '') return;
      if (document?.querySelector(`.${className}`)) {
        containerRef.current = document?.querySelector(`.${className}`);
        setIsExist(true);
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    // Cleanup function to disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, [className]);

  // listen whether show scroll button or not when scrolling
  useEffect(() => {
    if (container) {
      container.addEventListener('scroll', handleCheckShowScrollButton);
    }
    // Initial check to set the correct state
    handleCheckShowScrollButton();
    // Cleanup event listener on component unmount
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleCheckShowScrollButton);
      }
    };
  }, [isExist]);

  // listen whether show scroll button or not when scroll height changed
  useEffect(() => {
    if (!container) return; // If the ref is not attached to an element, do nothing
    // Update scrollHeight state whenever a change is detected
    const updateScrollHeight = () => {
      // if scroll heigh changed - check if button should be showed or not
      handleCheckShowScrollButton();
    };
    // Create a MutationObserver to monitor changes in child elements
    const mutationObserver = new MutationObserver(() => {
      updateScrollHeight();
    });
    // Start observing the container element
    mutationObserver.observe(container, { childList: true, subtree: true });
    // Initial update of scrollHeight
    updateScrollHeight();
    // Cleanup observer on component unmount
    return () => {
      mutationObserver.disconnect();
    };
  }, [isExist]);

  return { isAtBottom };
};

export default useIsAtBottom;
