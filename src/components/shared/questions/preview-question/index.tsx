import { AnyObject } from '@components/shared/atom/type';
import { LabelItem } from '@components/shared/common/h-label/h-label-title';
import cls from 'classnames';
import dynamic from 'next/dynamic';
import { FC, memo } from 'react';
import HQuestionMegadraftEditor from '../question/h-question-megadraft-editor';
import { QUESTION_TYPES } from '../question/types';
import PreviewDateQuestion from './preview-date-question';
import PreviewImageSelectionQuestion from './preview-image-selection-question';
import PreviewOpenEndedQuestion from './preview-open-ended-question';
import PreviewOpenEndedNumberQuestion from './preview-question-open-ended-number-question';
import PreviewReorderQuestion from './preview-reorder-question';
import PreviewTextSelectionQuestion from './preview-text-selection-question';

import './preview-question.module.scss';

const Fade: any = dynamic(() => import('react-reveal/Fade'), { ssr: false });

export type PreviewQuestionProps = {
  data: AnyObject;
  onChange?: Function;
  questionValue?: AnyObject;
  disabled?: boolean;
  isPreviewHome?: boolean;
};

export const PreviewQuestionByType: FC<any> = memo((props) => {
  const { type, ...restProps } = props;
  switch (type) {
    case QUESTION_TYPES.IMAGE_SELECTION:
      return <PreviewImageSelectionQuestion {...restProps} />;
    case QUESTION_TYPES.TEXT_SELECTION:
      return <PreviewTextSelectionQuestion {...restProps} />;
    case QUESTION_TYPES.OPEN_ENDED:
      return <PreviewOpenEndedQuestion {...restProps} />;
    case QUESTION_TYPES.REORDER:
      return <PreviewReorderQuestion {...restProps} />;
    case QUESTION_TYPES.OPEN_ENDED_NUMBER:
      return <PreviewOpenEndedNumberQuestion {...restProps} />;
    case QUESTION_TYPES.DATE:
      return <PreviewDateQuestion {...restProps} />;
    default:
      return <></>;
  }
});

const PreviewQuestion = memo(
  ({
    data,
    onChange = (f) => f,
    questionValue,
    disabled,
    isPreviewHome = false,
  }: PreviewQuestionProps) => {
    const { type, id, required } = data;
    const onPreviewQuestionChange = (value) => {
      onChange({
        ...value,
        questionId: id,
        type,
        questionData: data,
      });
    };

    if (isPreviewHome) {
      return (
        <div className={'ui-questions-panel'}>
          <div className={'cq-question-panel'}>
            <div
              className={cls('ui-question-name', {
                // require: !!required,
              })}
              style={{ textAlign: 'center' }}
            >
              {/* <LabelItem 
              label={<HQuestionMegadraftEditor initValue={data?.content} readOnly />}
              titleTooltip={<span className="ui-question-name__require">
                {data?.description && ` (${data.description})`}
              </span>}
              labelStrong={false}
              uppercaseLabel={false}
              showFirstIcon={false}
              uppercaseTooltip={false}
            /> */}
              <div>
                <HQuestionMegadraftEditor initValue={data?.content} readOnly />

                <p>{data?.description}</p>
              </div>
            </div>
            <PreviewQuestionByType
              {...{
                data,
                onChange: onPreviewQuestionChange,
                questionValue,
                disabled,
                type,
              }}
            />
          </div>
        </div>
      );
    }

    return (
      <Fade>
        <div className={'ui-questions-panel'}>
          <div className={'cq-question-panel'}>
            <div
              className={cls('ui-question-name', {
                require: !!required,
              })}
            >
              <LabelItem
                label={
                  <HQuestionMegadraftEditor
                    initValue={data?.content}
                    readOnly
                  />
                }
                titleTooltip={
                  <span className="ui-question-name__require">
                    {data?.description && ` (${data.description})`}
                  </span>
                }
                labelStrong={false}
                uppercaseLabel={false}
                showFirstIcon={false}
                uppercaseTooltip={false}
              />
            </div>
            <PreviewQuestionByType
              {...{
                data,
                onChange: onPreviewQuestionChange,
                questionValue,
                disabled,
                type,
              }}
            />
          </div>
        </div>
      </Fade>
    );
  },
);

export default PreviewQuestion;
