## 基于umi搭建的项目

### 目录结构(关键部分)
- src // 主目录，以 @/ 可指定路径
  - api // 接口拦截器 和 接口定义文件
  - assets // 静态资源
  - layouts // 外壳内容如 页头，菜单，面包屑
  - page // 页面内容
    - components // 公用组件
    - 其它组件
  - tools // 工具方法
- .umirc.js // umi主要配置文件

### 规范约定

#### 后台管理类-书写顺序
- import导入
- 函数式声明
  - 一般参数定义(例如分页每页数量)
  - hooks声明(全局状态和生命周期)
  - 方法声明(例如查询列表数据)
  - 表格相关
    - 表格列声明
    - 表格查询条件声明(jsx)
    - 函数式声明的return内容(jsx)
- export导出

#### 编译要求
- warning警告都处理掉，不知道怎么处理的组内沟通

#### 命名要求
- js文件以小写字母开头，驼峰
- js内返回的jsx以大写字母开头，驼峰

### FAQ

#### 什么叫受控组件？
- 使 React 的 state 成为“唯一数据源”，且控制着用户输入过程中表单发生的操作，被 React 以这种方式控制取值和操作的`表单输入元素`就叫做“受控组件”。

#### react的DOM和浏览器的DOM的区别是什么？
https://react.docschina.org/docs/dom-elements.html

#### umi怎么使用less？
- 直接新加less文件，然后import导入即可

#### 节点怎么遍历？
- 参考 src/layouts/menu/leftMenu.js 的菜单遍历方式

#### 怎么理解jsx？
- 可以理解为一种新的数据格式，react会处理这种格式的数据，解析成必要的元素，再由js原生api生成dom节点

#### 接口怎么请求？
- 使用 umi-request 是原生fetch的封装
- 参考：https://www.npmjs.com/package/umi-request/v/1.0.3

#### 表格怎么设置滚动条？
- Table组件添加如下配置
- scroll={{y:'calc(100vh - 400px)'}}

#### 怎么自定义表格内容？
- 使用render函数，返回jsx。render函数，入参分别为当前行的值，当前行数据，行索引

#### jsx里写事件怎么传参数？
- 使用bind(this, data) 例如：
```jsx harmony
<div className={cStyles.textUrl} onClick={reCheck.bind(this, row)}>重新核验</div>
```

#### useState set值是异步的，怎么解决？
- set值后，通过 useEffect 监测修改的值，然后再操作，取到的就是修改后的值
```js
let [selectRows, setSelectRows] = useState([]);
useEffect(() => {
  console.log('selectRows', selectRows);
},[selectRows])
let onSelectChange = (selectedRowKeys,selectedRows) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
  setSelectRows(selectedRowKeys);
};
```

#### 文件导出是流怎么处理？
- 将对象入参转为url形式，直接拼接到接口，window.open打开
```js
let params = objToParams(searchData);
window.open('/dfw-operation/invtCheck/export?' + params);
```

#### 怎么把组件当作变量放进jsx？
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

#### props.children什么意思？
- 包含组件的开始标签和结束标签`之间`的内容
- 在 Welcome 组件中获取 props.children，就可以得到字符串 Hello world!
```
<Welcome>Hello world!</Welcome>
```
```
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

#### 怎么分析react组件的渲染性能？
- 使用Profiler(探查器API)
- 参考： https://react.docschina.org/docs/profiler.html


