import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import Doc from '../../components/Doc';
import request from '../../utils/server';
import { Form, Input, AutoComplete, DatePicker } from 'antd';
const FormItem = Form.Item;
interface docItem {
    text: string,
    title: string,
    date: number
}
const DocList: React.FC = () => {
    const [list, setList] = useState<docItem[]>([]);
    const [form] = Form.useForm();
    const [options, setOptions] = useState<any[]>([]);
    const [range,setRange] = useState<any[]>([]);

    const onSearch = (value: any) => {
        request('/title', { key: value }).then((res: any) => {
            const { data } = res
            setOptions(data.map((i: string) => ({ value: i })));
        })

    };

    const onSelect = (value: string) => {   
        request('/doc', { title: value }).then((res: any) => {
            const { arr } = res;
            setList(arr);
        })
    };
    const handleRangeChange = (dates:any) => {
        if(!dates) {
            request('/doc', { }).then((res: any) => {
                const { arr } = res;
                setList(arr);
            });
            return ;
        }
        const s = dates[0].unix();
        const e = dates[1].unix();

        const newList = list.filter((item:docItem)=>{
           const date = Math.floor(item.date / 1000);
            console.log(date,s,e);
            
            console.log(date<= e,date>=s);
            
            if(date<= e && date>=s) {
                return true;
            }
            return false;
        });
        setList(newList);
        setRange(dates);
      };
    useEffect(() => {
        request('/doc', {}).then((res: any) => {
            const { arr } = res;
            setList(arr);
        })
    }, []);
    const loadNext = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight + 10 >= scrollHeight) {
            request('/doc', {}).then((res: any) => {
                const { arr } = res;
                setList([...list, ...arr]);
            });
        }
    }

    useEffect(() => {
        // 监听滚动
        document.addEventListener('scroll', loadNext);
        return () => {
            document.removeEventListener("scroll", loadNext);
        }
    }, [list]);
    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <Form form={form} layout='inline'>
                    <FormItem label='搜索'>
                        <AutoComplete
                            dropdownMatchSelectWidth={500}
                            options={options}
                            style={{ width: 300 }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            placeholder="请输入关键字"
                        >
                            <Input />
                        </AutoComplete>
                    </FormItem>
                    <FormItem label='时间'>
                        <DatePicker.RangePicker
                            // value={range}
                            onChange={handleRangeChange}
                        />
                    </FormItem>
                </Form>
            </div>
            {list.map(l => <Doc {...l} />)}
        </div>
    )
}
export default DocList;