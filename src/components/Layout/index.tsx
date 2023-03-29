import React from 'react';
import styles from './index.module.less';
import Doc from '../Doc';
import RouterPage from '../../router/renderRouter';
const Layout: React.FC = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                <RouterPage/>
            </div>
        </div>
    )
}
export default Layout;