import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { i18nChangeLanguage } from '@wangeditor/editor'
import { SlateElement } from '@wangeditor/editor'
import {Button, Form, message} from "antd";
import {addOrder, addService} from "@/api/service";

type ImageElement = SlateElement & {
    src: string
    alt: string
    url: string
    href: string
}
i18nChangeLanguage('en')

function MyEditor({formData,onResetForm}:any) {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法

    // 编辑器内容
    const [content, setHtml] = useState('')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml("")
        }, 1500)
    }, [])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { }  // TS 语法
    // const toolbarConfig = { }                        // JS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        // const editorConfig = {                         // JS 语法
        placeholder: '...',
    }
    editorConfig.MENU_CONF = {
        uploadImage: {
            server: process.env.REACT_APP_API_BASEURL + '/post-upload-img',
            fieldName: "postImg"
        },
        uploadVideo: {
            server: process.env.REACT_APP_API_BASEURL + '/post-upload-img',
            fieldName: "postImg",
            maxFileSize: 1024 * 1024 * 1024,
            onError(_file: any, err: any) {
                message.error(err.message)
            },
        }
    }


    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])



    const handleAdd = () =>{
        console.log("formData",formData)
        const dataToSend = { ...formData, content };
        addService(dataToSend).then((res) => {
            if (res.status === 0) {
                onResetForm();
                message.success(res.msg);
            }
        });
        addOrder(dataToSend).then((res) => {
            if (res.status === 0) {
                onResetForm();
                message.success(res.msg);
            }
        });
        console.log('dataToSend', dataToSend);
    }
    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={content}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                <Button type="primary" onClick={handleAdd}> Add</Button>
            </div>
        </>
    )
}

export default MyEditor
