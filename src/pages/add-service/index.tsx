import TextEditor from "@/components/text-editor";
import "./index.less";
import React, { useState } from 'react';


export default function SearchPage() {


    return (
        <div className="search-container">
            <TextEditor />
        </div>
    );
}
SearchPage.route = {
    // [MENU_PATH]: "/list/text-editor",
    [MENU_PATH]: "/list/card",
};
