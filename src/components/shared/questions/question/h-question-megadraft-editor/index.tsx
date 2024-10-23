import { MegadraftEditor, editorStateFromRaw, editorStateToJSON } from 'megadraft';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import ImgPlugin from '../../question-plugins/image';

type HQuestionMegadraftEditorProps = {
  initValue?: any;
  onChange?: Function;
  placeholder?: string;
  readOnly?: boolean;
};

const HQuestionMegadraftEditor = ({
  onChange,
  initValue,
  placeholder = 'Add some text',
  readOnly = false,
}: HQuestionMegadraftEditorProps) => {
  const [editor, setEditor] = useState(editorStateFromRaw(null));
  const initValueRef = useRef(initValue);
  const onEditorChange = (editorState) => {
    setEditor(editorState);
    if (onChange) onChange({ content: JSON.parse(editorStateToJSON(editorState)) });
  };
  useEffect(() => {
    if (initValueRef.current) {
      setEditor(editorStateFromRaw(initValueRef.current));
    }
  }, [initValueRef]);
  return (
    <MegadraftEditor
      {...{
        plugins: [ImgPlugin],
        editorState: editor,
        onChange: onEditorChange,
        placeholder,
        readOnly,
      }}
    />
  );
};

export default HQuestionMegadraftEditor;
