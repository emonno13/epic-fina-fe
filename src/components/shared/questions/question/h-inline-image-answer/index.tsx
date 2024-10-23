import React from 'react';
import HUploadAnswerImage from '../h-upload-image';
import { MEDIA_DISPLAY_MODES_MAP_CLASSNAME } from '../types';
import HAddAnswerButton from '../h-add-answer-button';
import HInlineAnswerOptionTitle from '../h-inline-answer-option/h-inline-answer-option-title';
import HInlineAnswerOptionDescription from '../h-inline-answer-option/h-inline-answer-option-description';

export const HInlineImageAnswer = (props) => {
  const {
    onChange,
    selectable,
    onAdd,
    mediaDisplayMode,
    mediaRatio,
    value,
    titleRef,
    handleDelete,
    handleSetCorrect,
    isSingleMode,
    isEditMode,
    mediaWidth,
    isPreview,
  } = props;
  return (
    <>
      {onAdd && <HAddAnswerButton {...{ onAdd, text: 'Add answer' }} />}
      {!onAdd && (
        <div className="text-panel flex-grow">
          <div
            {...{
              style: {
                width: mediaWidth,
              },
              className: mediaDisplayMode
                ? MEDIA_DISPLAY_MODES_MAP_CLASSNAME[mediaDisplayMode]
                : '',
            }}
          >
            {selectable && (
              <HUploadAnswerImage
                {...{
                  value: value?.image || {},
                  onChange: (newImage) => {
                    onChange({
                      ...value,
                      image: {
                        ...value.image,
                        ...newImage,
                      },
                    });
                  },
                  mediaDisplayMode,
                  mediaRatio,
                  titleRef,
                  handleDelete,
                  handleSetCorrect,
                  isSingleMode,
                  isPreview,
                }}
              />
            )}
            <HInlineAnswerOptionTitle
              {...{ ...props, isEditMode: !isPreview }}
            />
          </div>
          {isEditMode && (
            <HInlineAnswerOptionDescription
              {...{ ...props, isEditMode: !isPreview }}
            />
          )}
        </div>
      )}
    </>
  );
};
