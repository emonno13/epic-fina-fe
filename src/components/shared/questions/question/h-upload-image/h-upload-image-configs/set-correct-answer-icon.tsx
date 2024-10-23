import { CheckCircleFilled, CheckOutlined } from '@ant-design/icons';

const SetCorrectAnswerIcon = ({ onSetCorrect, isSingleMode }) =>
  isSingleMode ? (
    <CheckCircleFilled onClick={onSetCorrect} />
  ) : (
    <CheckOutlined onClick={onSetCorrect} />
  );

export default SetCorrectAnswerIcon;
