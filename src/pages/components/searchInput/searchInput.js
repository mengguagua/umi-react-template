import cStyles from '@/pages/common.less';
import { Input } from 'antd';
import React from 'react';

let SearchInput = (props)=> {
  return(
    <div className={cStyles.flexLine}>
      <div className={cStyles.searchLabel}>{props.label}</div>
      <Input value={props.searchData[props.keyWord]} onChange={(e) => {props.setSearchData({...props.searchData, ...{[props.keyWord]: e.target.value}})}} placeholder={'请输入'} allowClear/>
    </div>
  );
};

export default SearchInput;
