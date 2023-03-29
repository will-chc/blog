import React, { useEffect, useState } from "react";
import styles from './index.module.less'
const TextFold: React.FC = () => {
    const [isCollapsed, setCollapsed] = useState(false);
    const str = `读陆游咏梅词，反其意而用之。
    风雨送春归，飞雪迎春到。已是悬崖百丈冰，犹有花枝俏。
    俏也不争春，只把春来报。待到山花烂漫时，她在丛中笑。`
    const [ text, setText ] = useState(str);
    const handleClick = () =>{
        
        if(!isCollapsed) {
            console.log(text.substring(0,20));
            
            setText(text.substring(0,20) + '...');
        }
        else {
            setText(str);
        }
        setCollapsed(!isCollapsed); 
    }
    return (
       <div className={styles['wrapper']}>
        {text}<span onClick={handleClick}>{isCollapsed?"展开":'收起'}</span>
       </div>

    )
}
export default TextFold;