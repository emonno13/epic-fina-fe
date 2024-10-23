import { Input } from 'antd';
import { FC, memo } from 'react';

const PreviewOpenEndedQuestion: FC<any> = memo((props) => {
  const { data, questionValue, onChange, disabled, onPressEnter } = props;
  return (
    <div className="preview-open-ended-question">
      <Input
        {...{
          defaultValue: questionValue?.content,
          onChange: (e) => onChange({ content: e.target.value }),
          suffix: data?.suffix,
          disabled,
          onPressEnter: e => {
            e.preventDefault();
            if (onPressEnter) onPressEnter(e);
          },
          size: 'large',
        }}
      />
    </div>
  );
});

export default PreviewOpenEndedQuestion;
