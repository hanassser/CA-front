import 'braft-editor/dist/index.css'
import React, {useState} from 'react'
import BraftEditor, { EditorState } from 'braft-editor'
import {Button, Form, message,} from "antd";
import './index.less';
import {addService} from "@/api/service";
import {addPost, getPost} from "@/api/post-wall";


function TextEditor({formData, imageData, isCard}:any) {
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));

    const handleEditorChange = (newEditorState: any) => {
        setEditorState(newEditorState);
    };

    // const preview = () => {
    //     if (window.previewWindow) {
    //         window.previewWindow.close();
    //     }
    //
    //     window.previewWindow = window.open();
    //     window.previewWindow.document.write(buildPreviewHtml());
    //     window.previewWindow.document.close();
    // };


    const [form] = Form.useForm();
    const saveEditorContent = () => {
        const content = editorState.toHTML();
        const dataToSend = { ...formData, content };
        const dataPostWall = {content}
        console.log('dataToSend', imageData);
        if(isCard === true){
            addPost(dataPostWall).then((res) => {
                console.log(11)
                if (res.status === 0) {
                    message.success(res.msg);
                }
            });
        } else {
        addService(dataToSend).then((res) => {
            if (res.status === 0) {
                form.resetFields();
                message.success(res.msg);
            }
        });
        };
    };





    const buildPreviewHtml = () => {
        return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `;
    };
    const excludeControls = [
        'letter-spacing',
        'line-height',
        'clear',
        'headings',
        'list-ol',
        'list-ul',
        'remove-styles',
        'superscript',
        'subscript',
        'hr',
        'text-align'
    ];

    const extendControls = [
        {
            key: 'custom-button',
            type: 'button',
            text: 'Preview',

        }
    ];




    return (
        <div className='editor-wrapper'>

            <br/>
            <Button onClick={saveEditorContent} type='primary' className='btn'>Ajouter</Button>
        </div>
    );
}

export default TextEditor;


// <BraftEditor
//     value={editorState}
//     onChange={handleEditorChange}
//     language="en"
//     excludeControls={excludeControls}
//     extendControls={extendControls}
// />

