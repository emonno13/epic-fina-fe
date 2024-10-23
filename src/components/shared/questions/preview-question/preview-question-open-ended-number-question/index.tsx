import { HInputNumber } from '@components/shared/common-form-elements/h-input';
import { FC, memo } from 'react';

const PreviewOpenEndedNumberQuestion: FC<any> = memo((props) => {
  const { data, questionValue, onChange, disabled, onPressEnter } = props;
  return (
    <div className="preview-open-ended-question">
      <HInputNumber
        {...{
          defaultValue: questionValue?.content,
          onChange: (value) => onChange({ content: value }),
          suffix: data?.suffix,
          disabled,
          formatter: (value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          parser: (value) => value?.replace(/(,*)/g, '') || '',
          onPressEnter: (e) => {
            e.preventDefault();
            if (onPressEnter) onPressEnter(e);
          },
          min: 0,
          size: 'large',
        }}
      />
    </div>
  );
});

export default PreviewOpenEndedNumberQuestion;
