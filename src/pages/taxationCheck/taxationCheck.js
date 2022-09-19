import React, {useEffect, useState} from 'react';
import { Table, Button, DatePicker, Modal, message, Pagination } from 'antd';
import SearchLine from '@/pages/components/searchLine/searchLine';
import cStyles from '@/pages/common.less';
import interfaceApi from '@/api/interface';
import CommonSelect from '@/pages/components/commonSelect/commonSelect';
import SearchInput from '@/pages/components/searchInput/searchInput';
import styles from './taxationCheck.less';
import router from 'umi/router';
import { objToParams } from '@/tools/tools'
import { useStore } from "@/storeProvider/store";

let TaxationCheck = ()=> {
  let {state, dispatch} = useStore();
  let pageSize = 10;
  let [dataSource, setDataSource] = useState([]);
  let [paginationData, setPagination] = useState({});
  let [tableLoading, setTableLoading] = useState(false);
  let [searchData, setSearchData] = useState({});
  let [selectedRowKeys, setSelectedRowKeys] = useState([]);
  let [selectRows, setSelectRows] = useState([]);
  // 参考：https://react.docschina.org/docs/hooks-effect.html
  useEffect(() => {
    searchTable();
  }, []); // eslint-disable-line
  let searchTable = (page) => {
    // todo 临时静态数据
    setTableLoading(true);
    setDataSource([{invtNo: 1}]);
    setPagination({
      total: 1,
    });
    setTableLoading(false);
    // let data = {};
    // if (page && typeof page === 'number') {
    //   data = {...searchData, ...{pageIndex: page, pageSize: pageSize}};
    // } else {
    //   data = {...searchData, ...{pageIndex: 1, pageSize: pageSize}};
    // }
    // interfaceApi.invtCheckList(data).then((resp) => {
    //   setTableLoading(false);
    //   if (resp && resp.status !== '-1') {
    //     let tableData = resp.payload.list;
    //     setDataSource(tableData);
    //     setPagination({
    //       total: resp.payload.total,
    //     });
    //   }
    // });
  };
  let setReleaseTime = (e) => {
    if (e.length) {
      setSearchData({...searchData, ...{releaseStartTime: e[0].format("YYYY-MM-DD")}, ...{releaseEndTime: e[1].format("YYYY-MM-DD"), ...{releaseTime: e}}})
    }
  };
  let resetData = () => {
    setSearchData({});
  };
  let onSelectChange = (selectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
    // selectedRowKeys值是Table属性rowKey设置的字段
    setSelectedRowKeys(selectedRowKeys);
    setSelectRows(selectedRows);
  };
  let reChange = (row) => {
    let content = '是否确定此项数据不涉及消费税误报？';
    if (row.taxRisk === '0') {
      content = '是否确定此项数据涉及消费税误报?';
    };
    Modal.confirm({
      content: content,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // taxRisk 0正常 1重点关注 2异常
        let data = {
          ids: [row.id],
          taxRisk: row.taxRisk === '0' ? 2 : 0,
        };
        interfaceApi.updateTaxRisk(data).then((resp) => {
          if (resp && resp.status !== '-1') {
            searchTable();
            message.success('操作成功');
          }
        });
      },
      onCancel() {
        console.log('取消');
      },
    });
  };
  // taxRisk 0改成正常 2改成异常
  let reChangeAll = (toTaxRisk) => {
    let taxRiskArray = [];
    selectRows.forEach((item) => {
      if (item.taxRisk === '0') {
        taxRiskArray.push('0');
      } else {
        taxRiskArray.push('2');
      }
    });
    let tip = [...new Set(taxRiskArray)]
    if (tip.length > 1 || taxRiskArray[0] === toTaxRisk) {
      message.warning(toTaxRisk === '0'? '请选择税费异常或重点关注' : '请选择税费正常');
      return false;
    }
    let content = '是否确定此项数据不涉及消费税误报？';
    if (toTaxRisk === '0') {
      content = '是否确定此项数据涉及消费税误报?';
    };
    Modal.confirm({
      content: content,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // taxRisk 0正常 1重点关注 2异常
        let data = {
          ids: selectedRowKeys,
          taxRisk: toTaxRisk,
        };
        interfaceApi.updateTaxRisk(data).then((resp) => {
          if (resp && resp.status !== '-1') {
            searchTable();
            setSelectedRowKeys([]);
            setSelectRows([]);
            message.success('操作成功');
          }
        });
      },
    });
  };
  let toDetail = (row) => {
    router.push('/taxationCheck/taxationCheckDetail?id=' + row.id);
  };
  let exportData = () => {
    let params = objToParams(searchData);
    window.open('/dfw-operation/invtCheck/export?' + params);
  };
  let updateName = ()=> {
    dispatch({type: 'setProjectName'});
  };
  const columns = [
    {
      title: '清单编号',
      dataIndex: 'invtNo',
    }, {
      title: '商品编码',
      dataIndex: 'gCode',
    }, {
      title: '商品名称',
      dataIndex: 'gName',
    }, {
      title: '规格型号',
      dataIndex: 'gModel',
    }, {
      title: '单价',
      dataIndex: 'price',
    }, {
      title: '总价',
      dataIndex: 'totalPrice',
    }, {
      title: '法定第一单位',
      dataIndex: 'unit1Name',
    }, {
      title: '法定第一数量',
      dataIndex: 'qty1',
    }, {
      title: '电商企业名称',
      dataIndex: 'ebcName',
    }, {
      title: '电商平台名称',
      dataIndex: 'ebpName',
    }, {
      title: '放行时间',
      dataIndex: 'releaseTime',
    }, {
      title: '税费风险',
      dataIndex: 'taxRiskName',
      width: 90,
      render: (col, row) => ( // taxRisk 0正常 1重点关注 2异常
        <div>
          {row.taxRisk === '0'
            ? <div>
                <div className={styles.success}>{row.taxRiskName}</div>
                <div className={cStyles.textUrl} onClick={reChange.bind(this, row)}>调整为异常</div>
              </div>
            : <div>
                <div className={styles.error}>{row.taxRiskName}</div>
                <div className={cStyles.textUrl} onClick={reChange.bind(this, row)}>调整为正常</div>
              </div>
          }
        </div>
      ),
    }, {
      title: '核验状态',
      dataIndex: 'taxStatusName',
    }, {
      title: '操作',
      render: (col, row) => (
        <div className={cStyles.textUrl} onClick={toDetail.bind(this, row)}> 查看 </div>
      ),
    },
  ];
  let searchDom = (
    <div className={cStyles.searchLine}>
      <SearchInput label={'清单编号'} keyWord={'invtNo'} searchData={searchData} setSearchData={setSearchData}/>
      <SearchInput label={'商品编码'} keyWord={'gCode'} searchData={searchData} setSearchData={setSearchData}/>
      <SearchInput label={'商品名称'} keyWord={'gName'} searchData={searchData} setSearchData={setSearchData}/>
      <SearchInput label={'规格型号'} keyWord={'gModel'} searchData={searchData} setSearchData={setSearchData}/>
      <SearchInput label={'电商企业名称'} keyWord={'ebcName'} searchData={searchData} setSearchData={setSearchData}/>
      <SearchInput label={'电商平台名称'} keyWord={'ebpName'} searchData={searchData} setSearchData={setSearchData}/>
      <div className={cStyles.flexLine}>
        <span className={cStyles.searchLabel}>放行时间</span>
        <DatePicker.RangePicker value={searchData.releaseTime} onChange={setReleaseTime} style={{width: '100%'}} placeholder={['开始时间','结束时间']}/>
      </div>
      <CommonSelect label={'核验状态'} keyWord={'taxStatus'} searchData={searchData} setSearchData={setSearchData} api={interfaceApi.getTaxStatus}/>
      <CommonSelect label={'税费风险'} keyWord={'taskRisk'} searchData={searchData} setSearchData={setSearchData} api={interfaceApi.getTaxRisk}/>
      <div className={cStyles.searchButton}>
        <Button type='primary' onClick={searchTable}>查询</Button>
        <Button className={cStyles.distanceLeft} onClick={resetData}>重置</Button>
      </div>
    </div>
  );
  return (
    <div>
      <SearchLine searchDom={searchDom}/>
      <div className={cStyles.buttonGroup}>
        <Button type='primary' disabled={!selectRows.length} onClick={reChangeAll.bind(this, '0')}>税费正常</Button>
        <Button type='primary' disabled={!selectRows.length} onClick={reChangeAll.bind(this, '2')}>税费异常</Button>
        <Button type='primary' onClick={exportData}>导出</Button>
        <Button type='primary' onClick={updateName}>修改全局状态</Button>
      </div>
      <Table
        rowKey="id"
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        loading={tableLoading}
        rowSelection={{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}}
        size='middle'
        scroll={{y:'calc(100vh - 410px)'}}
      />
      <Pagination
        className={cStyles.pageLine}
        showTotal={total => `共 ${total} 条`}
        defaultCurrent={1}
        total={paginationData.total}
        onChange={searchTable.bind(this)}
        pageSize={pageSize} />
    </div>
  );
};

export default TaxationCheck;
