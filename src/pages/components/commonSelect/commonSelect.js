import React, { useState } from 'react';
import cStyles from '@/pages/common.less';
import { Select } from 'antd';

// let oldOption = [];
let CommonSelect = (props)=> {
  let [option, setOption] = useState([]);
  let searchOption = () => {
    props.api().then((resp) => {
      setOption(resp);
    });
  };
  let SelectOption = () => {
    // 首次加载查询一次
    if (option && option.length === 0) {
      searchOption();
    }
    if (typeof option === 'undefined') {
      option = [];
    }
    let options =  option.map((item, index) => {
      return(
        <Select.Option key={index} value={item.value}>{item.title}</Select.Option>
      );
    });
    return (
      <Select value={props.searchData[props.keyWord]} onChange={(e) => {props.setSearchData({...props.searchData, ...{[props.keyWord]: e}})}} placeholder={'请输入'} style={{width: '100%'}}>
        {options}
      </Select>
    );
  };
  return(
    <div className={cStyles.flexLine}>
      <span className={cStyles.searchLabel}>{props.label}</span>
      <SelectOption/>
    </div>
  );
};

export default CommonSelect;
