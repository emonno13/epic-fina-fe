import { EnterOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useRef, useState } from 'react';
import { useHCommentAddNewComment, useHCommentProps } from './contexts/h-comment-context';
import { useHTranslation } from '../../../../lib/i18n';

export const HCommentInput = () => {
  const hcommentProps = useHCommentProps();
  const addNewComment = useHCommentAddNewComment();
  const [value, onChangeValue] = useState('');
  const refInput = useRef<any>(null);
  const { t } = useHTranslation('admin-common');

  const addComment = () => {
    handleAddNewComment();
    refInput.current.focus();
    onChangeValue('');
  };

  const handleAddNewComment = () => {
    const newComment = {
      content: value,
    };
    addNewComment && addNewComment(newComment);
  };
  
  const handleAutoAddComment = (event) => {
    if ((event.ctrlKey && event.keyCode == 13) || (event.key == 'Enter' && event.shiftKey)) {
      addComment();
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input.TextArea ref={refInput} rows={hcommentProps.inputRows || 4}
        onKeyDown={handleAutoAddComment}
        onChange={(e) => onChangeValue(e.target.value)} value={value}
        placeholder={hcommentProps?.placeholder || t('Enter the comment', { vn: 'Enter để xuống dòng, Ctrl/Shift + Enter để thêm comment' })}/>
      {!!value && (
        <Button onClick={addComment} type={'link'} className="button-send-message">
          {hcommentProps?.sendIcon || <EnterOutlined style={{ fontSize: '20px' }}/>}
        </Button>
      )}
    </div>
  );
};
