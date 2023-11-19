import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';

interface UploadImgProps {
    onImageUpload: (file: File) => void; // Callback function to pass image data
}

const UploadImg: React.FC<UploadImgProps> = ({ onImageUpload }) => {
    const [fileList, setFileList] = useState([]);

    // const handleChange = (info) => {
    //     if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //         onImageUpload(info.file.originFileObj); // Pass the uploaded file to the parent component
    //     } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    //     setFileList(info.fileList.slice(-1)); // Keep only the last uploaded file
    // };

    return (
        <Upload
            fileList={fileList}

            beforeUpload={() => false} // Prevent automatic uploading
        >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    );
};

export default UploadImg;
