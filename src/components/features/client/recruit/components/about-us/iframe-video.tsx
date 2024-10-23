import { useIsMobile } from '../../../../../../lib/hooks/use-media';

import './iframe-video.module.scss';

const IframeVideo = () => {
  const isMobile = useIsMobile();
  return (
    <div className="max-w-1100 m-auto">
      <div className="iframe-video__youtube">
        <iframe width={isMobile ? '270' : '600'} height={isMobile ? '150' : '340'} src="https://www.youtube.com/embed/nL65Er5D7js" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default IframeVideo;
