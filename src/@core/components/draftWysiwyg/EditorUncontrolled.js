// ** Styles
import '@styles/react/libs/editor/editor.scss'

import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromHTML  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

function EditorUncontrolled({ onContentChange,error,HtmlContent }) {
  const htmlContent=HtmlContent!=undefined?HtmlContent:"";
  const ContentForEditor=EditorState.createWithContent( ContentState.createFromBlockArray(
    convertFromHTML(htmlContent)
  ))
  const [editorState, setEditorState] = useState(ContentForEditor);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const htmlValue = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    onContentChange(htmlValue);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}

export default EditorUncontrolled;
