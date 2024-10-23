import { CloseOutlined } from '@ant-design/icons';
import HInlineAnswerOptionTitle from '../h-inline-answer-option/h-inline-answer-option-title';
import HInlineAnswerOptionDescription from '../h-inline-answer-option/h-inline-answer-option-description';
import HAddAnswerButton from '../h-add-answer-button';

export const HInlineAnswer = (props) => {
  const {
    value,
    handleDelete,
    handleSetCorrect,
    isSingleMode,
    isEditMode,
    Icon,
    iconSize = '30px',
    activeColor = 'var(--primary-color)',
    onAdd,
  } = props;
  return (
    <>
      {onAdd && <HAddAnswerButton {...{ onAdd, text: 'Add answer' }} />}
      {!onAdd && (
        <>
          <div
            style={{ width: '100%', justifyContent: 'space-between' }}
            className={'text-panel flex items-center'}
          >
            <div className="flex items-center">
              {/* <div
								className={`checker ${isSingleMode ? 'mode-single' : ''}`}
								onClick={handleSetCorrect}
							>
								{Icon && (
									<Icon
										className={'icon'}
										width={iconSize}
										height={iconSize}
										fill={value?.isCorrect ? '#ffffff' : activeColor}
									/>
								)}
								{!Icon && (
									<CheckIcon
										width={iconSize}
										height={iconSize}
										fill={value?.isCorrect ? '#ffffff' : activeColor}
									/>
								)}
							</div> */}
              <HInlineAnswerOptionTitle {...props} />
            </div>
            <CloseOutlined style={{ fontSize: 20 }} onClick={handleDelete} />
          </div>
          {isEditMode && <HInlineAnswerOptionDescription {...props} />}
        </>
      )}
    </>
  );
};
