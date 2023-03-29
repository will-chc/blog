import React, { useRef, useState } from 'react';
import styles from './index.module.less';
import { Button, Form, Input } from 'antd';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import request from '../../utils/server';
import { useHistory } from 'react-router-dom';

const FormItem = Form.Item;
const Editor: React.FC = () => {
    const [form] = Form.useForm();
    const [text, setText] = useState("");

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];
    const history = useHistory();
    const handleChange = (value: string) => {
        setText(value);
    };

    const handleSaveToFile = () => {
        const {getFieldValue} = form;
        const title = getFieldValue('title');
        request('/saveblog',{title,text},"post").then(()=>{
            history.push('/doc');
        });
    };

    return (
        <div className={styles['editor-wrapper']}>
            <Form form={form}>
                <FormItem label='标题' name='title'>
                    <Input />
                </FormItem>
            </Form>
            <div style={{ margin: '40px' }}>
                <ReactQuill
                    value={text}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    style={{ height: 500 }}
                />
            </div>
            <Button className={styles['btn']} onClick={handleSaveToFile}>保存</Button>
        </div>
    )
}
export default Editor;