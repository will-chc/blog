import React, { useState } from "react";
import styles from './index.module.less';
interface FCProps {
    text:string,
    title:string,
    date:number
}
const Doc: React.FC<FCProps> = ({text, title, date}) => {
    const [page,setPage] = useState(0);
    const renderText = (text:string) => {
        let content:string[] = [text];
        if(text.length > 1000) {
            content = [text.substring(0,1000),text.substring(1000, text.length-1)]
        }
        return <div dangerouslySetInnerHTML={{ __html: content[page] }} />;
      }
    return (
        <div className={styles['doc-wrapper']}>
            <div className={styles['header']}>{title}</div>
            <div className={styles['info']}>时间：{date}</div>
            <div className={styles['text']}>
                {renderText(text)}
            </div>
            {
                text.length>1000&&(
                    <div className={styles['footer']}>
                        <div className={page==0?styles['actived']:""} onClick={()=>setPage(0)}></div>
                        <div className={page==1?styles['actived']:""} onClick={()=>setPage(1)}></div>
                    </div>
                )
            }
        </div>
    )
}
export default Doc;