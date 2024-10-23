import { PlusOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import ImgCrop from 'antd-img-crop';
import { useMemo, useRef } from 'react';
import { Popover } from 'antd';
import Cookies from 'js-cookie';
import HColorPalette from '@components/shared/common-form-elements/h-color-palette';
import { endpoints } from '@lib/networks/endpoints';
import HUploadAnswerImageConfigs from './h-upload-image-configs';
import { FILTER_COLOR_PALETTES } from './constants';
import {
  MEDIA_DISPLAY_MODES,
  MEDIA_DISPLAY_MODES_MAP_CLASSNAME,
  MEDIA_RATIO_MAP_TO_VALUE,
} from '../types';

import './h-upload-image.module.scss';

export interface HUploadAnswerImageProps {
  value?: {
    url?: string;
    overLayColor?: string;
  };
  onChange?: any;
  isEditMode?: boolean;
  onClick?: any;
  mediaDisplayMode?: string;
  mediaRatio?: string;
  titleRef?: any;
  handleDelete?: Function;
  handleSetCorrect?: Function;
  isSingleMode?: boolean;
  isPreview?: boolean;
}

const HUploadAnswerImage = ({
  value,
  onChange,
  isEditMode = true,
  onClick,
  mediaDisplayMode,
  mediaRatio,
  titleRef,
  handleDelete,
  handleSetCorrect,
  isSingleMode,
  isPreview = false,
}: HUploadAnswerImageProps) => {
  const wrapperRef = useRef(null);
  const onWrapperClick = (e) => {
    if (onClick) onClick(e);
    if (isEditMode) {
      e.stopPropagation();
    }
  };
  const onDeleteImage = (e) => {
    e.stopPropagation();
    if (handleDelete) handleDelete(e);
  };
  const onSetCorrect = (e) => {
    e.stopPropagation();
    if (handleSetCorrect) handleSetCorrect();
  };
  const onUploadChange = ({ file }) => {
    const { status, response } = file;
    if (status === 'done' && Array.isArray(response) && response.length > 0) {
      const uploadDetail = response[0];
      onChange({ url: uploadDetail?.url });
    }
  };

  const uploadContent = useMemo(() => {
    if (mediaDisplayMode === MEDIA_DISPLAY_MODES.MEDIA_BELOW_TEXT) {
      return '';
    }
    return (
      <div className="h-upload-answer-image__upload-content">
        <PlusOutlined />
        <div>Upload image</div>
      </div>
    );
  }, [mediaDisplayMode]);

  const imageContent = (
    <div className="h-upload-answer-image__image-wrapper">
      <HUploadAnswerImageConfigs
        {...{
          onSetCorrect,
          onDeleteImage,
          isTranparentBackground: value?.overLayColor === 'transparent',
          isSingleMode,
          isPreview,
        }}
      />
      <div
        style={{
          backgroundColor: value?.overLayColor || '#00000080',
        }}
        className="h-upload-answer-image__image-wrapper__overlay"
      />
      <img src={value?.url} />
    </div>
  );

  const content = () => {
    if (isPreview) {
      return imageContent;
    }
    return (
      <Popover
        overlayClassName="h-upload-answer-image-filter-color-popover"
        content={
          <HColorPalette
            value={value?.overLayColor || '#00000080'}
            type="horizontal"
            schema={FILTER_COLOR_PALETTES}
            onChange={(color) => onChange({ overLayColor: color })}
            wrapperProps={{
              onClick: (e) => {
                e.stopPropagation();
              },
            }}
          />
        }
      >
        {imageContent}
      </Popover>
    );
  };

  const wrapperStyle = useMemo(() => {
    if (!wrapperRef?.current || !mediaRatio) {
      return {};
    }
    const ratio = MEDIA_RATIO_MAP_TO_VALUE[mediaRatio];
    const wrapperWidth = (wrapperRef.current as any)?.offsetWidth;
    const style: any = {
      height: wrapperWidth / ratio,
    };
    if (mediaDisplayMode === MEDIA_DISPLAY_MODES.MEDIA_BELOW_TEXT) {
      style.width = style.height * ratio;
    }
    if (
      mediaDisplayMode === MEDIA_DISPLAY_MODES.MEDIA_BELOW_TEXT &&
      titleRef?.current?.offsetHeight > style.height
    ) {
      style.height = titleRef?.current?.offsetHeight;
      style.width = style.height * ratio;
    }
    style.flex = `0 1 ${style.height}px`;
    return style;
  }, [
    wrapperRef.current,
    mediaRatio,
    mediaDisplayMode,
    titleRef?.current?.offsetHeight,
  ]);

  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      className={`h-upload-answer-image-wrapper ${
        mediaDisplayMode
          ? MEDIA_DISPLAY_MODES_MAP_CLASSNAME[mediaDisplayMode]
          : 'media-below-text'
      }`}
      onClick={onWrapperClick}
    >
      <ImgCrop
        rotate
        aspect={mediaRatio ? MEDIA_RATIO_MAP_TO_VALUE[mediaRatio] : 1}
      >
        <Dragger
          {...{
            // beforeUpload,
            showUploadList: false,
            className: 'h-upload-answer-image',
            disabled: isPreview,
            action: endpoints.endpointWithApiDomain('/files'),
            headers: { Authorization: `Bearer ${Cookies.get('h2token')}` },
            onChange: onUploadChange,
          }}
        >
          {value?.url ? content() : uploadContent}
        </Dragger>
      </ImgCrop>
    </div>
  );
};

export default HUploadAnswerImage;
