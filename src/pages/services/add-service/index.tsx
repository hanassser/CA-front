
import "./index.less";
import React, { useState } from 'react';
import {Form, Select, Input, DatePicker, InputNumber,} from "antd";
import {DatePickerProps, RangePickerProps} from "antd/es/date-picker";
import UploadImg from "@/components/upload";
import MyEditor from "@/components/text-editor";


export default function SearchPage() {
    const handleSelect = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };

    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const rules = [{ required: true, message: 'Must' }];

    const [formData, setFormData] = useState({});
    const handleFormValuesChange = (changedValues: Record<string, any>, allValues: Record<string, any>) => {
        setFormData(allValues);
        console.log(formData,'aaa')
    };
    const { TextArea } = Input;
    const handleResetForm = () => {
        console.log("kkkk")
        // setTimeout(() => {
        //     window.location.reload(); // Reload the page after 1 second
        // }, 1000);
    };





    return (
        <div className="container">
            <Form
                labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }}
                  layout="horizontal"
                autoComplete="off"
                onValuesChange={handleFormValuesChange}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={rules}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Type" name="type" rules={rules}>
                    <Select
                        placeholder="Choisir le type"
                        onChange={handleSelect}
                        style={{ width: 200 }}
                        options={[
                            {
                                value: 'Subscription',
                                label: 'Subscription',
                            },
                            {
                                value: 'Event',
                                label: 'Event',
                            },
                            {
                                value: 'Workshop',
                                label: 'Workshop',
                            },
                            {
                                value: 'Course',
                                label: 'Course',
                            },
                            {
                                value: 'Reservation',
                                label: 'Reservation',
                            },
                        ]}
                    />
                </Form.Item >
                <Form.Item label="Date" name="date" rules={[{ required: true}]}>
                    <DatePicker  onChange={onChange} onOk={onOk} showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"/>
                </Form.Item>
                <Form.Item label="Total place" name="totalPlace" rules={rules}>
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}
                >
                    <TextArea showCount maxLength={50}  />
                </Form.Item>


                <br/>
                <Form.Item label="Content" >
                    <MyEditor formData={formData} onResetForm={handleResetForm}></MyEditor>
                     </Form.Item>

            </Form>



        </div>
    );
}
SearchPage.route = {
    [MENU_PATH]: "/manage/add-service",
};
