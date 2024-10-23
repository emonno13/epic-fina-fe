import cls from 'classnames';
import DeleteAnswerIcon from './delete-answer-icon';
import SetCorrectAnswerIcon from './set-correct-answer-icon';

const HUploadAnswerImageConfigs = ({
  onSetCorrect,
  onDeleteImage,
  isTranparentBackground = false,
  isSingleMode = false,
  isPreview = false,
}) => {
  return (
    <div
      className={cls('h-upload-answer-image__image-wrapper__actions', {
        'transparent-background': isTranparentBackground,
      })}
    >
      <SetCorrectAnswerIcon {...{ onSetCorrect, isSingleMode }} />
      {!isPreview && <DeleteAnswerIcon {...{ onDeleteImage }} />}
    </div>
  );
};

export default HUploadAnswerImageConfigs;
