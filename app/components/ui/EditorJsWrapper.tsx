'use client';

import Output from "editorjs-react-renderer";

type props = {
  data: any;
}
export const EditorJsWrapper = (props:props) => {
  return <Output data={props.data} />
}
