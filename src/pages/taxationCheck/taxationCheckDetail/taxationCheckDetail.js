import React, {useEffect, useState} from 'react';
import { Descriptions, Table } from 'antd';
import styles from './taxationCheckDetail.less';
import interfaceApi from '@/api/interface';
import { getQueryStringArgs } from '@/tools/tools';

let TaxationCheckDetail = () => {
  let args = getQueryStringArgs();
  let id = args['id'];
  let [descData, setDescData] = useState({});
  let [tableData, setTableData] = useState([]);
  useEffect(() => {
    searchData();
  }, []); // eslint-disable-line
  let data= {
    inventoryHeadId: id
  };
  let searchData = () => {
    interfaceApi.invtCheckDetail(data).then((resp) => {
      if (resp && resp.status !== '-1') {
        setDescData(resp.payload);
        setTableData(resp.payload.itemVos);
      }
    });
  };

  const columns = [
    {
      title: '商品编码',
      dataIndex: 'gCode',
    }, {
      title: '商品名称',
      dataIndex: 'gName',
    }, {
      title: '规格型号',
      dataIndex: 'gModel',
    }, {
      title: '原产国（地区）',
      dataIndex: 'countryName',
    }, {
      title: '币制',
      dataIndex: 'currencyName',
    }, {
      title: '单价',
      dataIndex: 'price',
    }, {
      title: '总价',
      dataIndex: 'totalPrice',
    }, {
      title: '数量',
      dataIndex: 'qty',
    }, {
      title: '计量单位',
      dataIndex: 'unitName',
    }, {
      title: '法定第一单位',
      dataIndex: 'unit1Name',
    }, {
      title: '法定第一数量',
      dataIndex: 'qty1',
    }, {
      title: '税费风险',
      dataIndex: 'taxRiskName',
    }, {
      title: '核验状态',
      dataIndex: 'taxStatusName',
    }
  ];

  let DescriptionsItems = () => {
    let descDataArray = [];
    let maps = {
      assureCode: '预录入编号',
      tradeModeName: '监管方式',
      ieDate: '进口日期',
      portCode: '进口口岸代码',
      trafNo: '运输工具编号名称',
      voyageNo: '航班航次号',
      trafModeName: '运输方式',
      aaa: '申报单位类别',
      agentCode: '申报企业代码',
      agentName: '申报企业名称',
      ebpCode: '电商平台代码',
      ebpName: '电商平台名称',
      ebcCode: '电商企业代码',
      ebcName: '电商企业名称',
      logisticsCode: '物流企业代码',
      logisticsName: '物流企业名称',
      orderNo: '订单编号',
      logisticsNo: '物流运单编号',
      billNo: '提运单号',
      countryName : '启运国（地区）',
      packNo: '件数',
      grossWeight: '毛重（公斤）',
      netWeight: '净重（公斤',
      customsName: '申报地海关代码',
    };
    for (let key in descData) {
      let showList = ['assureCode', 'tradeModeName', 'ieDate', 'portCode', 'trafNo', 'voyageNo', 'trafModeName', 'agentCode', 'agentName', 'ebpCode','ebpName', 'ebcCode',
        'ebcName', 'logisticsCode', 'billNo', 'countryName ', 'logisticsName', 'orderNo', 'logisticsNo', 'packNo', 'grossWeight', 'netWeight', 'customsName'];
      if (showList.includes(key)) {
        descDataArray.push(
          {
            label: maps[key],
            value: descData[key],
          }
        );
      }
    }
    let items = descDataArray.map((ret, index) => {
      return(
        <Descriptions.Item key={index} label={ret.label} bordered>
          {ret.value}
        </Descriptions.Item>
      );
    });
    return (
      <Descriptions bordered size={'small'}>
        {items}
      </Descriptions>
    );
  };
  return(
    <div>
      <div className={styles.title}>表头信息</div>
      <DescriptionsItems></DescriptionsItems>
      <div className={styles.title}>表体信息</div>
      <Table
        rowKey="id"
        pagination={false}
        dataSource={tableData}
        columns={columns}
        size='small'
        scroll={{y:'calc(100vh - 410px)'}}
      />
    </div>
  );
};

export default TaxationCheckDetail;
