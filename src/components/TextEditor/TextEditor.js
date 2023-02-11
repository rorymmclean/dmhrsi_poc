import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor(props) {
  const { content, onChange, placeholder, id } = props;
  const ref = useRef();
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image']
    ]
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  return (
    <ReactQuill
      id={id}
      theme="snow"
      ref={ref}
      value={content}
      modules={modules}
      formats={formats}
      onChange={() => onChange(ref.current?.state?.value)}
      placeholder={placeholder}
    >
      <div className="my-editing-area" />
    </ReactQuill>
  );
}

export default Editor;
