import { HInlineEditableText } from '@components/shared/common-form-elements/h-inline-editable-text';

const HInlineAnswerOptionDescription = ({
  initValue,
  isEditMode,
  onChange,
  value,
}) => (
  <div className={'description'}>
    <HInlineEditableText
      {...{
        value: initValue.current.hint,
        isEditMode,
        onChange: (hint) => onChange({ ...value, hint }),
      }}
    ></HInlineEditableText>
  </div>
);

export default HInlineAnswerOptionDescription;
