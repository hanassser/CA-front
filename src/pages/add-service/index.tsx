import TextEditor from "@/components/text-editor";
import "./index.less";
import React, { useState } from 'react';
import {Form, Select, Input, DatePicker, InputNumber,} from "antd";
import {DatePickerProps, RangePickerProps} from "antd/es/date-picker";


export default function SearchPage() {
    const handleSelect = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };
    const { RangePicker } = DatePicker;

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
    const handleFormValuesChange = (changedValues, allValues) => {
        setFormData(allValues);
        console.log(formData,'aaa')
    };
    return (
        <div className="search-container">
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
                </Form.Item >
                <Form.Item label="Date" name="date">
                    <DatePicker showTime onChange={onChange} onOk={onOk} showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"/>
                </Form.Item>
                <Form.Item label="Range" name="dateRange">
                    <RangePicker />
                </Form.Item>
                <Form.Item label="Details" >
                </Form.Item>
            </Form>
            <TextEditor formData={formData} />


        </div>
    );
}
SearchPage.route = {
    [MENU_PATH]: "/list/add-service",
};
