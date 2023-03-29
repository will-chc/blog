import React from "react";
import { useHistory } from "react-router-dom";
import styles from './index.module.less';
const LeftNav: React.FC = () => {
    const history = useHistory();
    const handleGo = (path:string) => {
        history.push(path);
        
    }
    return (
        <div className={styles['nav-wrapper']}>
            
            <div className={styles['top']}>BLOG</div>
            <div className={styles['nav']}>
                
                    <div className={styles['nav-item']} onClick={()=>handleGo('/create')} >editor</div>
               
               
                    <div className={styles['nav-item']} onClick={()=>handleGo('/doc')}>doc</div>

                    <div className={styles['nav-item']} onClick={()=>handleGo('/fujia')}>文字开合</div>
                

            </div>
        </div>
    );
};

export default LeftNav;