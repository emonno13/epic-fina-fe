'use client';
import { useEffect, useRef } from 'react';

interface AutoplayVideoProps {
  id: string;
  className?: string;
  src: string;
}

const AutoplayVideo: React.FC<AutoplayVideoProps> = ({
  id,
  className,
  src,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const videoElement = document.getElementById(id) as HTMLVideoElement;
          if (videoElement && videoRef.current) {
            videoRef.current.click();
            videoRef.current.focus();
            videoRef.current.play().catch((err) => {
              console.error('Autoplay was prevented:', err);
            });
            observer.disconnect(); // Stop observing after playing the video
          }
        }
      });
    });

    // Start observing changes to the body element
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect(); // Cleanup the observer on component unmount
    };
  }, [id]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Explicitly load the new video source
      videoRef.current.play(); // Play the video after loading the new source
    }
  }, [src]); // Re-run this effect when src changes

  return (
    <>
      <video
        id={id}
        ref={videoRef}
        playsInline
        autoPlay
        loop
        muted
        preload="none"
        aria-label="Video player"
        className={`outline-none [clip-path:inset(0px)] ${className}`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default AutoplayVideo;
