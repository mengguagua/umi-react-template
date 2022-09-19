import React from 'react';
import styles from './searchLine.less';

let SearchLine = (props)=> {
  return (
    <div className={styles.layout}>
      {props.searchDom}
    </div>
  );
};

export default SearchLine;
