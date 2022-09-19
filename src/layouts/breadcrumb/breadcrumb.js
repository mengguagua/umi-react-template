import styles from './breadcrumb.less';
import React from 'react';

let Breadcrumb = (props) => {
  let pathname = window.location.pathname;
  let menu = props.menu;
  let preMenuName = '';
  let curMenuName = '';
  menu.forEach((item) => {
    item.child.forEach((ret) => {
      if (ret.path === pathname) {
        preMenuName = item.name;
        curMenuName = ret.name;
      }
    });
  });
  return (
    <div className={styles.layout}>
      <span>{preMenuName}</span>
      <span className={styles.symbol}>{curMenuName ? '/' : ''}</span>
      <span>{curMenuName}</span>
    </div>
  );
};

export default Breadcrumb;
