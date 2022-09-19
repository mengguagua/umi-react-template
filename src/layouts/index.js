import React from 'react';
import styles from './index.css';
import Header from './header/header'
import LeftMenu from './menu/leftMenu'
import Breadcrumb from './breadcrumb/breadcrumb'
import { StoreProvider } from "../storeProvider/store";

// 最外层的全局组件
function BasicLayout(props) {
  // tip 后端需要提供这样的数据格式
  let menu = [
    {
      id: '1',
      name: '税费查验管理',
      path: '/',
      child: [
        {
          id: '1-1',
          name: '税费查验管理',
          path: '/taxationCheck/taxationCheck',
        },
      ],
    },
  ];
  return (
    <StoreProvider>
      <div className={styles.normal}>
        <Header></Header>
        <div className={styles.content}>
          <div>
            <LeftMenu menu={menu}></LeftMenu>
          </div>
          <div className={styles.rightContent}>
            <Breadcrumb menu={menu}></Breadcrumb>
            <div className={styles.rightPage}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </StoreProvider>
  );
}

export default BasicLayout;
