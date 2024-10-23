import { PlusOutlined } from '@ant-design/icons';

import './h-add-answer-button.module.scss';

const HAddAnswerButton = ({ onAdd, text }) => {
  return (
    <div className="h-add-answer-button" onClick={onAdd}>
      <PlusOutlined />
      {text}
    </div>
  );
};

export default HAddAnswerButton;
