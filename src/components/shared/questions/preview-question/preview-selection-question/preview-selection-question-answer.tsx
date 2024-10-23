import { CheckCircleFilled, CheckOutlined } from '@ant-design/icons';
import { useMemo, useRef, useState } from 'react';
import { MEDIA_DISPLAY_MODES_MAP_CLASSNAME, MEDIA_RATIO_MAP_TO_VALUE } from '../../question/types';

const PreviewSeletionQuestionAnswer = ({
  mediaDisplayMode,
  mediaRatio,
  selectionMode,
  data,
  onChange,
  isSelected,
}) => {
  const wrapperRef = useRef(null);
  const { color, content, image } = data;
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const wrapperStyle = useMemo(() => {
    if (!wrapperWidth || !mediaRatio) {
      return {};
    }
    const ratio = MEDIA_RATIO_MAP_TO_VALUE[mediaRatio];
    const style: any = {
      height: wrapperWidth / ratio,
    };
    return style;
  }, [wrapperWidth, mediaRatio, mediaDisplayMode]);

  const renderIconCheck = () => {
    if (selectionMode === 'single') {
      return (
        <CheckCircleFilled
          className="preview-selection-question-answer__image-wrapper__overlay__check-icon"
          onClick={onChange}
        />
      );
    }
    return (
      <CheckOutlined
        className="preview-selection-question-answer__image-wrapper__overlay__check-icon"
        onClick={onChange}
      />
    );
  };

  return (
    <div className={`preview-selection-question-answer ${MEDIA_DISPLAY_MODES_MAP_CLASSNAME[mediaDisplayMode]}`}>
      <div
        ref={wrapperRef}
        style={wrapperStyle}
        className="preview-selection-question-answer__image-wrapper"
      >
        <div className="preview-selection-question-answer__image-wrapper__overlay">
          {renderIconCheck()}
        </div>
        
        <img
          src={image.url}
          onLoad={() => {
            setWrapperWidth((wrapperRef.current as any)?.offsetWidth);
          }}
        />
      </div>
      <div className="preview-selection-question-answer__content">
        {content}
      </div>

      <style jsx>{`
        .preview-selection-question-answer__image-wrapper__overlay {
          background-color: ${image?.overLayColor || '#00000080'}
        }
        .preview-selection-question-answer__content {
          color: ${color};
          width: ${wrapperWidth}
        }
        .preview-selection-question-answer {
          background-color: ${isSelected ? 'var(--primary-color)' : '#fff'}
        }
      `}</style>
    </div>
  );
};

export default PreviewSeletionQuestionAnswer;
