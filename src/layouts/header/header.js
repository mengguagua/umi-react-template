import React from 'react';
import styles from './header.less'
import { useStore } from "@/storeProvider/store";

let Header = () => {
  let { state } = useStore();
  return (
    <div className={styles.layout}>
      <span className={styles.title}>DEMO{state.projectName}</span>
    </div>
  );
};

export default Header;
