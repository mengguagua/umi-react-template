import React, { useState } from 'react';
import styles from './leftMenu.less';
import { Menu, Layout} from 'antd';
import Link from 'umi/link';


let LeftMenu = (props)=> {
  // 菜单伸缩的标示
  let [collapsed, setCollapsed] = useState(false);
  let menu = props.menu;
  // 处理菜单,Link页面跳转
  let menuSubMenu = menu.map((row, index) => {
    let menuItem = row.child.map((item) => {
       return (
         <Menu.Item key={item.id}>
           <Link to={item.path}>{item.name}</Link>
         </Menu.Item>
       );
    });
    return (
      <Menu.SubMenu key={row.id} title={row.name}>
        {menuItem}
      </Menu.SubMenu>
    )
  });
  return (
    <div>
      <Layout.Sider className={styles.menu} collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <Menu
          // defaultSelectedKeys={[menu[0].child[0].id]}
          defaultOpenKeys={[menu[0].id]}
          mode="inline"
          theme="dark"
        >
          {menuSubMenu}
        </Menu>
      </Layout.Sider>
    </div>
  );
};
export default LeftMenu;
