import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { selectTinymceApiID } from "../../redux/asechSlice";
import "../../assets/css/storyStyle.scss";

export default function HtmlEditor({ ...props }) {
  const [data, setData] = useState(props.inputText);
  const editorRef = useRef(null);
  const tinymceApiId = useSelector(selectTinymceApiID);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setData(editorRef.current.getContent());
      props.setInputText(editorRef.current.getContent());
    }
  };

  //   const handleEditorChange = (content) => {
  //     props.setInputText(content); // Update parent component's state
  //   };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(props.inputText || ""); // Set content to the new props.inputText
    }
  }, [props.inputText]);
  return (
    <>
      {tinymceApiId && (
        <>
          <Editor
            apiKey={tinymceApiId}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={data}
            // onChange={(e) => handleEditorChange(e.target.getContent())} // Handle onChange event
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                // "help",
                "wordcount",
                "importcss",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_css: "../../assets/css/storyStyle.scss", // External CSS file
              //   content_style: "p{ color: red;}",
            }}
          />
          <button className="btn btn-dark rounded-0 my-2" onClick={log}>
            Log editor content
          </button>
          <hr />
        </>
      )}
    </>
  );
}
