import "./index.less";
import React, { useState } from 'react';
import TextEditor from "@/components/text-editor";



export default function PostWallPage() {



    return (
        <div className="container">
            <TextEditor isCard={true}/>

        </div>
    );
}
PostWallPage.route = {
    [MENU_PATH]: "/post",
};
