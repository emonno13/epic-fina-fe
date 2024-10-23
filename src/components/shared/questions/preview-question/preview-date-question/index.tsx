import { DatePicker } from 'antd';
import moment from 'moment';
import { FC, memo } from 'react';

const PreviewDateQuestion: FC<any> = memo(({ questionValue, onChange, disabled }) => {
  return (
    <div>
      <DatePicker {...{
        defaultValue: questionValue?.content ? moment(questionValue?.content) : undefined,
        onChange: value => onChange({ content: value }),
        disabled,
        format: 'DD/MM/YYYY',
        style: { width: '100%' },
        size: 'large',
      }} />
    </div>
  );
});

export default PreviewDateQuestion;
