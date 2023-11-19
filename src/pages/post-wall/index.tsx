import "./index.less";
import React, { useState } from 'react';
import MyEditor from "@/components/text-editor";




export default function PostWallPage() {



    return (
        <div className="container">
            <MyEditor></MyEditor>

        </div>
    );
}
PostWallPage.route = {
    [MENU_PATH]: "/post",
};
