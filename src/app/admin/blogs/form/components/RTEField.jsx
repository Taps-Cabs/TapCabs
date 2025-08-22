import React, { useEffect, useRef } from "react";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useBlogForm } from "../contexts/BlogFormContext";

function RTEField() {
    const editorRef = useRef();
    const { data, handleData } = useBlogForm();

    useEffect(() => {
        if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            const content = editorInstance.getMarkdown();
            handleData("content", content)
        }
    }, [data.content])

    const handleChange = () => {
        if (editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            const content = editorInstance.getMarkdown();
            handleData("content", content)
        }
    }

    return (
        <div className="border-t-2 pt-6 mt-6 w-full mx-auto bg-whiteCard text-primary">
            <div className="flex w-full justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Blog Content</h1>
            </div>
            <div className="bg-white">
                <Editor
                    ref={editorRef}
                    initialValue={data.content || ""}
                    initialEditType="wysiwyg"
                    useCommandShortcut={true}
                    autofocus={false}
                    height="600px"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default RTEField;




    // const [editorHeight, setEditorHeight] = useState("auto");

    // const adjustHeight = () => {
    //     if (editorRef.current) {
    //         const editorInstance = editorRef.current.getInstance();
    //         const editorContent = editorInstance.getMarkdown();

    //         if (editorContent) {
    //             const lineHeight = 25;
    //             const minHeight = 500;

    //             const calculatedHeight = Math.min(
    //                 Math.max(editorContent.split("\n").length * lineHeight, minHeight)
    //             );

    //             setEditorHeight(`${calculatedHeight}px`);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     adjustHeight();
    //     window.addEventListener("resize", adjustHeight);
    //     return () => window.removeEventListener("resize", adjustHeight);
    // }, []);



    
    // useEffect(() => {
    //     if (text && text.length > 0) {
    //         const editorInstance = editorRef.current.getInstance();
    //         editorInstance.setMarkdown(text);
    //     }
    // }, [text]);