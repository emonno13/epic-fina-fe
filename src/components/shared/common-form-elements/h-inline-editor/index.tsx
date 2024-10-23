import React, { useEffect, useRef, useState, FC, ReactElement } from 'react';
import { ContentState, EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import { stateFromHTML } from 'draft-js-import-html';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import { stateToHTML } from 'draft-js-export-html';

import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

export const HInlineEditor: FC = (props: any): ReactElement => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const editorRef = useRef<any>(null);

  const { onChange, value = '', placeholder, autoFocus } = props;
  const handleEditorChanged = (editorState: EditorState) =>{
    setEditorState(editorState);
    onChange(stateToHTML(editorState.getCurrentContent()));
  };

  useEffect(() => {
    const state: ContentState = stateFromHTML(value);
    setEditorState(EditorState.createWithContent(state));
    onChange(value);
  },[]);

  return (
    <div className="ant-input ant-input-lg h-inline-editor" onClick={() => editorRef.current.focus()} style = {{ minHeight:150 }} >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleEditorChanged}
        placeholder={placeholder}
        plugins={[inlineToolbarPlugin]}
      />
      <InlineToolbar/>
    </div>
  );
};