import React, { FC, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { API_KEY, configs } from './configs';
import { useCurrentUser } from '../../../../lib/providers/auth';

export const HTinyEditor: FC = (props: any) => {
  const {
    onChange, value = '', height = 600, fontsizeFormats = '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt',
  } = props;
  const ref = useRef<any>();
  const handleEditorChanged = (content, editor) => {
    onChange && onChange(content);
  };
  const currentUser = useCurrentUser();
  const currentAuthor = currentUser?.fullName || 'User';
  const userAllowedToResolve = 'Admin';
  
  return (
    <Editor
      ref={ref}
      value={value}
      apiKey={API_KEY}
      init={configs({ height, currentAuthor, userAllowedToResolve, fontsizeFormats })}
      onEditorChange={handleEditorChanged}
    />
  );
};

export default HTinyEditor;
