import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import {Button, Select} from "antd";

export default class TextEditor extends React.Component {
    handleSelect = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };

    addService = () =>{

    }

    state = {
        editorState: BraftEditor.createEditorState()
    }

    handleChange = (editorState) => {
        this.setState({ editorState })
    }

    preview = () => {

        if (window.previewWindow) {
            window.previewWindow.close()
        }

        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()

    }

    buildPreviewHtml () {

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
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

    }

    render () {

        const excludeControls = [
            {key:"font-size", title:" aaaaaa"},
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
        ]

        const extendControls = [
            {
                key: 'custom-button',
                type: 'button',
                text: 'Preview',
                onClick: this.preview
            }
        ]

        return (
            <div className="editor-wrapper">
                <Select
                    placeholder="Choisir le type"
                    onChange={this.handleSelect}
                    style={{ width: 200 }}
                    options={[
                        {
                            value: 'Event',
                            label: 'Event',
                        },
                        {
                            value: 'Atelier',
                            label: 'Atelier',
                        },
                        {
                            value: 'Cours à domicile',
                            label: 'Cours à domicile',
                        },
                    ]}
                />
                <br />
                <br />
                <BraftEditor
                    language="en"
                    onChange={this.handleChange}
                    excludeControls={excludeControls}
                    extendControls={extendControls}
                    contentStyle={{height: 400}}
                />
                <br />
                <br />
                <br />
                <br />
                <Button type="primary" onClick={this.addService}>Ajouter</Button>
            </div>
        )

    }

}
